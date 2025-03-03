import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" to='/'>Menu</Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="My Profile"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {user ?
                                (<>
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">Coming Soon</span>
                                        </a>
                                    </li>
                                    <li><button onClick={logout}>Logout</button></li>
                                </>
                                ) : (
                                    <>
                                        <li><Link to='/login'>Login</Link></li>
                                        <li><Link to='/signup'>Sign Up</Link></li>
                                    </>
                                )}
                        </ul>
                    </div>
                </div>
            </div>
        </>




    );
};

export default Navbar;