import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy product list (same as ProductDetails)
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
    // Simulate API call delay
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h5 className="fw-semibold text-secondary">
          Welcome to MultiVendor Marketplace where we buy and sell
        </h5>
      </div>

      {/* Products Section */}
      <section>
        <h2 className="h4 fw-semibold mb-4">Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-6 col-sm-4 col-md-3">
                <ProductCard
                  product={product}
                  onAddToCart={(p) => console.log("Add to cart:", p)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
