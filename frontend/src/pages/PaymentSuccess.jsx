import { useNavigate } from "react-router-dom"
import "./PaymentSuccess.css"

function PaymentSuccess() {
    const navigate = useNavigate()

    return (
        <div className="success-container">
            <div className="success-card">
                <div className="success-icon">✅</div>
                <h1 className="success-title">¡Pago exitoso!</h1>
                <p className="success-message">Tu orden ha sido procesada correctamente.</p>
                <div className="success-buttons">
                    <button className="success-btn-orders" onClick={() => navigate("/orders")}>
                        Ver mis órdenes
                    </button>
                    <button className="success-btn-home" onClick={() => navigate("/")}>
                        Seguir comprando
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess;