import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./styles/register_styles.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formData = {
      username: e.target.username.value.trim(),
      password: e.target.password.value.trim(),
      confirmPassword: e.target.confirmPassword.value.trim(),
      terms: e.target.terms.checked,
    };

    try {
      // Validações do cliente
      if (!formData.terms) {
        throw new Error("Você deve aceitar os termos e condições");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      if (formData.password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      const response = await api.post("/users", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 201) {
        setSuccessMessage("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message || error.message || "Erro no cadastro"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign_up-container">
      <div className="sign_up-main-container">
        <div className="sign_up-content-container">
          <div className="sign_up-text-center">
            <h1 className="sign_up-title">Criar Conta</h1>
            <p className="sign_up-subtitle">
              Já possui uma conta?
              <Link className="sign_up-signin-link" to="/login">
                Fazer login
              </Link>
            </p>
          </div>

          <div className="sign_up-form-section">
            {error && <div className="sign_up-error-message">{error}</div>}
            {successMessage && (
              <div className="sign_up-success-message">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="sign_up-form-grid">
                <div className="sign_up-form-group">
                  <label htmlFor="username" className="sign_up-input-label">
                    Nome de usuário
                  </label>
                  <div className="sign_up-input-container">
                    <input
                      type="text"
                      id="username"
                      className="sign_up-input-field"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="sign_up-form-group">
                  <label htmlFor="password" className="sign_up-input-label">
                    Senha
                  </label>
                  <div className="sign_up-input-container">
                    <input
                      type="password"
                      id="password"
                      className="sign_up-input-field"
                      required
                      minLength="6"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="sign_up-form-group">
                  <label
                    htmlFor="confirmPassword"
                    className="sign_up-input-label"
                  >
                    Confirme a Senha
                  </label>
                  <div className="sign_up-input-container">
                    <input
                      type="password"
                      id="confirmPassword"
                      className="sign_up-input-field"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="sign_up-checkbox-container">
                  <div className="sign_up-checkbox-wrapper">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="sign_up-checkbox-input"
                      disabled={loading}
                    />
                  </div>
                  <label htmlFor="terms" className="sign_up-checkbox-label">
                    Eu aceito os{" "}
                    <a className="sign_up-terms-link" href="#">
                      Termos e Condições
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="sign_up-submit-button"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
