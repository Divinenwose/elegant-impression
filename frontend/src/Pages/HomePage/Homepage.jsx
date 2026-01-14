import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import arrow from "../../assets/arrow-right.png";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import card4 from "../../assets/card4.png";
import why1 from "../../assets/why1.png";
import why2 from "../../assets/why2.png";
import why3 from "../../assets/why3.png";
import shop1 from "../../assets/shop1.png";
import shop2 from "../../assets/shop2.png";
import shop3 from "../../assets/shop3.png";
import shop4 from "../../assets/shop4.png";
import Bag from "../../assets/purse.png";
import star from "../../assets/Star1.png";
import star1 from "../../assets/star2.png";
import avatar from "../../assets/avatar1.png";
import avatar1 from "../../assets/avatar2.png";
import marks from "../../assets/marks.png";
import Footer from "../../components/Footer/Footer.jsx";
import Bookings from "../../components/Bookings/Bookings.jsx";
import head from "../../assets/heads.png";

const HomePage = ({ setCartCount }) => {
    return (
        <section className="home">
            <div className="hero-container">
                <div className="overlay"></div>
                <div className="hero-writing">
                    <div className="hero-text">
                        <div className="hair">PREMIUM HAIR CARE & STYLING</div>
                    </div>
                    <div className="hero-text-main">
                        <h2>Where <span className="ele">Elegance</span> Meets Effortless <span className="ele">Beauty</span></h2>
                        <p>Discover premium salon services and luxury hair care products designed to reveal your most beautiful self.</p>
                    </div>
                    <div className="hero-btns">
                        <Link to="/contact" className="hero-book">Book Appointment</Link>
                        <Link to="/services" className="explore">Explore Services</Link>
                    </div>
                    <div className="head">
                        <div className="head-img">
                            <img src={head} alt="" />
                        </div>
                        <p>50+ Happy Users</p>
                    </div>
                </div>
            </div>
            <div className="home-services">
                <div className="home-service-btn">
                    <a href="">Services</a>
                </div>
                <div className="home-services-text">
                    <h2>Our Services</h2>
                    <div className="view-flex">
                        <div className="view-flex-paragraph">
                            <p>From intricate braiding to professional styling, we offer a full range of premium hair services.</p>
                        </div>
                        <div className="view-btn">
                            <p>View All Services</p>
                            <Link to="/services">
                                <img src={arrow} alt="view services" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="home-services-card">
                    <div className="card1">
                        <img src={card1} alt="" />
                        <div className="card-text-container">
                            <div className="card-text">
                                <h4>Braiding</h4>
                                <p>Precision cornrows crafted with neat feed-in braids, for a sleek, long-lasting.</p>
                            </div>
                            <div className="price">
                                <Link to="/services">Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card1">
                        <img src={card2} alt="" />
                        <div className="card-text-container">
                            <div className="card-text">
                                <h4>Wigs</h4>
                                <p>Premium wigs styled to blend naturally, giving you effortless beauty and confidence.</p>
                            </div>
                            <div className="price">
                                <Link to="/services">Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card1">
                        <img src={card3} alt="" />
                        <div className="card-text-container">
                            <div className="card-text">
                                <h4>Hair Treatment</h4>
                                <p>Nourishing treatments designed to restore strength, shine, and healthy hair.</p>
                            </div>
                            <div className="price">
                                <Link to="/services">Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card1">
                        <img src={card4} alt="" />
                        <div className="card-text-container">
                            <div className="card-text">
                                <h4>Styling</h4>
                                <p>Professional styling that enhances your look with smooth, elegant finishes.</p>
                            </div>
                            <div className="price">
                                <Link to="/services">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="why">
                <div className="why-text">
                    <h2>Why Choose Us</h2>
                    <p>We're committed to excellence in every strand, every style, every experience.</p>
                </div>
                <div className="why-cards">
                    <div className="why-card1">
                        <div className="why-image">
                            <img src={why1} alt="" />
                        </div>
                        <div className="why-card-text">
                            <h4>Personalized Care</h4>
                            <p>Every appointment begins with a personalized consultation, ensuring our services are perfectly tailored to your hair type and lifestyle.</p>
                        </div>
                    </div>
                    <div className="why-card1">
                        <img src={why2} alt="" />
                        <div className="why-card-text">
                            <h4>Premium Quality</h4>
                            <p> We offer premium salon-grade services, quality hair products and 100% human hair, crafted to deliver flawless, long-lasting results.</p>
                        </div>
                    </div>
                    <div className="why-card1">
                        <img src={why3} alt="" />
                        <div className="why-card-text">
                            <h4>Expert Stylists</h4>
                            <p>Our Stylists are expertly trained in the most advanced techniques, they combine precision and creativity to perfect every look tailored uniquely to you.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop">
                <div className="shop-container">
                    <div className="home-shop-btn">
                        <a href="">Shop the look</a>
                    </div>
                    <h2>Featured Products</h2>
                    <p>Salon-quality care for your home routine. Hand-picked products to maintain your style.</p>
                </div>
                <div className="shop-card">
                    <div className="card2">
                        <img src={shop1} alt="" />
                        <div className="shop-card-container">
                            <div className="shop-card-text">
                                <h4>Loose Curl</h4>
                                <p>24-hour hold without the flake or </p>
                            </div>
                            <div className="shop-price">
                                <p>£7.99</p>
                                <div className="price-img">
                                    <img
                                        src={Bag}
                                        alt="add to cart"
                                        className="bag-btn"
                                        onClick={() => setCartCount(prev => prev + 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card2">
                        <img src={shop2} alt="" />
                        <div className="shop-card-container">
                            <div className="shop-card-text">
                                <h4>Sleek Edge Control</h4>
                                <p>24-hour hold without the flake or  </p>
                            </div>
                            <div className="shop-price">
                                <p>£24.99</p>
                                <div className="price-img">
                                    <img
                                        src={Bag}
                                        alt="add to cart"
                                        className="bag-btn"
                                        onClick={() => setCartCount(prev => prev + 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card2">
                        <img src={shop3} alt="" />
                        <div className="shop-card-container">
                            <div className="shop-card-text">
                                <h4>French Curl</h4>
                                <p>24-hour hold without the flake or </p>
                            </div>
                            <div className="shop-price">
                                <p>£7.99</p>
                                <div className="price-img">
                                    <img
                                        src={Bag}
                                        alt="add to cart"
                                        className="bag-btn"
                                        onClick={() => setCartCount(prev => prev + 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card2">
                        <img src={shop4} alt="" />
                        <div className="shop-card-container">
                            <div className="shop-card-text">
                                <h4>Sleek Edge Control</h4>
                                <p>24-hour hold without the flake or </p>
                            </div>
                            <div className="shop-price">
                                <p>£18.00</p>
                                <div className="price-img">
                                    <img
                                        src={Bag}
                                        alt="add to cart"
                                        className="bag-btn"
                                        onClick={() => setCartCount(prev => prev + 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center">
                    <div className="shop-now-btn">
                        <Link to="/products">
                            Shop All Products <img src={arrow} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
            {/*
            <div className="testimonials">
                <div className="testimonial-container">
                    <div className="testimonial-btn">
                        <div className="test">TESTIMONIALS</div>
                    </div>
                    <h2>What Our Clients Say</h2>
                    <p>Hear what our clients have to say about their experience</p>
                </div>
                <div className="testimonial-cards">
                    <div className="testimonial-slider">
                        <div className="slide-track">
                            <div className="test-card1">
                                <div className="avatar">
                                    <div className="avatar-img">
                                        <img src={avatar} alt="" />
                                        <div className="avatar-text">
                                            <h4>Gift Moses</h4>
                                            <p>CEO, company</p>
                                        </div>
                                    </div>
                                    <div className="ratings">
                                        <img src={star} alt="" />
                                    </div>
                                </div>
                                <div className="quotes">
                                    <img src={marks} alt="" />
                                </div>
                                <div className="test-text">
                                    <p>Absolutely stunning work! My box braids lasted 8 weeks and looked perfect the entire time. The attention to detail and care for my natural hair was exceptional. </p>
                                </div>
                            </div>
                            <div className="test-card1">
                                <div className="avatar">
                                    <div className="avatar-img">
                                        <img src={avatar1} alt="" />
                                        <div className="avatar-text">
                                            <h4>Jumoke Adetola</h4>
                                            <p>CFO, company</p>
                                        </div>
                                    </div>
                                    <div className="ratings">
                                        <img src={star} alt="" />
                                    </div>
                                </div>
                                <div className="quotes">
                                    <img src={marks} alt="" />
                                </div>
                                <div className="test-text">
                                    <p>The wig installation was flawless! It looks so natural that people think it's my real hair. The team took their time to ensure everything was perfect. Worth every penny!</p>
                                </div>
                            </div>
                            <div className="test-card1">
                                <div className="avatar">
                                    <div className="avatar-img">
                                        <img src={avatar} alt="" />
                                        <div className="avatar-text">
                                            <h4>Gift Moses</h4>
                                            <p>CEO, company</p>
                                        </div>
                                    </div>
                                    <div className="ratings">
                                        <img src={star} alt="" />
                                    </div>
                                </div>
                                <div className="quotes">
                                    <img src={marks} alt="" />
                                </div>
                                <div className="test-text">
                                    <p>Absolutely stunning work! My box braids lasted 8 weeks and looked perfect the entire time. The attention to detail and care for my natural hair was exceptional. </p>
                                </div>
                            </div>
                            <div className="test-card1">
                                <div className="avatar">
                                    <div className="avatar-img">
                                        <img src={avatar1} alt="" />
                                        <div className="avatar-text">
                                            <h4>Jumoke Adetola</h4>
                                            <p>CFO, company</p>
                                        </div>
                                    </div>
                                    <div className="ratings">
                                        <img src={star1} alt="" />
                                    </div>
                                </div>
                                <div className="quotes">
                                    <img src={marks} alt="" />
                                </div>
                                <div className="test-text">
                                    <p>Best braiding experience ever! The knotless technique was so gentle on my edges and the braids are lightweight and beautiful. I get compliments everywhere I go!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            */}
            <div>
                <Bookings />
            </div>
            <div className="try">
                <div className="transform">
                    <h2>Ready to Transform Your Hair?</h2>
                    <p>Book your appointment today and experience the luxury of Elegant Impressions.</p>
                    <div className="transfrom-btns">
                        <Link to="/contact" className="appoint">Book Appointment</Link>
                        <Link to="/contact" className="us">Contact Us</Link>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </section>
    )
};

export default HomePage;