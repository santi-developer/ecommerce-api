import "./Navbar.css"
import { useAuth } from "../context/AuthContext";

function Navbar(){

    const {isAuthenticated, logout} = useAuth()

    return(
    <nav className="navbar">
        <div className="navbar-brand">
            <h1>Nexo</h1>
        </div>
        <div className="navbar-links">
             {isAuthenticated ? (
                // Si está logueado
                <button onClick={logout}>Cerrar sesión</button>
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