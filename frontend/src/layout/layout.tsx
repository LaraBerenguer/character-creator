import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../index.css';

const Layout = () => {
    return (
        <div>
            <div className="Navbar">
                <Navbar />
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;