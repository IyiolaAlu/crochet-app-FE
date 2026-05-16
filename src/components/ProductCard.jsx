import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { productContext } from "../context/ContextPage";
import "./ProdCard.css";

const ProductCard = ({
  id,
  image,
  name,
  price,
  description,
  onAddToCart,
  onDeleteProduct,
  onOpenEditProduct,
}) => {
  const { user } = useContext(productContext);

  // Your original price formatting
  const nairaFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={image}
          className="product-image"
          alt={name}
        />
        {user?.isAdmin && (
          <div className="admin-actions">
            <button
              onClick={onOpenEditProduct}
              className="admin-btn edit-btn"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Edit
            </button>
            <button onClick={onDeleteProduct} className="admin-btn delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <p className="product-price">{price}</p>
        {/* <p className="product-description">{description}</p> */}
        
        <div className="product-footer">
          <button onClick={onAddToCart} className="add-to-bag-btn">
            Add to Bag
          </button>
        </div>
        
        <div className="mt-2">
          <Link
            to={`/product/${id}`}
            className="view-details-link"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;