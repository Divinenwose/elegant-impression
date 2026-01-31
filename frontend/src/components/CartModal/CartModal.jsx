import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Close from "../../assets/closebtn.png";
import cart from "../../assets/cart.png";
import "./CartModal.css";
import { useCart } from "../../context/CartContext";
import plusIcon from "../../assets/plus.png";
import minusIcon from "../../assets/minus.png";
import trash from "../../assets/trash.png";
import shop1 from "../../assets/shop1.png";
import arrowright from "../../assets/arrow1.png";

const CartModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  const [totals, setTotals] = useState({
    subtotal: 0,
    shippingCost: 0,
    total: 0,
    estimatedDelivery: "",
  });

  // Calculate totals whenever cartItems change
  useEffect(() => {
    const calculateTotals = async () => {
      if (cartItems.length === 0) {
        setTotals({ subtotal: 0, shippingCost: 0, total: 0, estimatedDelivery: "" });
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/orders/calculate", {
          items: cartItems.map(item => ({ product: item._id, quantity: item.quantity })),
          country: "UK", // or dynamically fetch user's country
        });

        setTotals(response.data);
      } catch (error) {
        console.error("Error calculating totals:", error);

        // Fallback calculation if API fails
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingCost = subtotal >= 75 ? 0 : 5; // example shipping
        const total = subtotal + shippingCost;

        setTotals({
          subtotal,
          shippingCost,
          total,
          estimatedDelivery: "N/A",
        });
      }
    };

    calculateTotals();
  }, [cartItems]);

  const handleShopNow = () => {
    navigate("/products");
    onClose();
  };

  const handleProceedToCheckout = () => {
    navigate("/orders");
    onClose();
  };

  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-btn" onClick={onClose}>
          <img src={Close} alt="close button" />
        </button>
      </div>

      <div className="cart-body">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img src={cart} alt="empty cart" />
            <p>
              Your cart is empty <span className="but">but it doesn’t have to be.</span>
            </p>
            <button className="shop-btn" onClick={handleShopNow}>Shop Now</button>
          </div>
        ) : (
          <div className="cart-flex">
            <div className="cart-items">
              {cartItems.map(item => (
                <div className="cart-item" key={item._id}>
                  <img
                    className="cart-img"
                    src={item.images?.[0] || shop1}
                    alt={item.name}
                  />
                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>£{item.price.toFixed(2)}</p>
                    <div className="ct">
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => decreaseQty(item._id)}>
                          <img className="minus" src={minusIcon} alt="Decrease quantity" />
                        </button>

                       
                        <span className="qty-number">{item.quantity}</span>

                        
                        <button className="qty-btn" onClick={() => increaseQty(item._id)}>
                          <img src={plusIcon} alt="Increase quantity" />
                        </button>
                      </div>

                      
                      <button className="trash" onClick={() => removeItem(item._id)}>
                        <img src={trash} alt="Remove item" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-p">
                <p>Subtotal: <span>£{totals.subtotal.toFixed(2)}</span></p>
                <p>Shipping: <span>£{totals.shippingCost?.toFixed(2)}</span></p>
                {totals.shippingCost === 0 && (
                  <p className="free-shipping">Free Shipping on orders over £75</p>
                )}
                <h3>Total: <span>£{totals.total.toFixed(2)}</span></h3>
                {totals.estimatedDelivery && (
                  <p>Estimated Delivery: {totals.estimatedDelivery}</p>
                )}
              </div>

              <div className="summ">
                <button className="proceed" onClick={handleProceedToCheckout}>
                  Proceed To Checkout <img src={arrowright} alt="arrow-right" />
                </button>
                <button className="continue" onClick={onClose}>Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
