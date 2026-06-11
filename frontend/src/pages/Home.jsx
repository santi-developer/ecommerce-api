import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import axiosInstance from "../utils/axiosInstance";

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.get("/api/products/categories/")
            .then(res => setCategories(res.data))
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (selectedCategory) params.append("category", selectedCategory);

        axiosInstance.get(`/api/products/?${params.toString()}`)
            .then(res => setProducts(res.data))
    }, [search, selectedCategory]);

    return (
        <div className="home-container">
            <div className="home-filters">
                <input
                    className="home-search"
                    type="text"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="home-select"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="products-grid">
                {products.length === 0 && (
                    <p className="home-empty">No se encontraron productos</p>
                )}
                {products.map(product => (
                    <div key={product.id} className="product-card" onClick={() => navigate(`/products/${product.slug}`)}>
                        <div className="product-card-image">
                            {product.images.length > 0 && (
                                <img src={product.images[0].image} alt={product.name} />
                            )}
                        </div>
                        <div className="product-card-info">
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;