import "./Navbar.css"

function Navbar(){

    return(
    <nav className="navbar">
        <div className="navbar-brand">
            <h1>Nexo</h1>
        </div>
        <div className="navbar-links">
            <a href="/login">Iniciar sesión</a>
            <a href="/register">Registrarse</a>
        </div>
    </nav>
    )
}


export default Navbar;