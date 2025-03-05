import { useState } from "react";
import { z } from "zod";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    if (loading) { return <Loading /> };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        //input validation
        const validationResult = signupSchema.safeParse({ username, email, password });
        if (!validationResult.success) {
            const errorMessage = validationResult.error.errors
                .map(err => err.message)
                .join(", ");
            throw new Error(errorMessage);
        }

        try {
            setLoading(true);

            //TO DO Move fetch to context
            const response = await fetch(`${import.meta.env.VITE_API_URL_BACK || 'http://localhost:3001'}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (!response.ok) { throw new Error(data.error || data.msg || 'Registration failed'); };

            setLoading(false);
            navigate('/login', { state: { message: 'Account created successfully! Please log in.' } });
        } catch (error) {
            setLoading(false);
            setError(error instanceof Error ? error.message : 'An error occurred');
            //display error in form
        }
    };

    return (
        <div className="signUp-page flex justify-center my-5 min-h-screen">
            <div className="signUp-page-elements max-w-sm flex flex-col gap-4">
                <div className="signUp-page-title prose text-start">
                    <h1 className="">Sign Up</h1>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSignUp} className='flex flex-col gap-3'>
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
                        <input type="email" name="email" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" name="username" className="grow" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </label>
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
                        <input type="password" name="password" className="grow" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button className="btn btn-primary" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;