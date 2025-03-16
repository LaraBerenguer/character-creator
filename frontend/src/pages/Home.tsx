import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const {user} = useAuth();
    return (
        <div className="text-center prose mt-16 lg:mt-40">
            <div>{user ? "" : <Link to="/login" className="no-underline hover:text-[105%] transition-all duration-300"><h1>Login</h1></Link>}</div>
            <div><Link to="/name" className="no-underline hover:text-[105%] transition-all duration-300"><h1>Create a new Character</h1></Link></div>
        </div>
    )
};

export default Home;