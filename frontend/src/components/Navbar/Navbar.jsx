import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import Whatsapp from "../../assets/whatsapp.png";
import Bag from "../../assets/bag.png";

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div className="logo-container">
                <img src={Logo} alt="" />
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                        About
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
                        Services
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/shop" className={({ isActive }) => (isActive ? "active" : "")}>
                        Shop
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                        Contact
                    </NavLink>
                </li>
            </ul>
            <div className="nav-contacts">
                <a className="nav-whatsapp" href="">
                    <img src={Whatsapp} alt="" />
                </a>
                <a className="nav-books" href="">
                    <img src={Bag} alt="" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
