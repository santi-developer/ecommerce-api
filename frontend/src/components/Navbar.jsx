import "./Navbar.css"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar(){

    const {isAuthenticated, logout} = useAuth()
    const navigate = useNavigate()

    return(
    <nav className="navbar">
        <div className="navbar-brand">
            <h1 onClick={()=> navigate("/")} style={{cursor : "pointer"}}>Nexo</h1>
        </div>
        <div className="navbar-links">
             {isAuthenticated ? (
                <>
                    <span className="navbar-cart" onClick={()=>navigate("/cart")}>
                        🛒 Mi carrito
                    </span>
                    <span className="navbar-cart" onClick={() => navigate("/orders")}>
                        📦 Mis órdenes
                    </span>
                    <span className="navbar-cart" onClick={() => navigate("/profile")}>
                        👤 Mi perfil
                    </span>
                    <button onClick={logout}>Cerrar sesión</button>
                </>
            ) : (
                // Si NO está logueado
                <>
                    <a href="/login">Iniciar sesión</a>
                    <a href="/register">Registrarse</a>
                </>
            )}
        </div>
    </nav>
    )
}


export default Navbar;