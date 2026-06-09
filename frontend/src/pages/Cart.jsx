import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import "./Cart.css"

function Cart(){

    const [cart, setCart] = useState(null);
    const navigate = useNavigate()
    useEffect(()=>{
         axiosInstance.get("/api/orders/cart/")
        .then(res => setCart(res.data));
    }, []);

    async function handleRemoveItem(productId) {
    const res = await axiosInstance.delete("/api/orders/cart/remove_item/", {
        data: { product_id: productId }
    });
    setCart(res.data);
}

    async function handleUpdateQuantity(productId, quantity) {
        const res = await axiosInstance.patch("/api/orders/cart/update_item/", {
            product_id: productId,
            quantity: quantity
        });
        setCart(res.data);
    }
    if (!cart) return <p>Cargando...</p>


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
                            <div className="cart-item-quantity-controls">
                                <button className="cart-quantity-btn" onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="cart-quantity-btn" onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
                            </div>
                            <p className="cart-item-subtotal">${item.subtotal}</p>
                            <button className="cart-remove-button" onClick={() => handleRemoveItem(item.product.id)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h2>Resumen</h2>
                <p>Total: <span>${cart.total}</span></p>
                <button className="cart-checkout-button" onClick={() => navigate("/checkout")}>Proceder al pago</button>
            </div>
        </div>
    </div>
);
}

export default Cart;