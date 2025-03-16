import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const {user} = useAuth();
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="text-center prose mt-16 lg:mt-40 w-96">
                <div><Link className="no-underline hover:text-[105%] transition-all duration-300" to={user ? "/dashboard" : "/login"}><h1>{user? "My Characters" : "Login"}</h1></Link></div>
                <div><Link to="/name" className="no-underline hover:text-[105%] transition-all duration-300"><h1>Create a new Character</h1></Link></div>
            </div>
        </div>
    )
};

export default Home;