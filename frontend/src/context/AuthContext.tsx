import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

//validation form
const loginInputSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const tokenResponseSchema = z.object({
    access_token: z.string()
});

const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    username: z.string()
});

type User = z.infer<typeof userSchema>;
//type LoginInput = z.infer<typeof loginInputSchema>;

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>
    logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const BACK_URL = import.meta.env.VITE_API_URL_BACK || "http://localhost:3001";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) { setLoading(false); return; };

            try {
                const response = await fetch(`${BACK_URL}/api/user`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const userData = await response.json();
                if (!response.ok) throw new Error(userData.error || 'Invalid token');

                const validatedUser = userSchema.safeParse(userData);
                if (!validatedUser.success) {
                    throw new Error("Invalid user data format");
                };

                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error validating token:', error);
                setLoading(false);
                logout();
            };
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            //validations
            const validationResult = loginInputSchema.safeParse({ email, password });
            if (!validationResult.success) {
                const errorMessage = validationResult.error.errors
                    .map(err => err.message)
                    .join(", ");
                setError(errorMessage);
                setLoading(false);
                return;
            };

            const response = await fetch(`${BACK_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Login failed');

            //token validation
            const tokenValidation = tokenResponseSchema.safeParse(data);
            if (!tokenValidation.success) {
                throw new Error("Invalid token format received");
            }

            //Get token from localstorage
            localStorage.setItem('token', data.access_token);

            //Get user info from backend
            const userResponse = await fetch(`${BACK_URL}/api/user`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${data.access_token}` }
            });

            //Save user info
            const userData = await userResponse.json();
            if (!userResponse.ok) throw new Error(userData.error || 'Failed to fetch user');

            //user validation
            const userValidation = userSchema.safeParse(userData);
            if (!userValidation.success) {
                throw new Error("Invalid user data format");
            }

            const validatedUser = userValidation.data;

            localStorage.setItem('user', JSON.stringify(userData));

            setUser(validatedUser);
            navigate('/');
            setLoading(false);
            return;
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            setLoading(false);
        };
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const value = useMemo(() => ({
        user,
        loading,
        error,
        login,
        logout,
    }), [user, loading, error]);

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};