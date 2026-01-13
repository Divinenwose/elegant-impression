import React from "react";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/closebtn.png";
import cart from "../../assets/cart.png";
import "./CartModal.css";

const CartModal = ({ onClose, cartCount }) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products"); 
    onClose(); 
  };

  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-btn" onClick={onClose}><img src={Close} alt="close button icon" /></button>
      </div>

      <div className="cart-body">
        {cartCount === 0 ? (
          <div className="empty-cart">
            <img src={cart} alt="cart-icon" />
            <p>Your cart is empty <span className="but">but it doesn’t have to be.</span></p>
            <button className="shop-btn" onClick={handleShopNow}>Shop Now</button>
          </div>
        ) : (
          <div className="cart-items">
            <p>{cartCount} item(s) in your cart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
