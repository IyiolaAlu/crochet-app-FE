import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productContext } from '../context/ContextPage'
import { useContext } from 'react'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import './SingleP.css'

const SingleProduct = () => {
  const { id } = useParams()
  const [error, seterror] = useState(null)
  const { products, setLoading, loading, addToCart } = useContext(productContext)
  const [product, setProduct] = useState(null)

  const nairaFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`, { method: 'GET' })
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

  if (loading) return <div className="sp-loading">Loading...</div>
  if (error) return <div className="sp-loading">Error loading product.</div>
  if (!product) return <div className="sp-loading">Product not found.</div>

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