import {useState} from "react";
import "./Gallery.css";
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

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Services");

    const categories = ["All Services", "Braiding", "Wigs", "Extensions", "Styling", "Natural", "Twists"];

    const services = [
        {
            category: "Braiding",
            img: boxbraid
        },
        {
            category: "Braiding",
            img: knotless
        },
        {
            category: "Treatments",
            img: wash
        },
        {
            category: "Braiding",
            img: conrows
        },
        {
            category: "Braiding",
            img: locs
        },
        {
            category: "Treatments",
            img: conditioning
        },
        {
            category: "Wigs",
            img: weave
        },
        {
            category: "Wigs",
            img: closure
        },
        {
            category: "Braiding",
            img: feed
        },
        {
            category: "Braiding",
            img: lemonade
        },
        {
            category: "Braiding",
            img: goddess
        },
        {
            category: "Braiding",
            img: crochet
        },
        {
            category: "Braiding",
            img: french
        },
        {
            category: "Braiding",
            img: bone
        },
        {
            category: "Wigs",
            img: curly
        },
        {
            category: "Wigs",
            img: pixie
        },
        {
            category: "Wigs",
            img: wave
        },
        {

            category: "Wigs",
            img: nadula
        },
        {
            category: "Wigs",
            img: glue
        },
        {
            category: "Wigs",
            img: blonde
        },
        {
            category: "Wigs",
            img: prom
        }
    ];

    const filteredServices =
        selectedCategory === "All Services"
            ? services
            : services.filter(item => item.category === selectedCategory);

    return (
        <section className="gallery">
            <div className="gallery-hero">
                <div className="overlay"></div>
                <div className="gallery-text">
                    <h2>Gallery</h2>
                    <p>Browse our portfolio of stunning hair transformations and get inspired for your next look.</p>
                </div>
            </div>
            <div className="gallery-section">
                <div className="gallery-filters">
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
                <div className="gallery-grid">
                    {filteredServices.map((service, index) => (
                        <div className="gallery-cards" key={index}>
                            <img src={service.img} alt={service.title} className="image" />
                        </div>
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
    );
};

export default Gallery;