import React from "react";
import "../../styles/sidebar/sidebar.css";
import ThemeToggle from "./ThemeToggle/index.jsx";
import { Link, useLocation } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";

const Sidebar = ({ User }) => {
  const [openBar, setOpenBar] = React.useState("close");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

  const handleOpen = () => {
    if (openBar == "open") {
      setOpenBar("close");
    } else {
      setOpenBar("open");
    }
  };
  return (
    <>
      {User == undefined ? (
        <div className={`sidebar-container ${openBar}`}>
          <FaChevronCircleRight
            className={`sidebar-icon-${openBar}`}
            onClick={handleOpen}
          />
          <div className="sidebar-content">
            <div className="title">
              <h1>Bem vindo ao Notes</h1>
            </div>
            <div className="buttons">
              <div>
                <h3>
                  {pathname == "/login"
                    ? "Ainda não tem uma conta?"
                    : "Ja tem uma conta?"}
                </h3>
              </div>
              <Link
                to={pathname == "/login" ? "/register" : "/login"}
                id="link"
              >
                <button>
                  {pathname == "/login" ? "Criar uma conta" : "Entrar agora"}
                </button>
              </Link>
            </div>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      ) : (
        <div className="sidebar-container">
          <div>
            <h1>Bem vindo ao Notes</h1>
            <p id="user-icon">{user.username[0]}</p>
          </div>
          <div className="sidebar-links">
            <p>Link1</p>
            <p>Link1</p>
            <p>Link1</p>
          </div>
          <div className="sidebar-buttons">
            {/* <ThemeToggle /> */}
            <button onClick={handleLogout}>Sair</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
