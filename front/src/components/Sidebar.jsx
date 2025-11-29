import React, { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar";
import api from "../services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaTasks,
  FaCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
  FaCog,
  FaSignOutAlt,
  FaRocket,
} from "react-icons/fa";

import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTaskCount = async () => {
      if (user?.userid) {
        try {
          const response = await api.get(`/users/${user.userid}/notes`);
          setTaskCount(response.data.length);
        } catch (error) {
          console.error("Error fetching task count:", error);
        }
      }
    };

    fetchTaskCount();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkClasses = (path) => {
    const active = isActive(path);
    const baseClasses = `flex items-center ${
      isOpen ? "gap-3 px-4" : "justify-center px-2"
    } py-3 rounded-xl transition-colors group`;

    const activeClasses = "text-brand bg-zinc-50";
    const inactiveClasses = "text-zinc-400 hover:text-brand hover:bg-zinc-50";

    return `${baseClasses} ${active ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white h-screen flex flex-col justify-between border-r border-zinc-200 hidden md:flex fixed left-0 top-0 transition-all duration-300 z-40`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-zinc-200 rounded-full p-1 text-zinc-400 hover:text-brand shadow-sm z-50"
      >
        {isOpen ? <FaChevronLeft size={24} /> : <FaChevronRight size={24} />}
      </button>

      <div className="overflow-y-auto overflow-x-hidden flex-1">
        <div
          className={`p-6 flex items-center ${
            isOpen ? "gap-3" : "justify-center"
          }`}
        >
          <div className="w-8 h-8 min-w-[2rem] bg-brand rounded-lg flex items-center justify-center text-white font-bold text-lg">
            D
          </div>
          {isOpen && (
            <span className="font-bold text-xl tracking-tight text-zinc-800 whitespace-nowrap">
              DayNotes
            </span>
          )}
        </div>

        <nav className="px-3 space-y-1 mt-6">
          <Link to="/user" className={getLinkClasses("/user")} title="Painel">
            <FaThLarge className="text-xl min-w-[1.25rem]" />
            {isOpen && (
              <span className="font-medium whitespace-nowrap">Painel</span>
            )}
          </Link>
          <Link
            to={`/user/${user.userid}/notes`}
            className={getLinkClasses(`/user/${user.userid}/notes`)}
            title="Tarefas"
          >
            <FaTasks className="text-xl min-w-[1.25rem]" />
            {isOpen && (
              <>
                <span className="font-medium whitespace-nowrap">Tarefas</span>
                <span className="ml-auto bg-brand/10 text-brand text-xs font-bold px-2 py-1 rounded-full">
                  {taskCount}
                </span>
              </>
            )}
          </Link>
          <Link
            to={`/user/${user.userid}/calendar`}
            className={getLinkClasses(`/user/${user.userid}/calendar`)}
            title="Agenda"
          >
            <FaCalendarAlt className="text-xl min-w-[1.25rem]" />
            {isOpen && (
              <span className="font-medium whitespace-nowrap">Agenda</span>
            )}
          </Link>
        </nav>

        <div className={`mt-8 ${isOpen ? "px-8" : "px-4 text-center"}`}>
          {isOpen && (
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 whitespace-nowrap">
              Registros
            </p>
          )}
          <nav className="space-y-1">
            <Link
              to={`/user/${user.userid}/about`}
              className={getLinkClasses(`/user/${user.userid}/about`)}
              title="Sobre"
            >
              <FaRocket className="text-lg min-w-[1.125rem]" />{" "}
              {isOpen && <span>Sobre</span>}
            </Link>
            <Link
              to={`/user/${user.userid}/settings`}
              className={getLinkClasses(`/user/${user.userid}/settings`)}
              title="Configurações"
            >
              <FaCog className="text-lg min-w-[1.125rem]" />{" "}
              {isOpen && <span>Configurações</span>}
            </Link>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-100 relative">
        <div
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={`flex items-center ${
            isOpen ? "gap-3 p-3" : "justify-center p-2"
          } bg-zinc-50 rounded-xl cursor-pointer hover:bg-zinc-100 transition overflow-hidden`}
        >
          <UserAvatar
            name={user.username || "Usuário"}
            className="w-10 h-10 min-w-[2.5rem] text-sm shadow-sm"
          />
          {isOpen && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">
                  {user.username || "Usuário"}
                </p>
                <p className="text-xs text-zinc-400 truncate">
                  {user.email || "usuario@exemplo.com"}
                </p>
              </div>
              <FaChevronRight className="text-zinc-400" />
            </>
          )}
        </div>

        {showUserMenu && (
          <div
            className={`absolute bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden z-50
            ${
              isOpen
                ? "bottom-full left-4 right-4 mb-2"
                : "left-full bottom-0 ml-2 w-48"
            }`}
          >
            <button
              onClick={() => {
                setShowUserMenu(false);
                navigate(`/user/${user.userid}/settings`);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 transition-colors text-left"
            >
              <FaCog className="text-lg" />
              <span className="font-medium">Configurações</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left border-t border-zinc-100"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
