import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ServiceDetails.css";
import clock from "../../assets/clock.png";
import mark from "../../assets/mark.png";
import Footer from "../../components/Footer/Footer.jsx";

const ServiceDetails = ({ services }) => {
    const { slug } = useParams();
    const [length, setLength] = useState("");
    const [size, setSize] = useState("");
    const navigate = useNavigate();

    const goToService = (slug) => {
        navigate(`/services/${slug}`);
    };

    const service = services.find(item => item.slug === slug);

    const related = services.filter(item => item.category === service.category && item.slug !== slug).slice(0, 3);


    if (!service) return <h2>Service not found</h2>;

    let totalPrice = null;

    if (length && size) {
        totalPrice = service.pricing[length]?.[size];
    }

    const basePrice = Math.min(
        ...Object.values(service.pricing).flatMap(obj => Object.values(obj))
    );

    return (
        <section className="service-details">
            <div className="service-details-container">
                <div className="details-main">
                    <div className="details-img">
                        <img src={service.img} alt={service.title} />
                    </div>

                    <div className="details-info">
                        <span className="tag">{service.category}</span>
                        <h2>{service.title}</h2>

                        <div className="duration">
                            <div className="clo">
                                <img src={clock} alt="" />
                                <span>{service.duration}</span>
                            </div>
                            <p className="price">From £{basePrice}</p>
                        </div>

                        <p className="desc">{service.content}</p>

                        <div className="length-wrapper">
                            <div className="length">
                                <select
                                    value={length}
                                    onChange={(e) => {
                                        setLength(e.target.value);
                                        setSize("");
                                    }}
                                >
                                    <option value="" disabled hidden>Length</option>
                                    {Object.keys(service.pricing).map(len => (
                                        <option key={len} value={len}>{len}</option>
                                    ))}
                                </select>
                            </div>
                            {length && (
                                <div className="size">
                                    <p className="size-label">
                                        Size: <span>{size || "Select size"}</span>
                                    </p>
                                    <div className="size-options">
                                        {Object.keys(service.pricing[length]).map(sz => (
                                            <button
                                                key={sz}
                                                type="button"
                                                className={`size-btn ${size === sz ? "active" : ""}`}
                                                onClick={() => setSize(sz)}
                                            >
                                                {sz}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {totalPrice && (
                                <div className="total-price">
                                    <div className="pr-flex">
                                        <p>Total Price</p>
                                        <h3>£{totalPrice}</h3>
                                    </div>
                                    <p>Price updates based on your selections</p>
                                </div>
                            )}
                        </div>
                        <Link
                            to="/contact"
                            className={`boo-btn ${!totalPrice ? "disabled" : ""}`}
                            onClick={(e) => {
                                if (!totalPrice) e.preventDefault();
                            }}
                        >
                            Book an appointment
                        </Link>
                    </div>
                </div>
                <div className="overview-container">
                    <h3>Overview</h3>
                    <div className="overview-flex">
                        <div className="right">
                            <div className="overview">
                                <p>{service.overview}</p>
                            </div>
                            <div className="benefits">
                                <h3>Benefits</h3>
                                <ul>
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="benefit-item">
                                            <img src={mark} alt="check-icon" className="benefit-icon" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="left">
                            <div className="box">
                                <h4>Service Details</h4>
                                <div className="box-dur">
                                    <h3>Duration</h3>
                                    <p>{service.duration}</p>
                                </div>
                                <div className="box-du">
                                    <h3>Price Range</h3>
                                    <p className="base">From £{basePrice}</p>
                                </div>
                                <div className="box-dur">
                                    <p className="suitable">Suitable For</p>
                                    <p className="all">All hair types and textures</p>
                                </div>
                            </div>
                            <div className="need">
                                <h4>Need Help?</h4>
                                <p>Have questions about this service? Our team is here to help!</p>
                                <Link to="/contact" className="help-btn">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="also">
                {related.length > 0 && (
                    <div className="related">
                        <h2>You May Also Like</h2>
                        <div className="services-grid">
                            {related.map((service, index) => (
                                <div className="service-cards" key={index}>
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="images clickable"
                                        onClick={() => goToService(service.slug)}
                                    />
                                    <div className="service-info">
                                        <h3
                                            className="clickable"
                                            onClick={() => goToService(service.slug)}
                                        >
                                            {service.title}
                                        </h3>

                                        <div className="dur">
                                            <div className="dur-img">
                                                <img src={clock} alt="clock-icon" />
                                            </div>
                                            <p className="duration">{service.duration}</p>
                                        </div>

                                        <p className="content">{service.content1}</p>

                                        <div className="service-flex">
                                            <p className="price">From {service.price}</p>
                                            <button
                                                className="book-btn"
                                                onClick={() => navigate("/contact")}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </section>
    );
};

export default ServiceDetails;
