import React from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand/30">
            D
          </div>
          <span className="font-bold text-2xl tracking-tight text-zinc-800">
            DayNotes
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
          {user ? (
            <>
              <Link to="/user" className="hover:text-brand transition-colors">
                Dashboard
              </Link>
              <Link
                to={`/user/${user.userid}/notes`}
                className="hover:text-brand transition-colors"
              >
                Notas
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-brand transition-colors">
                Funcionalidades
              </Link>
              <Link to="/" className="hover:text-brand transition-colors">
                Soluções
              </Link>
              <Link to="/" className="hover:text-brand transition-colors">
                Preços
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/auth"
            className="hidden md:block text-sm font-semibold text-zinc-600 hover:text-brand transition"
          >
            Login
          </Link>
          <Link
            to="/auth"
            className="px-6 py-2.5 bg-zinc-900 text-white text-sm font-semibold rounded-xl hover:bg-brand transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 transform hover:-translate-y-0.5"
          >
            Começar Grátis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
