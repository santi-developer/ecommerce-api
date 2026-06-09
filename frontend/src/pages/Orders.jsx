import { useState, useEffect } from "react"
import axiosInstance from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import "./Orders.css"

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.get("/api/orders/")
            .then(res => setOrders(res.data));
    }, []);

    if (!orders.length) return <p className="orders-empty">No tienes órdenes aún</p>

    return (
        <div className="orders-container">
            <h1 className="orders-title">Mis órdenes</h1>
            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <div className="order-header">
                        <span className="order-id">Orden #{order.id}</span>
                        <span className={`order-status order-status--${order.status}`}>
                            {order.status}
                        </span>
                    </div>
                    <div className="order-body">
                        <p className="order-address">📍 {order.shipping_address}</p>
                        <p className="order-total">Total: <span>${order.total}</span></p>
                        <p className="order-date">{new Date(order.created_at).toLocaleDateString()}</p>
                        {order.status === 'pending' && (
                            <button className="order-pay-btn" onClick={()=> navigate(`/payment/${order.id}`)}>Pagar orden</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Orders;