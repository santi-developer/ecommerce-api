import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

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
        <div>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <p>{product.description}</p>
            {product.images.length > 0 && (
            <img src={product.images[0].image} alt={product.name} />
        )}
        </div>
    );
}

export default ProductDetail;