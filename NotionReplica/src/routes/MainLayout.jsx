import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

function MainLayout() {
    const { user } = useContext(UserContext);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div>
                    <p>Hello, {user.email}</p>
                </div>
                <nav className="flex">
                    <NavLink to="/" className="mr-4">
                        About
                    </NavLink>
                    <NavLink to="/notes" className="mr-4">
                        Notes
                    </NavLink>
                    <NavLink to="/login">
                        Log out
                    </NavLink>
                </nav>
            </header>

            <main className="container mx-auto p-4 flex-1">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white text-center p-4">
                <div className="rights">
                    <p className="text-sm">Created by: Mashnyuk Darya</p>
                    <p className="text-sm">BSU: 2024</p>
                </div>
            </footer>
        </div>
    );
}

export default MainLayout;