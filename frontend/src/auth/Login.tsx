import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";

const signupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error: authError, user } = useAuth();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        //input validation individual errors
        const validationResult = signupSchema.safeParse({ email, password });

        if (!validationResult.success) {
            const fieldErrors: Record<string, string> = {};

            validationResult.error.errors.forEach(err => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        };

        try {
            await login(email, password);
        } catch (error) {
            console.error('Login failed:');
        };
    };

    return (
        <div className="login-page flex justify-center h-full">
            <div className="login-page-elements max-w-sm flex flex-col gap-4 translate-y-[61%]">
                <div className="login-page-title prose text-start">
                    <h1 className="">Log In</h1>
                </div>
                {authError && <p className="text-red-500">{authError}</p>}
                <form onSubmit={handleLogin} className='flex flex-col gap-3'>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    <button className="btn btn-primary" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
                </form>
                <div className="login-navigation text-center text-xs">
                    Don't have an account? <Link className='text-decoration-line: underline' to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;