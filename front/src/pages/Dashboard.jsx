import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import KanbanBoard from "../components/KanbanBoard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#F5F6FA]">
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-bold">
            Welcome, {user?.username || "User"}!
          </h2>
          <p className="text-xs text-zinc-400">
            Today is{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Find something..."
              className="bg-white border-none rounded-full py-2.5 pl-10 pr-12 text-sm w-64 shadow-sm focus:ring-2 focus:ring-brand outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <span className="text-xs text-zinc-400 border border-zinc-200 rounded px-1.5">
                ⌘ K
              </span>
            </div>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 text-zinc-600">
            <FaBell className="text-xl" />
          </button>
        </div>
      </header>

      <KanbanBoard />
    </main>
  );
};

export default Dashboard;
