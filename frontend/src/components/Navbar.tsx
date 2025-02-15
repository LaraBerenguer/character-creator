import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex flex-row justify-between">
            <div>Navbar</div>
            <div><Link to='/login'>Login</Link></div>
        </nav>

    );
};

export default Navbar;