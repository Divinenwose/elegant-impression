import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import Bag from "../../assets/bag.png";
import CartModal from "../CartModal/CartModal.jsx";
import menu from "../../assets/menu.png";
import Close from "../../assets/closebtn.png";
import { useCart } from "../../context/CartContext";

const Navbar = () => {

    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
    
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
                    <li><NavLink to="/gallery">Gallery</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>

                </ul>

                <div className="nav-contacts">
                    <div className="cart-wrapper" onClick={() => setIsCartOpen(true)}>
                        <img src={Bag} alt="cart icon" className="cart-icon" />
                        <span className="cart-badge">{cartCount}</span>
                    </div>
                    <Link className="bk-btn" to="/services">View our Services</Link>
                    <img
                        src={menu}
                        alt="menu"
                        className="mobile-menu-icon"
                        onClick={() => setIsMenuOpen(true)}
                    />
                </div>
            </nav>
            <div className={`mobile-drawer ${isMenuOpen ? "open" : ""}`}>
                <button className="drawer-close" onClick={() => setIsMenuOpen(false)}>
                    <img src={Close} alt="" />
                </button>

                <ul className="drawer-links">
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/" end>Home</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/about">About</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/services">Services</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/products">Shop</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/gallery">Gallery</NavLink></li>
                    <li onClick={() => setIsMenuOpen(false)}><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className="drawer-book">
                    <Link
                        to="/services"
                        className="bk-btn"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        View our Services
                    </Link>
                </div>
            </div>
            {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} cartCount={cartCount} />}
        </>
    );
};

export default Navbar;
