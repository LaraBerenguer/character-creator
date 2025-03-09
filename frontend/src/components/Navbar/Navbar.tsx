import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" to='/'>Menu</Link>
                </div>
                <div className="flex-none gap-2">
                    <div ref={dropdownRef} className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" onClick={toggleDropdown} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="My Profile"
                                    src={user ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" : "https://images.pexels.com/photos/6985184/pexels-photo-6985184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} />
                            </div>
                        </div>
                        {isOpen && (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {user ?
                                    (<>
                                        <div className="text-center mb-2"><p>Hi, {user.username}</p></div>
                                        <li><Link onClick={closeDropdown} to='/dashboard'>Profile</Link></li>
                                        <li><button onClick={() => { logout(); closeDropdown(); }}>Logout</button></li>
                                    </>
                                    ) : (
                                        <>
                                            <li><Link onClick={closeDropdown} to='/login'>Login</Link></li>
                                            <li><Link onClick={closeDropdown} to='/signup'>Sign Up</Link></li>
                                        </>
                                    )}
                            </ul>
                        )

                        }

                    </div>
                </div>
            </div>
        </>




    );
};

export default Navbar;