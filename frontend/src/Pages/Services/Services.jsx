import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import lemonade from "../../assets/lemonade.png";
import dolly from "../../assets/dolly.png";
import goddess from "../../assets/goddess.png";
import curly from "../../assets/curly.png";
import pixie from "../../assets/pixie.png";
import wave from "../../assets/wave.png";
import nadula from "../../assets/nadula.png";
import feed from "../../assets/feed.png";
import quick from "../../assets/quick.png";
import glue from "../../assets/glue.png";
import blonde from "../../assets/blonde.png";
import prom from "../../assets/prom.png";
import french from "../../assets/french.png";
import bone from "../../assets/bone.png";
import Footer from "../../components/Footer/Footer.jsx";

const Services = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Services");

    const categories = ["All Services", "Braiding", "Wigs", "Treatments", "Styling"];

    const services = [
        {
            title: "Box Braids",
            slug: "box-braids",
            duration: "4-6 hours",
            content: "Classic protective style with individual braids that can last 6-8 weeks with proper care",
            price: "£95",
            category: "Braiding",
            img: boxbraid
        },
        {
            title: "Medium Knotless Braids",
            slug: "knotless-braids",
            duration: "5 hours",
            content: "Gentle braiding technique that reduces tension on the scalp for a more comfortable wear",
            price: "$120",
            category: "Braiding",
            img: knotless
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
            title: "Kinky Twist",
            slug: "kinky twist",
            duration: "2-3 hours",
            content: "Intricate cornrow patterns, including feed-in braids and tribal designs.",
            price: "£65",
            category: "Braiding",
            img: conrows
        },
        {
            title: "Faux Locs",
            slug: "faux-locs",
            duration: "4-5 hours",
            content: "Beautiful goddess locs or bohemian locs for a stunning protective style.",
            price: "£145",
            category: "Braiding",
            img: locs
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
        },
        {
            title: "Feed In Stitch + Butterfly",
            slug: "feed-in-stitch + butterfly",
            duration: "3-4 hours",
            content: "Versatile protective style with natural-looking crochet hair installations. ",
            price: "£120",
            category: "Braiding",
            img: feed
        },
        {
            title: "Lemonade Braids",
            slug: "lemonade-braids",
            duration: "1.5-2 hours",
            content: "Deep cleansing, conditioning, and styling for healthy natural hair.",
            price: "£40",
            category: "Braiding",
            img: lemonade
        },
        {
            title: "Goddess Braids + Pick Drop",
            slug: "goddess-braids + pick drop",
            duration: "2-3 hours",
            content: "Intricate cornrow patterns, including feed-in braids and tribal designs.",
            price: "£65",
            category: "Braiding",
            img: goddess
        },
        {
            title: "Fulani boho braids",
            slug: "fulani-boho-braids",
            duration: "2-3 hours",
            content: "Fast and flawless bonded weave application for instant transformation.",
            price: "£95",
            category: "Braiding",
            img: crochet
        },
        {
            title: "French Curls",
            slug: "french-curls",
            duration: "3-5 hours",
            content: "Intensive moisture treatment to restore health and shine to damaged hair",
            price: "£120",
            category: "Braiding",
            img: french
        },
        {
            title: "Bone Straight",
            slug: "bone-staright",
            duration: "4-5 hours",
            content: "Lace closure or frontal installation for the most natural hairline.",
            price: "£200",
            category: "Braiding",
            img: bone
        },
        {
            title: "Curly Short Bob Highlight ",
            duration: "4-6 hours",
            content: "Classic protective style with individual braids that can last 6-8 weeks with proper care",
            price: "£95",
            category: "Wigs",
            img: curly
        },
        {
            title: "Short Pixie Cut Curly Lace",
            duration: "3-4 hours",
            content: "Versatile protective style with natural-looking crochet hair installations. ",
            price: "£120",
            category: "Wigs",
            img: pixie
        },
        {
            title: " Lace Frontal Loose Wave Wigs",
            duration: "5 hours",
            content: "Gentle braiding technique that reduces tension on the scalp for a more comfortable wear",
            price: "£120",
            category: "Wigs",
            img: wave
        },
        {
            title: "Nadula 3D Body Wave",
            duration: "1.5-2 hours",
            content: "Deep cleansing, conditioning, and styling for healthy natural hair.",
            price: "£40",
            category: "Wigs",
            img: nadula
        },
        {
            title: "GlueLess Wavy Wig",
            duration: "4-5 hours",
            content: "Beautiful goddess locs or bohemian locs for a stunning protective style.",
            price: "£145",
            category: "Wigs",
            img: glue
        },
        {
            title: " Blonde Bob Wig",
            duration: "3-5 hours",
            content: "Intensive moisture treatment to restore health and shine to damaged hair",
            price: "£120",
            category: "Wigs",
            img: blonde
        },
        {
            title: "Prom Wig",
            duration: "2-3 hours",
            content: "Fast and flawless bonded weave application for instant transformation.",
            price: "£95",
            category: "Wigs",
            img: prom
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
                        <Link to={`/services/${service.slug}`} className="service-link" key={index}>
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
                        </Link>
                    ))}
                </div>

            </div>
            <div className="ready">
                <div className="ready-container">
                    <h2>Ready to Book Your Appointment?</h2>
                    <p>Contact us via WhatsApp to schedule your service. We'll discuss your needs and find the perfect time for your appointment.</p>
                    <div className="ready-btns">
                        <a href="https://wa.me/447831331434" target="_blank" rel="noopener noreferrer" className="ready-btn">Book Via Whatsapp</a>
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