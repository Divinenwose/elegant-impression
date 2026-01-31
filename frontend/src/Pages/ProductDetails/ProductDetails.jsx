import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import weave from "../../assets/weave.png";
import arrowright from "../../assets/arrow1.png";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            try {
                // 🔹 Fetch single product
                const productRes = await axios.get(
                    `http://localhost:5000/api/products/${slug}`
                );

                const fetchedProduct = productRes.data;
                setProduct(fetchedProduct);

                // 🔹 Fetch related products by category
                if (fetchedProduct.category?.name) {
                    const relatedRes = await axios.get(
                        `http://localhost:5000/api/products?category=${encodeURIComponent(
                            fetchedProduct.category.name
                        )}`
                    );

                    const filtered = relatedRes.data.filter(
                        (item) => item._id !== fetchedProduct._id
                    );

                    setRelatedProducts(filtered.slice(0, 4));
                }
            } catch (err) {
                console.error("Error loading product details:", err);
            }
        };

        fetchProductAndRelated();
    }, [slug]);

    if (!product) return null;

    const images = product.images?.length ? product.images : [weave];

    return (
        <div className="product-details-page">
            {/* ================= MAIN PRODUCT ================= */}
            <div className="product-details-container">
                {/* LEFT IMAGES */}
                <div className="product-images">
                    <div className="thumbnail-list">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={product.name}
                                className={activeImage === index ? "active-thumb" : ""}
                                onClick={() => setActiveImage(index)}
                            />
                        ))}
                    </div>

                    <div className="main-image">
                        <img
                            src={images[activeImage]}
                            alt={product.name}
                        />
                    </div>
                </div>

                {/* RIGHT INFO */}
                <div className="product-info">
                    <span className="tag">
                        {product.category?.name || "Uncategorized"}
                    </span>

                    <h2>{product.name}</h2>

                    <div className="rating">
                        ⭐⭐⭐⭐⭐ <span>(5 reviews)</span>
                    </div>

                    <p className="price">£{product.price.toFixed(2)}</p>

                    <p className="availability">
                        Availability:{" "}
                        <span>{product.stock > 0 ? "In stock" : "Out of stock"}</span>
                    </p>

                    <div className="quantity">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                            −
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)}>
                            +
                        </button>
                    </div>

                    <button className="add-to-cart">
                        Add to Cart
                    </button>

                    <div className="features">
                        <span>🚚 Fast Shipping</span>
                        <span>🔒 Secure Checkout</span>
                        <span>↩ Easy Returns</span>
                    </div>
                </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>

                {product.specifications?.length > 0 && (
                    <>
                        <h4>Specification</h4>
                        <ul>
                            {product.specifications.map((spec, index) => (
                                <li key={index}>✔ {spec}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            {/* ================= YOU MAY ALSO LIKE ================= */}
            {relatedProducts.length > 0 && (
                <div className="related-products">
                    <h3>You May Also Like</h3>

                    <div className="related-grid">
                        {relatedProducts.map(item => (
                            <div
                                className="related-card"
                                key={item._id}
                                onClick={() => navigate(`/products/${item.slug}`)}
                            >
                                <img
                                    src={item.images?.[0] || weave}
                                    alt={item.name}
                                />

                                <div className="related-info">
                                    <span className="category-tag">
                                        {item.category?.name}
                                    </span>

                                    <h4>{item.name}</h4>

                                    <p className="stock">
                                        <span className="dot"></span>
                                        {item.stock} in stock
                                    </p>

                                    <div className="price-row">
                                        <p>£{item.price.toFixed(2)}</p>
                                        <button>
                                            <img src={arrowright} alt="arrow" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
