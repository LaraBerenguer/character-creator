import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="flex justify-center items-center h-full mt-16 lg:mt-40">
            <div className="home-section-container flex flex-col lg:flex-row lg:justify-around items-center w-full max-w-5xl px-4">
                <section className="text-center prose w-80 max-w-full">
                    <h1>Welcome to your story!</h1>

                    <p>Are you brave? Fearless? Or are you impulsive and selfless? Maybe evil?</p>
                    <p>Find out who you will roleplay next whith this character personality generator.</p>
                </section>
                <section className="text-center prose w-80 max-w-full mt-16 lg:mt-0">
                    <div>
                        <div><Link className="no-underline hover:text-accent transition-all duration-400" to={user ? "/dashboard" : "/login"}><h2 className="text-[170%] hover:text-accent">{user ? "My Characters" : "Login"}</h2></Link></div>
                        <div className="divider text-accent">OR</div>
                        <div><Link to="/name" className="no-underline hover:text-accent transition-all duration-400"><h2 className="text-[170%] mt-[9%] hover:text-accent">Create a new Character</h2></Link></div>
                    </div>
                </section>
            </div>

        </div>
    )
};

export default Home;