import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams(); // product id from route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy product list
  const dummyProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      description: "Latest Apple iPhone with A17 chip and stunning display.",
      price: 1199,
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-1inch_GEO_EMEA?wid=940&hei=1112&fmt=png-alpha&.v=1692999303870",
    },
    {
      id: 2,
      name: "Sony Headphones",
      description: "Noise-cancelling wireless headphones with long battery life.",
      price: 299,
      image:
        "https://m.media-amazon.com/images/I/61kFL7ywsZS._AC_SL1500_.jpg",
    },
    {
      id: 3,
      name: "Nike Air Sneakers",
      description: "Comfortable and stylish sneakers for everyday use.",
      price: 149,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/16d23e32-9cfc-4aa4-95cc-26a5d6e401e7/air-max-270-shoes-KkLcGR.png",
    },
  ];

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      const found = dummyProducts.find((p) => p.id === parseInt(id));
      setProduct(found);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return <p className="text-center my-5">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center my-5 text-danger">Product not found.</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-dark fw-bold mb-3">${product.price}</h4>

          {/* Buttons */}
          <button className="btn btn-warning me-3">
            <i className="fas fa-cart-plus me-1"></i> Add to Cart
          </button>
          <button className="btn btn-dark">
            <i className="fas fa-credit-card me-1"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
