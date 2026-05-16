import React from "react";
import "./CartCardd.css";

const CartCard = ({
  image,
  title,
  name,
  price,
  quantity,
  onDeleteCartItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  return (
    <div className="cart-card">
      <div className="cart-card-image">
        <img src={image} alt={name || title} />
      </div>
      <div className="cart-card-info">
        <h5 className="cart-card-name">{name || title}</h5>
        <p className="cart-card-price">{price}</p>
        <div className="cart-card-qty">
          <button onClick={onDecreaseQuantity} className="qty-btn">−</button>
          <span className="qty-value">{quantity}</span>
          <button onClick={onIncreaseQuantity} className="qty-btn">+</button>
        </div>
        <button onClick={onDeleteCartItem} className="cart-remove-btn">Remove</button>
      </div>
    </div>
  );
};

export default CartCard;