import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const {user} = useAuth();
    return (
        <div className="flex flex-col items-center h-full">
            <div className="text-center prose mt-16 lg:mt-40 w-80 max-w-full">
                <div><Link className="no-underline hover:text-[105%] transition-all duration-300" to={user ? "/dashboard" : "/login"}><h2 className="text-[170%]">{user? "My Characters" : "Login"}</h2></Link></div>
                <div className="divider">OR</div>
                <div><Link to="/name" className="no-underline hover:text-[105%] transition-all duration-300"><h2 className="text-[170%] mt-[9%]">Create a new Character</h2></Link></div>
            </div>
        </div>
    )
};

export default Home;