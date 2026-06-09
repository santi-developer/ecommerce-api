import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import axiosInstance from "../utils/axiosInstance"
import PaymentForm from "../components/PaymentForm"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function Payment() {
    const { orderId } = useParams()
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        axiosInstance.post("/api/payments/create_intent/", {
            order_id: orderId
        }).then(res => setClientSecret(res.data.client_secret));
    }, [orderId]);

    if (!clientSecret) return <p>Cargando...</p>

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
        </Elements>
    )
}

export default Payment;