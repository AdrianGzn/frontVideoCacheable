import React, { useState } from "react";
import "./SeeVideo.css";
import { useNavigate } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://44.214.207.98:3000/api/users/logIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Usuario o contraseña incorrectos");
            }

            const data = await response.json();
            console.log("Login exitoso:", data.token);
            navigate("/home")
            localStorage.setItem("token", JSON.parse(data.token))
            setError(""); 
        } catch (err) {
            setError((err).message);
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Escribe tu usuario"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Escribe tu contraseña"
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default LogIn;
