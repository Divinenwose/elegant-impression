import React from "react";
import "./Contact.css";
import locationcon from "../../assets/location-con.png";
import call from "../../assets/call.png";
import sms from "../../assets/sms.png";
import clock from "../../assets/clock.png";
import Footer from "../../components/Footer/Footer.jsx";

const Contact = () => {
    return (
        <section className="contact">
            <div className="contact-container">
                <div className="overlay"></div>
                <div className="contact-hero">
                    <h2>Get in Touch</h2>
                    <p>We'd love to hear from you. Reach out for appointments, inquiries, <br /> or just to say hello.</p>
                </div>
            </div>
            <div className="bookings">
                <div className="bookings-container">
                    <div className="bookings-message">
                        <div className="message-text">
                            <h4>Send Us a Message</h4>
                            <p>Have questions or need assistance? Our team is always ready to guide you on your journey.</p>
                        </div>
                        <form action="mailto:yourEmail@example.com" method="POST" enctype="text/plain">
                            <div className="full-name">
                                <label htmlFor="Full Name">Full Name</label>
                                <input type="text" name="Full Name" placeholder="Your full name" required></input>
                            </div>
                            <div className="email">
                                <label htmlFor="Full Name">Email</label>
                                <input type="text" name="Email" placeholder="yourwinzy@gmail.com" required></input>
                            </div>
                            <div className="message-telephone">
                                <label htmlFor="Phone">Phone Number</label>
                                <input type="tel" name="Phone" placeholder="Phone Number" required></input>
                            </div>
                            <div className="desired">
                                <label htmlFor="Desired Service">Desired Service</label>
                                <input type="text" name="Desired Service" placeholder="e.g Braids, Weeve, etc" required></input>
                            </div>
                            <div className="text-mt">
                                <label htmlFor="Message">Message</label>
                                <textarea name="Message" placeholder="Your message" rows="4"></textarea>
                            </div>
                            <div className="sumit-btn">
                                <button type="submit">Send Message</button>
                            </div>
                        </form>
                    </div>
                    <div className="bookings-contact-container">
                        <div className="bookings-contact">
                            <div className="contact-text">
                                <h4>Contact Information</h4>
                            </div>
                            <div className="contact-info">
                                <div className="contact-img">
                                    <img src={locationcon} alt="" />
                                </div>
                                <div className="contact-img-text">
                                    <h4>Location</h4>
                                    <p>27 A Rea street, Digbeth B5 6LB </p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="contact-img">
                                    <img src={call} alt="" />
                                </div>
                                <div className="contact-img-text">
                                    <h4>Phone</h4>
                                    <p>+447831331434 </p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="contact-img">
                                    <img src={sms} alt="" />
                                </div>
                                <div className="contact-img-text">
                                    <h4>Email</h4>
                                    <p>2justelegantimpressions@gmail.com </p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="contact-clock-img">
                                    <img src={clock} alt="" />
                                </div>
                                <div className="contact-clock-text">
                                    <h4>Opening Hours</h4>
                                    <p>Mon - Fri: 9:30 AM - 6:00 PM </p>
                                    <p>Sat: 10:00 AM - 5:00 PM</p>
                                    <p>Sun: Closed</p>
                                </div>
                            </div>
                        </div>
                        <div className="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.3726243086726!2d-1.8924626239929927!3d52.4723886397543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc7d0eb5ede7%3A0xd23dcce729315f5c!2s27a%20Rea%20St%20S%2C%20Birmingham%20B5%206LB%2C%20UK!5e0!3m2!1sen!2sng!4v1768195835842!5m2!1sen!2sng" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </section>
    );
};

export default Contact;