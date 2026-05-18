import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import CartCard from "./CartCard";
import { productContext } from "../context/ContextPage";
import Logout from "../pages/Logout";
import "./Navbar.css";

const NavBar = () => {
  const { search, setsearch, cart, setCart, isLoggedIn, user } =
    useContext(productContext);

  const nairaFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  if (hideNavbar) return null;

  const deleteCartProd = (_id) => {
    const del = cart.filter((item) => item._id !== _id);
    setCart(del);
  };

  const incCartProd = (_id) => {
    const clickedItem = cart.find((item) => item._id === _id);
    const inc = cart.map((item) => {
      if (item._id === clickedItem._id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(inc);
  };

  const decCartProd = (_id) => {
    const clickedItem = cart.find((item) => item._id === _id);
    const dec = cart.map((item) => {
      if (item._id === clickedItem._id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }
      return item;
    });
    setCart(dec);
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  
console.log("Navbar - isLoggedIn:", isLoggedIn);
console.log("Navbar - user:", user);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom position-fixed z-2 w-100">
        <div className="container-fluid">

          <a className="navbar-brand" href="#">Fiks Crochet</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              {user?.isAdmin && (
                <li className="nav-item">
                  <Link to="/form" className="nav-link">Form</Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">Products</Link>
              </li>
              <li className="nav-item">
                <button
                  className="cart-btn"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  Cart <span className="cart-count">{cart.length}</span>
                </button>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2 me-3">
              {isLoggedIn ? (
                <Logout />
              ) : (
                <>
                  <Link to="/login" className="auth-btn">Login</Link>
                  <Link to="/signup" className="auth-btn primary">Sign Up</Link>
                </>
              )}
            </div>

            <form className="d-flex" role="search">
              <input
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="form-control"
                placeholder="Search"
                type="text"
              />
            </form>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Your Bag</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p style={{ color: "#888780", fontSize: "14px" }}>Your bag is empty</p>
          ) : (
            cart.map(({ _id, image, name, price, quantity, description }) => (
              <CartCard
                key={_id}
                image={image}
                name={name}
                price={nairaFormatter.format(price)}
                quantity={quantity}
                description={description}
                onIncreaseQuantity={() => incCartProd(_id)}
                onDecreaseQuantity={() => decCartProd(_id)}
                onDeleteCartItem={() => deleteCartProd(_id)}
              />
            ))
          )}
          <div className="d-flex mt-3 justify-content-between align-items-center">
            <span style={{ fontSize: "13px", color: "#888780", letterSpacing: "0.05em", textTransform: "uppercase" }}>Subtotal</span>
            <h5 style={{ margin: 0, color: "#2c2c2a", fontFamily: "'Playfair Display', serif" }}>{nairaFormatter.format(totalPrice)}</h5>
          </div>
        </div>
        <Link
          to={"/checkout"}
          className="auth-btn primary"
          style={{ margin: "1rem", borderRadius: "999px", textAlign: "center", justifyContent: "center" }}
        >
          Checkout — {nairaFormatter.format(totalPrice)}
        </Link>
      </div>
    </>
  );
};

export default NavBar;