import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./ProductDetail.css"

function ProductDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${slug}/`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [slug]);

    async function handleAddtoCart() {
        if(!isAuthenticated){
            navigate("/login");
            return;
        }

        const response = await fetch("http://localhost:8000/api/orders/cart/add_item/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            },
            body: JSON.stringify({ product_id: product.id, quantity: 1 })
        });

        const data = await response.json();
        console.log(data);
    }

    if (!product) return <p>Cargando...</p>

    return (
        <div className="detail-container">

            <div className="detail-image">
                {product.images.length > 0 && (
                <img src={product.images[0].image} alt={product.name} />
                 )}
            </div>
            <div className="detail-info">
                <p className="detail-category">{product.category.name}</p>
                <h1 className="detail-name">{product.name}</h1>
                <p className="detail-price">${product.price}</p>
                <p className="detail-description">{product.description}</p>
                <button className="detail-button" onClick={handleAddtoCart}>Agregar al carrito</button>
            </div>

        </div>
    );
}

export default ProductDetail;