import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import "./Checkout.css"

function Checkout() {
    const [shippingAddress, setShippingAddress] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axiosInstance.post("/api/orders/", {
                shipping_address: shippingAddress
            });
            navigate("/orders");
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.error);
            }
        }
    }

    return (
        <div className="checkout-container">
            <div className="checkout-form-wrapper">
                <h1 className="checkout-title">Finalizar compra</h1>
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="checkout-field">
                        <label htmlFor="address">Dirección de envío</label>
                        <input
                            id="address"
                            type="text"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="Ej: Calle 123 # 45 - 67, Bogotá"
                        />
                        {error && <span className="checkout-error">{error}</span>}
                    </div>
                    <button className="checkout-button" type="submit">
                        Confirmar orden
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;