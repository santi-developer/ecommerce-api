import "./Register.css"
import {useState} from "react"
import { useNavigate } from "react-router-dom"


function Register() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  const response = await fetch("http://localhost:8000/api/users/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, username, password, password2 }),
  });

  const data = await response.json();

   if (!response.ok) {
    if (response.status === 400) {
      setErrors(data);
    } else if (response.status === 500) {
      setGlobalError("Error del servidor, intenta más tarde");
    }
  } else {
    setEmail("");
    setUsername("");
    setPassword("");
    setPassword2("");
    setErrors({});
    navigate("/login");
  }
}

// Función que traduce el error de Django a tu mensaje
function getFieldError(fieldErrors) {
  if (!fieldErrors) return null;

  const msg = fieldErrors[0];

  const mensajes = {
    "user with this email already exists.": "Este email ya está registrado",
    "This field may not be blank.": "Este campo es obligatorio",
    "Enter a valid email address.": "El email no tiene un formato válido",
    "A user with that username already exists.": "Este nombre de usuario no está disponible",
    "This password is too short. It must contain at least 8 characters.": "La contraseña es muy corta",
    "This password is too common.": "La contraseña es muy común",
    "Las contraseñas no coinciden": "Las contraseñas no coinciden",
  };

  // Si conocemos el error lo traducimos, sino mostramos uno genérico
  return mensajes[msg] || "Error en este campo";
}
  

  return (
    <div className="auth-container">

        <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Registrarse</h1>
            {globalError && <p style={{ color: 'red' }}>{globalError}</p>}
            <div>
              <label htmlFor="email">Email</label>
              <input type = "email" id="email" name="email" autoComplete="email" 
              placeholder ="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              {errors.email && <span style={{ color: 'red' }}>{getFieldError(errors.email)}</span>}
            </div>

            <div>
              <label htmlFor="username">Nombre de usuario</label>
              <input type="text" id="username" name="username" autoComplete="username"
              placeholder ="Ingresa tu nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)}></input>
              {errors.username && <span style={{ color: 'red' }}>{getFieldError(errors.username)}</span>}
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" name="password" autoComplete="new-password" 
              placeholder ="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              {errors.password && <span style={{ color: 'red' }}>{getFieldError(errors.password)}</span>}
            </div>

            <div>
              <label htmlFor="password2">Confirmar Contraseña</label>
              <input type="password" id="password2" name="password2" autoComplete="new-password" 
              placeholder ="Repite tu contraseña" value={password2} onChange = {(e) => setPassword2(e.target.value)}></input>
              {errors.password2 && <span style={{ color: 'red' }}>{getFieldError(errors.password2)}</span>}

            </div>

            <button type="submit">Crear cuenta</button>

            <p>¿Ya tienes cuenta ?</p>
      
        </form>
    </div>
  );
}

export default Register;