import React from "react";
import "./Contact.css";
import Footer from "../../components/Footer/Footer.jsx";
import Bookings from "../../components/Bookings/Bookings.jsx";

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
            <div>
                <Bookings />
            </div>
            <div>
                <Footer />
            </div>
        </section>
    );
};

export default Contact;