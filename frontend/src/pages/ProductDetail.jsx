import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./ProductDetail.css"
import axiosInstance from "../utils/axiosInstance"

function ProductDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/api/products/${slug}/`)
        .then(res => setProduct(res.data));
    }, [slug]);

    async function handleAddtoCart() {
        if(!isAuthenticated){
            navigate("/login");
            return;
        }

        const response = await axiosInstance.post("/api/orders/cart/add_item/", {
             product_id: product.id, 
             quantity: 1 
        });
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