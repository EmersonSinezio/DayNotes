import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import { Navigate } from "react-router-dom";
import api from "./services/api";
import { useState, useEffect } from "react";
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userRes = await api.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(userRes.data);
        } catch (error) {
          console.error("Erro na verificação de autenticação:", error);
          localStorage.clear();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return <div>Carregando...</div>;
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to={`/user/${user.userid}/notes`} /> : <Login />
          }
        />
        <Route
          path="/user/:userid/notes"
          element={
            user ? (
              <Homepage user={user} logout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <Navigate to={user ? `/user/${user.userid}/notes` : "/login"} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
