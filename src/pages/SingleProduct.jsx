import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productContext } from '../context/ContextPage'
import { useContext } from 'react'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { motion } from "motion/react"
import './SingleP.css'

const SingleProduct = () => {
  const { id } = useParams()
  const [error, seterror] = useState(null)
  const { products, setLoading, loading, addToCart, dotVariants, containerVariants } = useContext(productContext)
  const [product, setProduct] = useState(null)

  const nairaFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(`https://crochet-app-backend.onrender.com/api/products/${id}`, { method: 'GET' })
        const data = await res.json()
        if (res.ok) { setLoading(false); seterror(null); setProduct(data) }
        if (!res.ok) { setLoading(false); seterror(data.error) }
      } catch (error) {
        seterror(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const relatedProducts = products && product
    ? products.filter((item) => item._id !== product._id).slice(0, 4)
    : []

  // Updated loading state with animated dots
  if (loading) return (
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
      <p className="loading-text">Loading product...</p>
    </div>
  )
  
  if (error) return (
    <div className="loading-overlay">
      <p className="loading-text">Error loading product.</p>
    </div>
  )
  
  if (!product) return (
    <div className="loading-overlay">
      <p className="loading-text">Product not found.</p>
    </div>
  )

  return (
    <>
      <div className="sp-page">

        {/* ── Product detail ── */}
        <div className="sp-container">
          <div className="sp-image-block">
            <img src={product.image} alt={product.name} className="sp-image" />
          </div>

          <div className="sp-details">
            <p className="sp-label">Fiks Crochet</p>
            <h1 className="sp-name">{product.name}</h1>
            <p className="sp-price">{nairaFormatter.format(product.price)}</p>

            <div className="sp-divider" />

            <p className="sp-description">{product.description}</p>

            <div className="sp-divider" />

            <div className="sp-meta">
              <div className="sp-meta-item">
                <span className="sp-meta-label">Quantity in stock</span>
                <span className="sp-meta-value">{product.quantity}</span>
              </div>
            </div>

            <button onClick={() => addToCart(product._id)} className="sp-add-btn">
              Add to Bag
            </button>
          </div>
        </div>

        {/* ── Related products ── */}
        {relatedProducts.length > 0 && (
          <div className="sp-related">
            <h2 className="sp-related-title">You may also like</h2>
            <div className="products-grid">
              {relatedProducts.map(({ _id, image, name, price, description }) => (
                <ProductCard
                  id={_id}
                  key={_id}
                  image={image}
                  name={name}
                  price={nairaFormatter.format(price)}
                  description={description}
                  onAddToCart={() => addToCart(_id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default SingleProduct