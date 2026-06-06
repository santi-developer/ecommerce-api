import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"

function Home (){

    const [products, setProducts] = useState ([]);
    const navigate = useNavigate()


    useEffect(() => {
        fetch("http://localhost:8000/api/products/")
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    return (

      <div className="home-container">
        <div className="products-grid">
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