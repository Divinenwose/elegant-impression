import React, { useEffect, useState } from "react";
import weave from "../../assets/weave.png";
import Footer from "../../components/Footer/Footer.jsx";
import arrowleft from "../../assets/arrow-left.png";
import arrowright from "../../assets/arrow1.png";
import ship from "../../assets/ship.png";
import ship1 from "../../assets/ship1.png";
import ship2 from "../../assets/ship2.png";
import Purse from "../../assets/purse.png";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import "./Product.css";

const ProductPage = () => {
    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All Products");
    const [sort, setSort] = useState("featured");

    const [page, setPage] = useState(1);
    const productsPerPage = 12;

    const categories = [
        "All Products",
        "Wigs",
        "Attachments",
        "Shampoos",
        "Conditioners",
        "Oils & Serums",
        "Accessories",
        "Hair Services", // Map service category manually
    ];

    // Map category IDs to names
    const categoryMap = {
        "697cd869a3910f3cbd94edea": "Boho Twists",
        // Add other mappings here if needed
    };

    // Fetch products from API and normalize _id
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `http://localhost:5000/api/products`;
                if (category !== "All Products") {
                    url += `?category=${encodeURIComponent(category)}`;
                }

                const response = await axios.get(url);
                const data = response.data.map((p) => ({
                    ...p,
                    _id: p._id || p.id,
                    images: Array.isArray(p.images) && p.images.length ? p.images : [],
                    options: p.options || {},
                    stock: p.stock ?? 1, // default stock to 1 if undefined
                }));

                if (sort === "price-asc") data.sort((a, b) => a.price - b.price);
                if (sort === "price-desc") data.sort((a, b) => b.price - a.price);

                setProducts(data);
                setPage(1);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [category, sort]);

    // Handle adding product to cart
    const handleAddToCart = (product) => {
        const productToAdd = {
            ...product,
            _id: product._id || product.id,
            quantity: 1,
            options: product.options || {},
        };
        addToCart(productToAdd);
    };

    // Pagination
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (page - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="shop-page">
            {/* HERO */}
            <div className="products">
                <div className="overlay"></div>
                <div className="product-container">
                    <h2>Shop</h2>
                    <p>
                        Professional-grade hair care products to maintain your beautiful
                        hair at home. Curated by our expert stylists.
                    </p>
                </div>
            </div>

            {/* CATEGORY FILTER */}
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
                        <label htmlFor="sort">Sort by:</label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="line4"></div>

                {/* PRODUCTS GRID */}
                <div className="products-grid">
                    {currentProducts.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img src={product.images[0] || weave} alt={product.name} />
                            <div className="product-text">
                                <p className="bundle">
                                    {categoryMap[product.category?._id] || product.category?.name || "Uncategorized"}
                                </p>
                                <h4 className="name">{product.name}</h4>
                                <div className="point-cont">
                                    <div className="point"></div>
                                    <p className="stock">{product.stock} in stock</p>
                                </div>
                                <div className="api">
                                    <p className="fixed">£{product.price.toFixed(2)}</p>
                                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                        <img src={Purse} alt="Add to Cart" className="purse" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="previous"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            <img src={arrowleft} alt="" /> Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={page === i + 1 ? "active-page" : ""}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="next"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next <img src={arrowright} alt="" />
                        </button>
                    </div>
                )}
            </div>

            {/* FEATURES */}
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
