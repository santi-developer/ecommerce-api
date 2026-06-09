import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children
}

export default PrivateRoute;