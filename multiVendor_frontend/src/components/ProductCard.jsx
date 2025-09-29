import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="card h-100 shadow-sm">
      {/* Product Image */}
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      {/* Product Details */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
          {product.description}
        </p>
        <h6 className="fw-bold text-dark">${product.price}</h6>

        {/* Buttons */}
        <div className="mt-auto d-flex justify-content-between">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => onAddToCart(product)}
          >
            <i className="fas fa-cart-plus me-1"></i> Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-dark">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
