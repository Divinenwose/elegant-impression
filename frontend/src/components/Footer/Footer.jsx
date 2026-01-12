import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import FLogo from "../../assets/logo.png"
import Instagram from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Chat from "../../assets/chat.png";
import TikTok from "../../assets/tiktok.png";
import location from "../../assets/location.png";
import mail from "../../assets/mail.png";
import phone from "../../assets/phone.png";

const year = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-wrapper">
                <div className="footer-logo-container">
                    <div className="footer-logo">
                        <img src={FLogo} alt="" />
                    </div>
                    <div className="logo-text">
                        <p>Elevating your beauty with <br /> premium hair services and luxury <br /> products. Experience the <br /> difference of true elegance.</p>
                    </div>
                    <div className="footer-icons">
                        <div className="instagram">
                            <a href="https://www.instagram.com/just_elegant_hair?igsh=eXlzMTkwbWl6M2c3" target="_blank" rel="noopener noreferrer"><img src={Instagram} alt="" /></a>
                        </div>
                        <div className="facebook">
                            <a href=""><img src={Facebook} alt="" /></a>
                        </div>
                        <div className="chat">
                            <a href=""><img src={Chat} alt="" /></a>
                        </div>
                        <div className="tiktok">
                            <a href="https://www.tiktok.com/@just_elegant_impressions?_r=1&_t=ZS-932seLZKDSc" target="_blank" rel="noopener noreferrer"><img src={TikTok} alt="" /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-links-container">
                    <div className="footer-text">
                        <h2>Explore</h2>
                    </div>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/shop">Shop Products</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>
                <div className="footer-service-container">
                    <div className="service-text">
                        <h2>Services</h2>
                    </div>
                    <div className="service-container">
                        <p>Luxury Braiding</p>
                        <p>Wig Installation</p>
                        <p>Silk Press</p>
                        <p>Bridal Styling</p>
                    </div>
                </div>
                <div className="footer-contact-container">
                    <div className="contact-text">
                        <h2>Contact</h2>
                    </div>
                    <div className="contact-info-container">
                        <div className="location">
                            <img src={location} alt="" />
                            <p>27 A Rea street, Digbeth <br /> B5 6LB </p>
                        </div>
                        <div className="telephone">
                            <img src={phone} alt="" />
                            <p>+447831331434</p>
                        </div>
                        <div className="mail">
                            <img src={mail} alt="" />
                            <p>justelegantimpressions <br />@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="reserved">
                <div className="copyright">
                    <p> <span className="year">© {year}</span> Elegant Impressions. All rights reserved.</p>
                </div>
                <div className="policy">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Shipping Policy</p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;