import React from "react";
import "./Shipping.css";
import Footer from "../../components/Footer/Footer";

const ShippingPolicy = () => {
    return (
        <section className="shipping-policy">
            <div className="shipping-policy-container">
                <div className="shipping-wrapper">
                    <h2>Shipping Policy</h2>
                    <div className="shipping-content">
                        <p>At Elegant Impressions, our goal is to provide reliable and efficient shipping options for all customers, regardless of location. If you have any questions regarding shipping options or costs, please contact us using the details provided below. </p>
                        <div className="partners">
                            <h4>Shipping Partners</h4>
                            <ul className="partners-ul">
                                <li>United Kingdom: Royal Mail</li>
                                <li>International Orders: DHL, FedEx, DPD</li>
                            </ul>
                        </div>
                        <div className="partners">
                            <h4>Order Processing Time</h4>
                            <p>All orders are processed within 1–3 working days.</p>
                            <p>Please note that the following services require additional processing time of 2–5 working days:</p>
                            <ul className="partners-ul">
                                <li>Dyeing or bleaching colours</li>
                                <li>Creating textures</li>
                                <li>Customised wigs</li>
                                <li>Wig styling</li>
                                <li>Density increase requests</li>
                            </ul>
                            <p>If you require urgent processing, please contact us as soon as possible after placing your order.</p>
                        </div>
                        <div className="partners">
                            <h4>Shipping Time</h4>
                            <ul className="partners-ul">
                                <li>United Kingdom: 2–7 working days</li>
                                <li>International (Express Shipping – DHL/FedEx): 5–12 working days</li>
                            </ul>
                            <p>Approximately 98% of customers receive their orders within 15 days.</p>
                        </div>
                        <div className="partners">
                            <h4>Shipping Costs</h4>
                            <p>Shipping costs vary depending on:</p>
                            <ul className="partners-ul">
                                <li>Delivery location</li>
                                <li>Weight of the order</li>
                            </ul>
                            <p>If a buyer cancels an order or returns goods for personal reasons, the buyer is responsible for all shipping-related costs.</p>
                        </div>
                        <div className="partners">
                            <h4>Shipping Address Changes</h4>
                            <p>If you need to modify your shipping address, please contact us within 12 hours of placing your order.</p>
                            <p>Please note:</p>
                            <ul className="partners-ul">
                                <li>We are unable to change shipping addresses once an order has been dispatched</li>
                                <li>Orders may be dispatched as early as 1 hour after placement</li>
                            </ul>
                        </div>
                        <div className="partners">
                            <h4>Customer Support & Contact Information</h4>
                            <ul className="partners-ul">
                                <li>Phone (Operating hours): 07831331434</li>
                                <li>Email: justelegantimpressions@gmail.com</li>
                                <li>Social Media: You may also leave a message via our official social media accounts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default ShippingPolicy;
