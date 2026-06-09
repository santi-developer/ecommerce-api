import { useState, useEffect } from "react"
import axiosInstance from "../utils/axiosInstance"
import "./Profile.css"

function Profile() {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        axiosInstance.get("/api/users/profile/")
            .then(res => {
                setProfile(res.data);
                setPhone(res.data.phone || "");
                setAddress(res.data.address || "");
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await axiosInstance.patch("/api/users/profile/", {
            phone,
            address
        });
        setProfile(res.data);
        setEditing(false);
        setSuccess("Perfil actualizado");
    }

    if (!profile) return <p>Cargando...</p>

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {profile.user.username[0].toUpperCase()}
                    </div>
                    <div>
                        <h1 className="profile-name">{profile.user.username}</h1>
                        <p className="profile-email">{profile.user.email}</p>
                    </div>
                </div>

                {!editing ? (
                    <div className="profile-info">
                        <div className="profile-field">
                            <span className="profile-label">Teléfono</span>
                            <span className="profile-value">{profile.phone || "No registrado"}</span>
                        </div>
                        <div className="profile-field">
                            <span className="profile-label">Dirección</span>
                            <span className="profile-value">{profile.address || "No registrada"}</span>
                        </div>
                        {success && <p className="profile-success">{success}</p>}
                        <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                            Editar perfil
                        </button>
                    </div>
                ) : (
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="profile-field">
                            <label>Teléfono</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ingresa tu teléfono" />
                        </div>
                        <div className="profile-field">
                            <label>Dirección</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ingresa tu dirección" />
                        </div>
                        <div className="profile-buttons">
                            <button type="submit" className="profile-save-btn">Guardar</button>
                            <button type="button" className="profile-cancel-btn" onClick={() => setEditing(false)}>Cancelar</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Profile;