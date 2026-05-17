import React, { useState } from "react";
import { productContext } from "../context/ContextPage";
import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import "../components/Loading.css"
import { motion } from "motion/react"
import NavBar from "../components/NavBar";
import "../components/ProdCard.css";
import '../components/Footer'
import Footer from "../components/Footer";

const ProductsPage = () => {
  const {
    products,
    loading,
    setProducts,
    filteredArray,
    setLoading,
    addToCart,
    dotVariants,
    containerVariants,
  } = useContext(productContext);

  const navigate = useNavigate();

  const nairaFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [error, seterror] = useState(null);

  const deleteProduct = async (_id) => {
    const res = await fetch(`http://localhost:4000/api/products/${_id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      const updatedProducts = products.filter((item) => item._id !== _id);
      setProducts(updatedProducts);
    }
  };

  const [editform, setEditform] = useState({
    image: null,
    newName: "",
    newPrice: "",
    newQuantity: "",
    newDescription: "",
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const openEdit = (_id) => {
    setEditingId(_id);
    const clickedItem = products.find((item) => item._id === _id);
    console.log(clickedItem);
    setEditform({
      image: clickedItem.image,
      newName: clickedItem.name,
      newPrice: clickedItem.price,
      newQuantity: clickedItem.quantity,
      newDescription: clickedItem.description,
    });
  };

  const saveEditDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://ost:4000/api/products/${editingId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            image: image || editform.image,
            name: editform.newName,
            price: editform.newPrice,
            quantity: editform.newQuantity,
            description: editform.newDescription,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const data = await res.json();
      if (res.ok) {
        const updatedProducts = products.map((item) => {
          return item._id === editingId ? data : item;
        });
        setLoading(false);
        setProducts(updatedProducts);
      }

      if (!res.ok) {
        setLoading(false);
        seterror(data.error);
      }
    } catch (error) {
      setLoading(false);
      seterror(error.message);
    }
  };

  return (
    <>
    <NavBar/>
      <div className="d-flex flex-wrap gap-3 pt-5">
        
        {loading ? (
         <div className="loading-overlay">
            <motion.div
                variants={containerVariants}
                animate="pulse"
                className="loading-container"
            >
                <motion.div className="loading-dot" variants={dotVariants} />
                <motion.div className="loading-dot" variants={dotVariants} />
                <motion.div className="loading-dot" variants={dotVariants} />
            </motion.div>
            <p className="loading-text">Loading...</p>
        </div>
        ) : (
      
          <div className="products-grid">
            {
              filteredArray.map(({ _id, image, name, price, description }) => (
            <ProductCard
              key={_id}
              id={_id}
              image={image}
              name={name}
              price={nairaFormatter.format(price)}
              description={description}
              onDeleteProduct={() => deleteProduct(_id)}
              onOpenEditProduct={() => openEdit(_id)}
              onAddToCart={() => addToCart(_id)}
            />
          ))
            }
          </div>
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column gap-3">
                <input onChange={handleImage} type="file" />
                <input
                  value={editform.newName}
                  onChange={(e) =>
                    setEditform({ ...editform, newName: e.target.value })
                  }
                  className="form-control w-25"
                  placeholder="Name"
                  type="text"
                />
                <input
                  value={editform.newPrice}
                  onChange={(e) =>
                    setEditform({ ...editform, newPrice: e.target.value })
                  }
                  className="form-control w-25"
                  placeholder="Price"
                  type="text"
                />
                <input
                  value={editform.newQuantity}
                  onChange={(e) =>
                    setEditform({ ...editform, newQuantity: e.target.value })
                  }
                  className="form-control w-25"
                  placeholder="Quantity"
                  type="text"
                />
                <input
                  value={editform.newDescription}
                  onChange={(e) =>
                    setEditform({ ...editform, newDescription: e.target.value })
                  }
                  className="form-control w-25"
                  placeholder="Description"
                  type="text"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={saveEditDetails}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductsPage;
