import React from "react";
import UserAvatar from "./UserAvatar";
import { FaCaretDown, FaSlidersH, FaPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const UserNavbar = ({
  onNewTask,
  title = "Painel",
  secondaryTitle = "Tarefas Diárias",
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navOptions = [
    { label: "Painel", path: "/user" },
    { label: "Tarefas", path: `/user/${user?.userid}/notes` },
    { label: "Agenda", path: `/user/${user?.userid}/calendar` },
    { label: "Sobre", path: `/user/${user?.userid}/about` },
    { label: "Configurações", path: `/user/${user?.userid}/settings` },
  ];

  const handleNavChange = (e) => {
    navigate(e.target.value);
  };

  const currentPath = location.pathname;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        <span className="text-zinc-400 mx-2">-</span>
        <div className="relative group">
          <div className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:bg-white px-3 py-1.5 rounded-lg transition">
            <span>{secondaryTitle}</span>
            <FaCaretDown className="text-zinc-400" />
          </div>
          <select
            onChange={handleNavChange}
            value={currentPath}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {navOptions.map((option) => (
              <option key={option.path} value={option.path}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2 mr-2">
          {[1, 2, 3].map((i) => (
            <UserAvatar
              key={i}
              name={`User ${i}`}
              className="w-8 h-8 border-2 border-white text-xs"
            />
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500">
            +3
          </div>
        </div>
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow text-zinc-600">
          <FaSlidersH /> Filtros
        </button>
        <button
          onClick={onNewTask}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-zinc-500/30 hover:bg-zinc-800 transition transform active:scale-95"
        >
          <FaPlus className="text-white" /> Criar tarefa
        </button>
      </div>
    </div>
  );
};

export default UserNavbar;
