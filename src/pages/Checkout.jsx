import React from 'react'

const Checkout = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Billing Details</h4>
              
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">First Name</label>
                  <input type="text" className="form-control" placeholder="John" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input type="text" className="form-control" placeholder="Doe" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Company Name (Optional)</label>
                <input type="text" className="form-control" placeholder="Company name" />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input type="email" className="form-control" placeholder="name@example.com" />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input type="tel" className="form-control" placeholder="+1 234 567 8900" />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Street Address</label>
                <input type="text" className="form-control" placeholder="House number and street name" />
              </div>

              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Apartment, suite, unit (Optional)" />
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Town / City</label>
                  <input type="text" className="form-control" placeholder="City" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Postal Code</label>
                  <input type="text" className="form-control" placeholder="Zip code" />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Country</label>
                <select className="form-select">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="saveInfo" />
                <label className="form-check-label" htmlFor="saveInfo">
                  Save this information for next time
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="updates" />
                <label className="form-check-label" htmlFor="updates">
                  Receive updates about products and promotions
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Your Order</h4>
              
              <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Product Name 1</span>
                  <span className="fw-semibold">$49.99</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Product Name 2</span>
                  <span className="fw-semibold">$29.99</span>
                </div>
                <div className="d-flex justify-content-between text-muted small">
                  <span>Product Name 3 + 2 more</span>
                  <span>$19.99</span>
                </div>
              </div>

              <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>$99.97</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax</span>
                  <span>$8.00</span>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-4 pb-2 border-bottom">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-5 text-primary">$107.97</span>
              </div>

              {/* Payment Methods */}
              <div className="mb-4">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="payment" id="creditCard" defaultChecked />
                  <label className="form-check-label fw-semibold" htmlFor="creditCard">
                    Credit / Debit Card
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="payment" id="paypal" />
                  <label className="form-check-label fw-semibold" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="payment" id="bankTransfer" />
                  <label className="form-check-label fw-semibold" htmlFor="bankTransfer">
                    Bank Transfer
                  </label>
                </div>
              </div>

              {/* Promo Code */}
              <div className="input-group mb-4">
                <input type="text" className="form-control" placeholder="Promo code" />
                <button className="btn btn-outline-secondary" type="button">Apply</button>
              </div>

              {/* Place Order Button */}
              <button className="btn btn-primary w-100 py-2 fw-bold">
                Place Order
              </button>

              <p className="text-center text-muted small mt-3 mb-0">
                By placing your order, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout