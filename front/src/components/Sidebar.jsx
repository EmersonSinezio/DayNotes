import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaTasks,
  FaCalendarAlt,
  FaStickyNote,
  FaUsers,
  FaAddressBook,
  FaChevronRight,
  FaChevronLeft,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import api from "../services/api";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [user, setUser] = React.useState(null);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
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
    if (api.defaults.headers) {
      api.defaults.headers.Authorization = "";
    }
    navigate("/");
  };

  if (!user) return null;

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white h-screen flex flex-col justify-between border-r border-zinc-200 hidden md:flex fixed left-0 top-0 transition-all duration-300 z-40`}
    >
      {/* Toggle Button */}
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
          <Link
            to="/user"
            className={`flex items-center ${
              isOpen ? "gap-3 px-4" : "justify-center px-2"
            } py-3 text-zinc-400 hover:text-brand hover:bg-zinc-50 rounded-xl transition-colors group`}
            title="Dashboard"
          >
            <FaThLarge className="text-xl min-w-[1.25rem]" />
            {isOpen && (
              <span className="font-medium whitespace-nowrap">Dashboard</span>
            )}
          </Link>
          <Link
            to="#"
            className={`flex items-center ${
              isOpen ? "gap-3 px-4" : "justify-center px-2"
            } py-3 text-brand bg-zinc-50 rounded-xl transition-colors group`}
            title="Tasks"
          >
            <FaTasks className="text-xl min-w-[1.25rem]" />
            {isOpen && (
              <>
                <span className="font-medium whitespace-nowrap">Tasks</span>
                <span className="ml-auto bg-brand/10 text-brand text-xs font-bold px-2 py-1 rounded-full">
                  16
                </span>
              </>
            )}
          </Link>
          <Link
            to="#"
            className={`flex items-center ${
              isOpen ? "gap-3 px-4" : "justify-center px-2"
            } py-3 text-zinc-400 hover:text-brand hover:bg-zinc-50 rounded-xl transition-colors group`}
            title="Schedule"
          >
            <FaCalendarAlt className="text-xl min-w-[1.25rem]" />
            {isOpen && (
              <span className="font-medium whitespace-nowrap">Schedule</span>
            )}
          </Link>
          <Link
            to={`/user/${user.userid}/notes`}
            className={`flex items-center ${
              isOpen ? "gap-3 px-4" : "justify-center px-2"
            } py-3 text-zinc-400 hover:text-brand hover:bg-zinc-50 rounded-xl transition-colors group`}
            title="Note"
          >
            <FaStickyNote className="text-xl min-w-[1.25rem]" />
            {isOpen && (
              <span className="font-medium whitespace-nowrap">Note</span>
            )}
          </Link>
        </nav>

        <div className={`mt-8 ${isOpen ? "px-8" : "px-4 text-center"}`}>
          {isOpen && (
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 whitespace-nowrap">
              Records
            </p>
          )}
          <nav className="space-y-1">
            <Link
              to="#"
              className={`flex items-center ${
                isOpen ? "gap-3" : "justify-center"
              } text-zinc-500 hover:text-zinc-800 py-2 transition-colors`}
              title="Team"
            >
              <FaUsers className="text-lg min-w-[1.125rem]" />{" "}
              {isOpen && <span>Team</span>}
            </Link>
            <Link
              to="#"
              className={`flex items-center ${
                isOpen ? "gap-3" : "justify-center"
              } text-zinc-500 hover:text-zinc-800 py-2 transition-colors`}
              title="Clients"
            >
              <FaAddressBook className="text-lg min-w-[1.125rem]" />{" "}
              {isOpen && <span>Clients</span>}
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
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User"
            className="w-10 h-10 min-w-[2.5rem] rounded-full object-cover"
          />
          {isOpen && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">
                  {user.username || "User"}
                </p>
                <p className="text-xs text-zinc-400 truncate">
                  {user.email || "user@example.com"}
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
