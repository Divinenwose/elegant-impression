import React, { useEffect, useState } from "react";
import weave from "../../assets/weave.png";
import Footer from "../../components/Footer/Footer.jsx";
import Purse from "../../assets/purse.png";
import axios from "axios";
import "./Product.css";

const ProductPage = ({cartCount}) => {
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

    const PRODUCTS_PER_PAGE = 12;

    useEffect(() => {
        fetchProducts();
    }, [category, sort, page]);

    const fetchProducts = async () => {
        try {
            let url = `http://localhost:5000/api/products?page=${page}&limit=${PRODUCTS_PER_PAGE}`;

            if (category !== "All Products") {
                url += `&category=${category}`;
            }

            const response = await axios.get(url);
            let data = response.data;

            if (sort === "price-asc") data.sort((a, b) => a.price - b.price);
            if (sort === "price-desc") data.sort((a, b) => b.price - a.price);

            setProducts(data);
            setTotalPages(Math.ceil(100 / PRODUCTS_PER_PAGE));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

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
                            onClick={() => {
                                setCategory(cat);
                                setPage(1);
                            }}
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
                                src={product.images[0] || weave}
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
                                        onClick={() => handleAddToCart(product)}
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
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1} className="previous"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx + 1}
                            className={page === idx + 1 ? "active-page" : ""}
                            onClick={() => setPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default ProductPage;
