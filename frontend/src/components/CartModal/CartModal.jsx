import React from "react";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/closebtn.png";
import cart from "../../assets/cart.png";
import "./CartModal.css";
import { useCart } from "../../context/CartContext";
import plusIcon from "../../assets/plus.png";
import minusIcon from "../../assets/minus.png";
import trash from "../../assets/trash.png";


const CartModal = ({ onClose, cartCount }) => {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 2.9 : 0;
  const total = subtotal + shipping;



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
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img src={cart} alt="cart-icon" />
            <p>Your cart is empty <span className="but">but it doesn’t have to be.</span></p>
            <button className="shop-btn" onClick={handleShopNow}>Shop Now</button>
          </div>
        ) : (
          <>
            <div className="cart-flex">
              <div className="cart-items">
                {cartItems.map(item => (
                  <div className="cart-item" key={item._id}>
                    <img src={item.image?.[0] || cart} alt={item.name} />
                    <div className="cart-info">
                      <h4>{item.name}</h4>
                      <p>£{item.price.toFixed(2)}</p>
                      <div className="ct">
                        <div className="qty-control">
                          <button
                            className="qty-btn"
                            onClick={() => decreaseQty(item._id)}
                          >
                            <img src={minusIcon} className="minus" alt="Decrease quantity" />
                          </button>

                          <span className="qty-number">{item.quantity}</span>

                          <button
                            className="qty-btn"
                            onClick={() => increaseQty(item._id)}
                          >
                            <img src={plusIcon} alt="Increase quantity" />
                          </button>
                        </div>
                        <button className="trash" onClick={() => removeItem(item._id)}>
                          <img src={trash} alt="trash-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <p>Subtotal: £{subtotal.toFixed(2)}</p>
                <p>Shipping: £{shipping.toFixed(2)}</p>
                <h3>Total: £{total.toFixed(2)}</h3>
                <div className="summ">
                  <button>Proceed To Checkout</button>
                  <button onClick={onClose}>Continue Shopping</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default CartModal;
