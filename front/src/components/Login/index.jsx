// src\components\Login\index.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles/login_styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      // 1. Fazer login
      const loginRes = await api.post("/users/login", formData);

      // 2. Armazenar token
      localStorage.setItem("token", loginRes.data.token);

      // Emitindo notificação
      toast.success("Login realizado com sucesso!");

      // 3. Buscar dados do usuário
      const userRes = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${loginRes.data.token}` },
      });

      // 4. Armazenar dados do usuário
      localStorage.setItem("user", JSON.stringify(userRes.data));

      // 5. Redirecionar
      window.location.href = `/user/${userRes.data.userid}/notes`;
    } catch (err) {
      console.error("Login error:", err);

      // Tratamento de erros com react-toastify
      let errorMessage = "Erro desconhecido";

      if (err.response) {
        // Erros da API (4xx, 5xx)
        if (err.response.status === 401) {
          errorMessage = "Credenciais inválidas!";
        } else if (err.response.status === 500) {
          errorMessage = "Erro no servidor. Tente novamente mais tarde.";
        } else {
          errorMessage =
            err.response.data?.message || `Erro ${err.response.status}`;
        }
      } else if (err.request) {
        // Erros de rede (sem resposta)
        errorMessage = "Sem resposta do servidor. Verifique sua conexão.";
      } else {
        // Outros erros
        errorMessage = err.message || "Erro ao processar a requisição";
      }

      setError(errorMessage);

      // Exibir notificação com react-toastify
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="sign-in-box">
        <div className="sign-in-header">
          <h1 className="sign-in-title">Login</h1>
          <p className="sign-in-subtitle">
            Ainda não tem uma conta?{" "}
            <Link to="/register" className="sign-in-link">
              Registre-se
            </Link>
          </p>
        </div>
        <div className="sign-in-content">
          <div className="divider">Ou</div>

          <form onSubmit={handleSubmit} className="sign-in-form">
            <div className="form-group">
              <label htmlFor="username">Nome de usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                disabled={loading}
                aria-describedby="email-error"
              />
              <p className="error-message" id="email-error">
                {error ? "Por favor, insira um email valido." : ""}
              </p>
            </div>

            <div className="form-group">
              <div className="form-group-header">
                <label htmlFor="password">Senha</label>
                <Link to="/recover-account" className="forgot-password-link">
                  Esqueceu sua senha?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                disabled={loading}
                aria-describedby="password-error"
              />
              <p className="error-message" id="password-error">
                {error ? "Por favor, insira uma senha valida." : ""}
              </p>
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                disabled={loading}
              />
              <label htmlFor="remember-me">Lembre de mim</label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <img
                  src="/assets/load.svg"
                  alt="loading"
                  className="loading-icon"
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
