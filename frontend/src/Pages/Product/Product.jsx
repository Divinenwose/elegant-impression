import React, { useEffect, useState } from "react";
import weave from "../../assets/weave.png";
import Footer from "../../components/Footer/Footer.jsx";
import Purse from "../../assets/purse.png";
import { useCart } from "../../context/CartContext";
import arrowleft from "../../assets/arrow-left.png";
import arrowright from "../../assets/arrow1.png";
import ship from "../../assets/ship.png";
import ship1 from "../../assets/ship1.png";
import ship2 from "../../assets/ship2.png";
import axios from "axios";
import "./Product.css";

const ProductPage = ({ cartCount }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All Products");
    const [sort, setSort] = useState("featured");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const categories = [
        "All Products",
        "Wigs",
        "Attachments",
        "Shampoos",
        "Conditioners",
        "Oils & Serums",
        "Accessories",
    ];

    useEffect(() => {
        fetchProducts();
    }, [category, sort]);

    const fetchProducts = async () => {
        try {
            let url = `http://localhost:5000/api/products`;


            if (category !== "All Products") {
                url += `?category=${encodeURIComponent(category)}`;
            }

            const response = await axios.get(url);
            let data = response.data;

            if (sort === "price-asc") data.sort((a, b) => a.price - b.price);
            if (sort === "price-desc") data.sort((a, b) => b.price - a.price);

            setProducts(data);


            setTotalPages(1);
            setPage(1);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        if (product.stock === 0) return;
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div className="shop-page">
            <div className="products">
                <div className="overlay"></div>
                <div className="product-container">
                    <h2>Shop</h2>
                    <p>
                        Professional-grade hair care products to maintain your beautiful hair at home. Curated by our expert stylists.
                    </p>
                </div>
            </div>
            <div className="category">
                <div className="category-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={category === cat ? "active-filter" : ""}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                    <div className="sort-dropdown">
                        <label>Sort by: </label>
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="line4"></div>
                <div className="products-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img
                                src={product.images?.[0] || weave}
                                alt={product.name}
                            />
                            <div className="product-text">
                                <p className="bundle">{product.category}</p>
                                <h4 className="name">{product.name}</h4>
                                <p className="description">{product.description}</p>
                                <div className="point-cont">
                                    <div className="point"></div>
                                    <p className="stock">{product.stock} in stock</p>
                                </div>
                                <div className="api">
                                    <p className="fixed">£{product.price.toFixed(2)}</p>
                                    <button
                                        className="product-btn"
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock === 0}
                                    >

                                        <img
                                            src={Purse}
                                            alt="Add to Cart"
                                            className={`purse ${product.stock === 0 ? "disabled-icon" : ""}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button disabled className="previous">
                        <img src={arrowleft} alt="" />Previous
                    </button>
                    <button className="active-page">1</button>
                    <button disabled className="next">Next<img src={arrowright} alt="" /></button>
                </div>
            </div>
            <div className="free">
                <div className="free-container">
                    <div className="free-content">
                        <div className="free-image">
                            <img src={ship} alt="" />
                        </div>
                        <div className="free-writeup">
                            <h3>Natural Ingredients</h3>
                            <p>Ethically sourced, premium ingredients for your hair</p>
                        </div>
                    </div>
                    <div className="free-content">
                        <div className="free-image">
                            <img src={ship1} alt="" />
                        </div>
                        <div className="free-writeup">
                            <h3>Free Shipping</h3>
                            <p>On orders over $50 within the continental US</p>
                        </div>
                    </div>
                    <div className="free-content">
                        <div className="free-image">
                            <img src={ship2} alt="" />
                        </div>
                        <div className="free-writeup">
                            <h3>30-Day Returns</h3>
                            <p>Not satisfied? Return within 30 days for a full refund</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;
