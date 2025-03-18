import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import '../index.css';
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";

const Layout = () => {
    return (
        <div /*className="bg-container"*/>
            <div className="Navbar">
                <Navbar />
            </div>
            <main>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default Layout;