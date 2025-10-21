import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="flex justify-center items-center h-full mt-16 lg:mt-40">
            <div className="home-section-container flex flex-col lg:flex-row lg:justify-around items-center w-full max-w-5xl px-4">
                <section className="text-center prose w-80 max-w-full">
                    <h1>Who will <span className="italic text-accent/70">you</span> become?</h1>

                    <p>Before you face dragons or dive into danger, you must know yourself.</p>
                    <p>Discover the heart, mind, and spirit of your next great character whith this <span className="text-accent">character personality generator</span>.</p>
                </section>
                <section className="text-center prose w-80 max-w-full mt-16 lg:mt-0">
                    <div>
                        <div className="flex justify-end items-baseline h-full text-xs text-accent italic animate-[bounce_2s_ease-in-out_infinite]">↓↓ New! Try it now and log in at the end</div>
                        <div><Link to="/name" className="no-underline hover:text-accent"><h2 className="text-[170%] mt-[9%] hover:text-accent transition-all duration-600">Create a new Character</h2></Link></div>
                        <div className="divider text-accent">OR</div>
                        <div><Link className="no-underline hover:text-accent" to={user ? "/dashboard" : "/login"}><h2 className="text-[170%] hover:text-accent transition-all duration-600">{user ? "My Characters" : "Login"}</h2></Link></div>
                    </div>
                </section>
            </div>

        </div>
    )
};

export default Home;