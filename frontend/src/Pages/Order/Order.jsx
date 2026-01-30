import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import arrowLeft from "../../assets/arrow-left.png";
import { useCart } from "../../context/CartContext";
import purseIcon from "../../assets/purse.png";
import Footer from "../../components/Footer/Footer.jsx";
import "./Order.css";

const OrderPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  /* STEP NAV STATE */
  const [activeStep, setActiveStep] = useState(1);

  /* SAME TOTALS AS CART MODAL */
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
          items: cartItems.map(item => ({
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

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="back-shop" onClick={() => navigate("/products")}>
          <img src={arrowLeft} alt="back" />
          <span>Back to Shop</span>
        </div>
        <div className="page-tracker">
          {[1, 2, 3].map(step => (
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
                    {cartItems.map(item => (
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
                              <p className="qty1">Qty: {item.quantity}</p>
                              <span>£{totals.subtotal.toFixed(2)}</span>
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
                      <p className="free-shipping">
                        Free Shipping on orders over £75
                      </p>
                    </div>
                    <h3>
                      Total: <span>£{totals.total.toFixed(2)}</span>
                    </h3>
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
