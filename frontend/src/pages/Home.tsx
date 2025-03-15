import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="text-center">
            <div><Link to="/login">Login</Link></div>
            <div><Link to="/name">Create New Character</Link></div>
        </div>
    )
};

export default Home;