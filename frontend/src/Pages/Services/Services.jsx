import React, { useState } from "react";
import "./Services.css";
import boxbraid from "../../assets/box-braid.png";
import knotless from "../../assets/knotless.png";
import crochet from "../../assets/crochet.png";
import wash from "../../assets/wash.png";
import locs from "../../assets/locs.png";
import conrows from "../../assets/conrows.png";
import conditioning from "../../assets/conditioning.png";
import weave from "../../assets/weave.png";
import closure from "../../assets/closure.png";
import clock from "../../assets/clock.png";
import Footer from "../../components/Footer/Footer.jsx";

const Services = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Services");

    const categories = ["All Services", "Braiding", "Wigs", "Treatments", "Styling"];

    const services = [
        {
            title: "Box Braids",
            duration: "4-6 hours",
            content: "Classic protective style with individual braids that can last 6-8 weeks with proper care",
            price: "£95",
            category: "Braiding",
            img: boxbraid
        },
        {
            title: "Medium Knotless Braids",
            duration: "5 hours",
            content: "Gentle braiding technique that reduces tension on the scalp for a more comfortable wear",
            price: "$120",
            category: "Braiding",
            img: knotless
        },
        {
            title: "Crochet Braids",
            duration: "3-4 hours",
            content: "Versatile protective style with natural-looking crochet hair installations. ",
            price: "$120",
            category: "Braiding",
            img: crochet
        },
        {
            title: "Wash & Style",
            duration: "1.5-2 hours",
            content: "Deep cleansing, conditioning, and styling for healthy natural hair.",
            price: "£40",
            category: "Treatments",
            img: wash
        },
        {
            title: "Faux Locs",
            duration: "4-5 hours",
            content: "Beautiful goddess locs or bohemian locs for a stunning protective style.",
            price: "£145",
            category: "Braiding",
            img: locs
        },
        {
            title: "Cornrows",
            duration: "2-3 hours",
            content: "Intricate cornrow patterns, including feed-in braids and tribal designs.",
            price: "£65",
            category: "Braiding",
            img: conrows
        },
        {
            title: "Deep Conditioning Treatment",
            duration: "3-5 hours",
            content: "Intensive moisture treatment to restore health and shine to damaged hair",
            price: "$120",
            category: "Treatments",
            img: conditioning
        },
        {
            title: "Quick Weave",
            duration: "2-3 hours",
            content: "Fast and flawless bonded weave application for instant transformation.",
            price: "£95",
            category: "Wigs",
            img: weave
        },
        {
            title: "Closure/Frontal Install",
            duration: "4-5 hours",
            content: "Lace closure or frontal installation for the most natural hairline.",
            price: "£200",
            category: "Wigs",
            img: closure
        }
    ];

    const filteredServices =
        selectedCategory === "All Services"
            ? services
            : services.filter(item => item.category === selectedCategory);

    return (
        <section className="services">
            <div className="services-container">
                <div className="overlay"></div>
                <div className="services-text">
                    <h2>Our Services</h2>
                    <p>Indulge in our premium hair services designed to enhance your natural beauty. From protective styling to luxury treatments, we offer a personalized experience for every client. </p>
                </div>
            </div>
            <div className="services-section">
                <div className="service-filters">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={selectedCategory === cat ? "active-filter" : ""}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="service-grid">
                    {filteredServices.map((service, index) => (
                        <div className="service-cards" key={index}>
                            <img src={service.img} alt={service.title} className="images" />
                            <div className="service-info">
                                <h3>{service.title}</h3>
                                <div className="dur">
                                    <div className="dur-img">
                                        <img src={clock} alt="clock-icon" />
                                    </div>
                                    <p className="duration">{service.duration}</p>
                                </div>
                                <p className="content">{service.content}</p>
                                <div className="service-flex">
                                    <p className="price">From {service.price}</p>
                                    <button className="book-btn">Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="ready">
                    <div className="ready-container">
                        <h2>Ready to Book Your Appointment?</h2>
                        <p>Contact us via WhatsApp to schedule your service. We'll discuss your needs and find the perfect time for your appointment.</p>
                        <div className="ready-btns">
                            <a href="https://wa.me/447831331434" target="_blank" rel="noopener noreferrer"  className="ready-btn">Book Via Whatsapp</a>
                        </div>
                    </div>
            </div>
            <div>
                <Footer />
            </div>
        </section>
    )
};

export default Services;