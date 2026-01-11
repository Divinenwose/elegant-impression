import React from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.png"
import Whatsapp from "../../assets/whatsapp.png";
import Bag from "../../assets/bag.png";

const Navbar = () => {
    return(
        <nav className="navbar-container">
            <div className="logo-container">
                <img src={Logo} alt="" />
            </div>
            <ul className="nav-links">
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Shop</a></li>
                <li><a href="">Contact</a></li>
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
    )
};

export default Navbar;