import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./ProductDetail.css"

function ProductDetail() {
    const { slug } = useParams()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${slug}/`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [slug]);

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
                <button className="detail-button">Agregar al carrito</button>
            </div>

        </div>
    );
}

export default ProductDetail;