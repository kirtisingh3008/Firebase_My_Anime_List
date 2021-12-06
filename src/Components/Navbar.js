import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home");
     //it gives the location that where we are currently
    const location = useLocation();
   // a useeffect hook to active the tab of particular pathname
    useEffect(() => {
        if (location.pathname === '/')
            setActiveTab("Home")
        else if (location.pathname === '/add')
            setActiveTab("Add")
        else if (location.pathname === '/about')
            setActiveTab("About")
    }, [location]); // we passed location here because we want this hook to work only if there is change in location

    return (
        <div className="header">
            <p className="logo">Otaku</p>
            <div className="header-right">
                <Link to="/">
                    <p className={`${activeTab === "Home" ? "active" : ""}`}
                        onClick={() => setActiveTab("Home")}
                    >
                        Home
                    </p>
                </Link>

                <Link to="/add">
                    <p className={`${activeTab === "Add" ? "active" : ""}`}
                        onClick={() => setActiveTab("Add")}
                    >
                        Add
                    </p>
                </Link>

                <Link to="/about">
                    <p className={`${activeTab === "About" ? "active" : ""}`}
                        onClick={() => setActiveTab("About")}
                    >
                        About
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
