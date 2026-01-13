import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import Whatsapp from "../../assets/whatsapp.png";
import Bag from "../../assets/bag.png";
import CartModal from "../CartModal/CartModal.jsx";
import menu from "../../assets/menu.png";

const Navbar = ({ cartCount }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar-container">
                <div className="logo-container">
                    <img src={Logo} alt="logo" />
                </div>

                <ul className="nav-links">
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/services">Services</NavLink></li>
                    <li><NavLink to="/products">Shop</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>

                <div className="nav-contacts">
                    <a
                        className="nav-whatsapp"
                        href="https://wa.me/447831331434"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={Whatsapp} alt="WhatsApp" />
                    </a>
                    <div className="cart-wrapper" onClick={() => setIsCartOpen(true)}>
                        <img src={Bag} alt="cart icon" className="cart-icon" />
                        <span className="cart-badge">{cartCount}</span>
                    </div>
                    <img
                        src={menu}
                        alt="menu"
                        className="mobile-menu-icon"
                        onClick={() => setIsMenuOpen(true)}
                    />
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${isMenuOpen ? "open" : ""}`}>
                <button className="drawer-close" onClick={() => setIsMenuOpen(false)}>✕</button>

                <ul className="drawer-links">
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/" end>Home</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/about">About</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/services">Services</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/products">Shop</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/contact">Contact</NavLink></li>
                </ul>

                <div className="drawer-footer">
                    <a
                        href="https://wa.me/447831331434"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={Whatsapp} alt="WhatsApp" />
                    </a>
                    <div className="cart-wrapper" onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }}>
                        <img src={Bag} alt="Cart" />
                        <span className="cart-badge">{cartCount}</span>
                    </div>
                </div>
            </div>

            {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} cartCount={cartCount} />}
        </>
    );
};

export default Navbar;
