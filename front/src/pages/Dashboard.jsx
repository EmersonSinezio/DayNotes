import React, { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import api from "../services/api";
import { logActivity } from "../utils/activityLogger";
import { useAuth } from "../contexts/AuthContext";
// Importando o Navbar extraído
import UserNavbar from "../components/UserNavbar";

const Dashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [newTask, setNewTask] = useState({
    title: "",
    notes: "",
    tag: "Note",
    color: "bg-pastelBlue",
    dueDate: "",
  });

  // Estilos de animação
  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
    .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    .animate-float { animation: float 6s ease-in-out infinite; }
  `;

  const createTask = async () => {
    if (!newTask.title) return alert("Please enter a title");

    try {
      await api.post(`/users/${user.userid}/notes`, {
        title: newTask.title,
        notes: newTask.notes,
        priority: false,
        dueDate: newTask.dueDate,
      });
      logActivity("Created a new task", newTask.title);

      // Refresh KanbanBoard
      setRefreshKey((prev) => prev + 1);

      setIsModalOpen(false);
      setNewTask({
        title: "",
        notes: "",
        tag: "Note",
        color: "bg-pastelBlue",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task");
    }
  };

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#F3F6FD] font-sans text-slate-700">
      <style>{animationStyles}</style>

      {/* Background Blobs Animados */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Conteúdo Principal (z-10 para ficar acima do fundo) */}
      <div className="flex-1 flex flex-col z-10 h-full overflow-hidden p-4 md:p-8 gap-6">
        {/* Navbar */}
        <div className="shrink-0">
          <UserNavbar
            onNewTask={() => setIsModalOpen(true)}
            title="Kanban"
            secondaryTitle="Board"
          />
        </div>

        {/* Área do Kanban com efeito Glassmorphism */}
        <div className="flex-1 min-h-0 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-sm overflow-hidden animate-fade-in-up p-2 relative">
          {/* O KanbanBoard deve se ajustar ao tamanho deste container */}
          <KanbanBoard key={refreshKey} hideControls={true} />
        </div>
      </div>

      {/* Modal Estilizado */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[2rem] w-full max-w-md shadow-2xl animate-pop-in border border-white/50">
            <h3 className="text-xl font-bold mb-4 text-slate-800">New Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              autoFocus
            />
            <textarea
              placeholder="Notes (optional)"
              value={newTask.notes}
              onChange={(e) =>
                setNewTask({ ...newTask, notes: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24 transition-all"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                value={newTask.tag}
                onChange={(e) =>
                  setNewTask({ ...newTask, tag: e.target.value })
                }
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="Note">Note</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
              <select
                value={newTask.color}
                onChange={(e) =>
                  setNewTask({ ...newTask, color: e.target.value })
                }
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="bg-pastelBlue">Blue</option>
                <option value="bg-pastelOrange">Orange</option>
                <option value="bg-pastelPink">Pink</option>
                <option value="bg-pastelCyan">Cyan</option>
              </select>
            </div>

            <input
              type="datetime-local"
              value={newTask.dueDate || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-600"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={createTask}
                className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition active:scale-95"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
