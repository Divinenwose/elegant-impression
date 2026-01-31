import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import arrowLeft from "../../assets/arrow-left.png";
import { useCart } from "../../context/CartContext";
import purseIcon from "../../assets/purse.png";
import secure from "../../assets/secure.png";
import free from "../../assets/free.png";
import down from "../../assets/down.png";
import Footer from "../../components/Footer/Footer.jsx";
import "./Order.css";

const OrderPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingPolicy, setShippingPolicy] = useState(""); 


  const [activeStep, setActiveStep] = useState(1);

  const [totals, setTotals] = useState({
    subtotal: 0,
    shippingCost: 0,
    total: 0,
    estimatedDelivery: "",
  });

  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });



  const handleInputChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  /* COPY OF CART MODAL TOTAL LOGIC */
  useEffect(() => {
    const calculateTotals = async () => {
      if (cartItems.length === 0) {
        setTotals({ subtotal: 0, shippingCost: 0, total: 0, estimatedDelivery: "" });
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/orders/calculate", {
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          country: "UK",
        });

        setTotals(res.data);
      } catch {
        const subtotal = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const shippingCost = subtotal >= 75 ? 0 : 5;

        setTotals({
          subtotal,
          shippingCost,
          total: subtotal + shippingCost,
          estimatedDelivery: "N/A",
        });
      }
    };

    calculateTotals();
  }, [cartItems]);

  // Fetch shipping policy on mount
  useEffect(() => {
    const fetchShippingPolicy = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/content/shipping_policy");
        setShippingPolicy(res.data.content);
      } catch (err) {
        console.error("Error fetching shipping policy:", err);
      }
    };
    fetchShippingPolicy();
  }, []);

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="back-shop" onClick={() => navigate("/products")}>
          <img src={arrowLeft} alt="back" />
          <span>Back to Shop</span>
        </div>
        <div className="page-tracker">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <span
                className={activeStep === step ? "active" : ""}
                onClick={() => setActiveStep(step)}
              >
                {step}
              </span>
              {step !== 3 && <span className="line"></span>}
            </React.Fragment>
          ))}
        </div>
        <div className="order-content">
          {activeStep === 1 && (
            <>
              <div className="ac">
                <div className="contact-info">
                  <h3>Contact Information</h3>

                  <div className="contact-form">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={contactInfo.fullName}
                      onChange={handleInputChange}
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={contactInfo.email}
                      onChange={handleInputChange}
                    />

                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactInfo.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="ship-address">
                    <h4>Shipping Address</h4>
                    <div className="ship-form">
                      <div className="adresss">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          value={contactInfo.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="ship-location">
                        <div className="city">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={contactInfo.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="state">
                          <label htmlFor="state">State</label>
                          <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={contactInfo.state}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="zip">
                          <label htmlFor="city">Zip Code</label>
                          <input
                            type="text"
                            name="zip"
                            placeholder="Zip Code"
                            value={contactInfo.zip}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-items">
                    {cartItems.map((item) => (
                      <div className="summary-item" key={item._id}>
                        <div className="sum-flex">
                          <div className="na">
                            <img
                              src={item.images?.[0] || purseIcon}
                              alt={item.name}
                              className="summary-img"
                            />
                          </div>
                          <div className="summary-details">
                            <p className="name">{item.name}</p>
                            <div className="qty">
                              <p className="qty1">
                                Qty: {item.quantity}
                                <span>£{item.price.toFixed(2)}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="summary-totals">
                    <div className="su-tot">
                      <div className="tot">
                        <p>
                          Subtotal: <span>£{totals.subtotal.toFixed(2)}</span>
                        </p>
                        <p>
                          Shipping: <span>£{totals.shippingCost?.toFixed(2)}</span>
                        </p>
                      </div>
                      <p className="free-shipping">Free Shipping on orders over £75</p>
                    </div>
                    <div className="tto">
                      <h4 className="tal">
                        Total: <span>£{totals.total.toFixed(2)}</span>
                      </h4>
                    </div>
                  </div>
                  <div className="order-icons">
                    <div className="icon1">
                      <div className="secure">
                        <img src={secure} alt="" />
                      </div>
                      <p>Secure Checkout</p>
                    </div>
                    <div className="icon1">
                      <div className="secure">
                        <img src={free} alt="" />
                      </div>
                      <p>Free Shipping</p>
                    </div>
                  </div>
                  <div className="order-dropdown">
                    <div
                      className="shipping-header"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                      <div className="ship-f">
                        <div>
                          <img src={free} alt="" />
                        </div>
                        <h3>Shipping Policy</h3>
                      </div>
                      <img src={down} className={`arrow ${isModalOpen ? "open" : ""}`} />
                    </div>

                    {/* Dropdown content */}
                    {isModalOpen && shippingPolicy && (
                      <div
                        className="shipping-content"
                        id="shipping-policy-content"
                        dangerouslySetInnerHTML={{ __html: shippingPolicy }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderPage;
