import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react"

export const productContext = createContext();

const ContextPage = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [search, setsearch] = useState("");
  const [isadmin, setIsadmin] = useState(false)
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  const [user, setuser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const userAuth = async () => {
    try {
      const res = await axios.get("https://crochet-app-backend.onrender.com/api/users/me", {
        withCredentials: true,
      });

      if (res.data) {
        setuser(res.data.user);
        setIsLoggedIn(true);
      } else {
        setuser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setuser(null);
      setIsLoggedIn(false); 
    }
  };
  
  useEffect(() => {
    userAuth();
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://crochet-app-backend.onrender.com/api/products");
        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const filteredArray = products.filter((item) => {
    const searchTerm = search.trim().toLowerCase();
    return item.name.toLowerCase().includes(searchTerm);
  });

  const addToCart = (_id) => {
    const clickedItem = products.find((item) => item._id === _id);
    console.log(clickedItem);
    const isExisting = cart.find((item) => item._id === clickedItem._id);
    if (isExisting) {
      const updateCart = cart.map((item) => {
        if (item._id === clickedItem._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updateCart);
    } else {
      setCart([...cart, { ...clickedItem, quantity: 1 }]);
    }
  };

  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const containerVariants = {
    pulse: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  
  return (
    <productContext.Provider
      value={{
        dotVariants,
        containerVariants,
        loading,
        search,
        setsearch,
        filteredArray,
        setLoading,
        products,
        setProducts,
        cart,
        setCart,
        addToCart,
        userAuth,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ContextPage;