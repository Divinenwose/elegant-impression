import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import Whatsapp from "../../assets/whatsapp.png";
import Bag from "../../assets/bag.png";

const Navbar = ({ cartCount }) => {
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
                <a className="nav-whatsapp" href="https://wa.me/447831331434" target="_blank" rel="noopener noreferrer">
                    <img src={Whatsapp} alt="" />
                </a>
                <div className="cart-wrapper">
                    <img src={Bag} alt="cart icon" className="cart-icon" />
                    <span className="cart-badge">{cartCount}</span>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
