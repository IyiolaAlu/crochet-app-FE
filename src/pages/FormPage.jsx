import React, { useContext, useState } from "react";
import { productContext } from "../context/ContextPage";
import './Form.css'
import NavBar from "../components/NavBar";

const FormPage = () => {
  const { loading, setLoading, products, setProducts } = useContext(productContext);
  const [error, seterror] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setform] = useState({
    name: "", price: "", quantity: "", description: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
  };

  const addProduct = async () => {
    const newForm = {
      image, name: form.name, price: form.price,
      quantity: form.quantity, description: form.description,
    };
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: JSON.stringify(newForm),
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        seterror(data.error);
      }
      if (res.ok) {
        setProducts([...products, data]);
        setLoading(false);
        seterror(null);
        setSuccess(true);
        // Clear form
        setform({ name: "", price: "", quantity: "", description: "" });
        setImage(null);
        setImagePreview(null);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      setLoading(false);
      seterror(error.message);
    }
  };

  return (
    <div className="form-page">
      <NavBar/>
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Add New Product</h2>
          <p className="form-subtitle">Fill in the details to add a product to your store</p>
        </div>

        {error && <p className="form-error-banner">{error}</p>}
        {success && <p className="form-success-banner">Product added successfully!</p>}

        <div className="form-body">
          {/* Image upload */}
          <div className="form-field">
            <label className="form-label">Product Image</label>
            <label className="form-image-upload">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="form-image-preview" />
              ) : (
                <div className="form-image-placeholder">
                  <span className="form-image-icon">＋</span>
                  <span>Click to upload image</span>
                </div>
              )}
              <input onChange={handleImage} type="file" accept="image/*" style={{ display: 'none' }} />
            </label>
          </div>

          <div className="form-field">
            <label className="form-label">Product Name</label>
            <input
              value={form.name}
              onChange={(e) => setform({ ...form, name: e.target.value })}
              className="form-input" placeholder="e.g. Merino Wool Cardigan" type="text"
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Price ($)</label>
              <input
                value={form.price}
                onChange={(e) => setform({ ...form, price: e.target.value })}
                className="form-input" placeholder="0.00" type="number"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Quantity</label>
              <input
                value={form.quantity}
                onChange={(e) => setform({ ...form, quantity: e.target.value })}
                className="form-input" placeholder="0" type="number"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setform({ ...form, description: e.target.value })}
              className="form-input form-textarea"
              placeholder="Describe the product..."
              rows={4}
            />
          </div>

          <button onClick={addProduct} className="form-submit-btn" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPage;