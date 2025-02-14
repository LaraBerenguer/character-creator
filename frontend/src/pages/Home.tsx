import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="text-center">
            <div>Login</div>
            <div><Link to="/creation">Create New Character</Link></div>
        </div>
    )
};

export default Home;