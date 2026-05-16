import React from "react";
import "./Mains.css";
import { useContext } from "react";
import { productContext } from "../context/ContextPage";
import { Link } from "react-router-dom";

const Main = () => {
  const { products } = useContext(productContext);

  const relatedProd = products.filter((item) => item.name).slice(0, 3);

  const badges = ["Limited Edition", "Bestseller", "New Arrival"];

  const nairaFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="main-card">
      <div className="main-header-section">
        <span className="main-subtitle">Curated Collection</span>
        <h2 className="main-title">FIKS CROCHET COLLECTIONS</h2>
        <p className="main-description">
          Small-batch pieces designed for the slow-living enthusiast.
        </p>
      </div>

      <div className="main-products-grid">
        {relatedProd.map(({ _id, image, name, price }, index) => (
          <div className="main-product-card" key={_id}>
            <div className="main-product-image-container">
              <img src={image} className="main-product-image" alt={name} />
              <span className="main-product-badge">{badges[index]}</span>
            </div>
            <div className="main-product-info">
              <h3 className="main-product-title">{name}</h3>
              <p className="main-product-price">{nairaFormatter.format(price)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link to={'/product'} className="main-view-more-btn">
        View More
      </Link>
    </div>
  );
};

export default Main;