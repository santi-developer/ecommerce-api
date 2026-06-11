import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axiosInstance from "../utils/axiosInstance"
import "./PaymentForm.css"

function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/orders"
            },
            redirect: "if_required"
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        if (paymentIntent.status === "succeeded") {
            await axiosInstance.post("/api/payments/confirm/", {
                payment_intent_id: paymentIntent.id
            })
            navigate("/orders")
        }
    }

    return (
        <div className="payment-container">
            <div className="payment-wrapper">
                <h1 className="payment-title">Pagar orden</h1>
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button 
                        className="payment-button" 
                        type="submit" 
                        disabled={!stripe || loading}
                    >
                        {loading ? "Procesando..." : "Confirmar pago"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PaymentForm;