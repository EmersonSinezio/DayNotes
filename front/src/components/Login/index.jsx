// src\components\Login\index.jsx
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import api from "../../services/api";
import { redirect } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      // 1. Fazer login
      const loginRes = await api.post("/users/login", formData);

      // 2. Armazenar token no localStorage
      localStorage.setItem("token", loginRes.data.token);

      // 3. Buscar dados do usuário
      const userRes = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${loginRes.data.token}`,
        },
      });

      // 4. Armazenar dados do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(userRes.data));
      // 5. Redirecionar a página principal
      window.location.href = `/user/${userRes.data.userid}/notes`;
    } catch (error) {
      console.error("Login error:", error);
      setError("Credenciais inválidas!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        <div className="login-header">
          <FaRegUserCircle size={50} className="icon" />
          <h1>Login</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required disabled={loading} />
          </div>

          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required disabled={loading} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </button>
          <p>
            ainda não possui uma conta? <Link to="/register">Registre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
