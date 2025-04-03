import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="flex flex-col lg:flex-row lg:justify-around lg:mx-44 items-center h-full ">
            <section className="text-center prose mt-16 lg:mt-40 w-80 max-w-full">
                <h1>Welcome to your story!</h1>
                
                <p>Are you brave? Fearless? Or are you impulsive and selfless? Maybe evil?</p>
                <p>Find out who you will roleplay next whith this character personality generator.</p>
            </section>
            <section>
                <div className="text-center prose mt-16 lg:mt-40 w-80 max-w-full">
                    <div><Link className="no-underline hover:text-accent transition-all duration-400" to={user ? "/dashboard" : "/login"}><h2 className="text-[170%] hover:text-accent">{user ? "My Characters" : "Login"}</h2></Link></div>
                    <div className="divider text-accent">OR</div>
                    <div><Link to="/name" className="no-underline hover:text-accent transition-all duration-400"><h2 className="text-[170%] mt-[9%] hover:text-accent">Create a new Character</h2></Link></div>
                </div>
            </section>
        </div>
    )
};

export default Home;