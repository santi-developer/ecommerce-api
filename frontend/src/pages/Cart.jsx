import { useState, useEffect } from "react"
import "./Cart.css"

function Cart(){

    const [cart, setCart] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:8000/api/orders/cart/", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            }
        })
        .then(res => res.json())
        .then(data => setCart(data));
    }, []);

    if (!cart) return <p>Cargando...</p>

    console.log(cart.items[0].product.images);
    return (
    <div className="cart-container">
        <h1 className="cart-title">Mi carrito</h1>
        <div className="cart-content">
            <div className="cart-items">
                {cart.items.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                            {item.product.images.length > 0 && (
                                <img src={ `http://localhost:8000${item.product.images[0].image}`} alt={item.product.name} />
                            )}
                        </div>
                        <div className="cart-item-info">
                            <p className="cart-item-name">{item.product.name}</p>
                            <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                            <p className="cart-item-subtotal">${item.subtotal}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h2>Resumen</h2>
                <p>Total: <span>${cart.total}</span></p>
                <button className="cart-checkout-button">Proceder al pago</button>
            </div>
        </div>
    </div>
);
}

export default Cart;