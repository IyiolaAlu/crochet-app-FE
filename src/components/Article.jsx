import React from "react";
import "../components/Articlee.css";

const Article = () => {
  return (
    <section className="article-page">
      {/* Left — Image block */}
      <div className="article-image-block">
        <img
          className="article-image"
          src={"raelle-cameron-nEA6MiZVmMM-unsplash.jpg"}
          alt="Artisan knitting"
        />
        <div className="article-quote-bar">
          <p className="article-quote">
            "Every stitch is a conversation between the maker and the material."
          </p>
        </div>
      </div>

      {/* Right — Text block */}
      <div className="article-content">
        <p className="article-label">OUR PHILOSOPHY</p>
        <h2 className="article-heading">The Art of the Slow Stitch</h2>
        <p className="article-body">
          At Loom &amp; Loop, we believe in fashion that honors time. Each piece
          is meticulously hand-knitted by skilled artisans using ethically
          sourced fibers. Our process is quiet, intentional, and entirely
          human—rejecting the rush of mass production for the soul of the
          handmade.
        </p>

        <div className="article-features">
          <div className="article-feature">
            <h4 className="feature-title">ETHICAL FIBERS</h4>
            <p className="feature-body">
              100% Organic cotton and traceable merino wool.
            </p>
          </div>
          <div className="article-feature">
            <h4 className="feature-title">LOCAL MAKERS</h4>
            <p className="feature-body">
              Supporting independent crochet artists worldwide.
            </p>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Article;