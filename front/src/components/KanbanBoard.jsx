import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaCommentDots, FaPaperclip, FaTrash } from "react-icons/fa";
import api from "../services/api";
import { logActivity } from "../utils/activityLogger";
import UserNavbar from "./UserNavbar";
import UserAvatar from "./UserAvatar";

const KanbanBoard = ({ hideControls }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    notes: "",
    tag: "Note",
    color: "bg-pastelBlue",
    dueDate: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userid;

  const getColFromStatus = (status) => {
    switch (status) {
      case "inProgress":
        return "col-progress";
      case "review":
        return "col-review";
      case "done":
        return "col-done";
      default:
        return "col-todo";
    }
  };

  const getStatusFromCol = (col) => {
    switch (col) {
      case "col-progress":
        return "inProgress";
      case "col-review":
        return "review";
      case "col-done":
        return "done";
      default:
        return "pending";
    }
  };

  const fetchTasks = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await api.get(`/users/${userId}/notes`);
      const formattedTasks = response.data.map((note) => ({
        id: note._id,
        title: note.title,
        notes: note.notes,
        tag: note.category || "Note",
        color: "bg-pastelBlue", // Lógica de cores pode ser expandida aqui
        col: getColFromStatus(note.status),
        createdAt: note.createdAt,
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData("text/plain", taskId);
    e.target.classList.add("opacity-50");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("opacity-50");
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetCol) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    const task = tasks.find((t) => t.id === draggedTaskId);
    const oldCol = task?.col;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTaskId ? { ...t, col: targetCol } : t))
    );

    try {
      const newStatus = getStatusFromCol(targetCol);
      await api.put(`/users/${userId}/contents/${draggedTaskId}`, {
        status: newStatus,
      });

      if (task && oldCol !== targetCol) {
        const statusLabel = {
          "col-todo": "Todo",
          "col-progress": "In Progress",
          "col-review": "Review",
          "col-done": "Done",
        }[targetCol];
        logActivity(`Moved task to ${statusLabel}`, task.title);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      fetchTasks();
    }
  };

  const createTask = async () => {
    if (!newTask.title) return alert("Please enter a title");

    try {
      await api.post(`/users/${userId}/notes`, {
        title: newTask.title,
        notes: newTask.notes,
        priority: false,
        dueDate: newTask.dueDate,
      });
      logActivity("Created a new task", newTask.title);
      fetchTasks();
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

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/users/${userId}/notes/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getTagColor = (color) => {
    if (color.includes("Blue")) return "text-blue-600";
    if (color.includes("Orange")) return "text-orange-600";
    if (color.includes("Pink")) return "text-pink-600";
    if (color.includes("Cyan")) return "text-cyan-700";
    return "text-zinc-600";
  };

  const renderColumn = (colId, title, colorClass) => {
    const colTasks = tasks.filter((t) => t.col === colId);

    return (
      <div
        className={`flex flex-col h-auto md:h-full rounded-3xl bg-white/40 border border-white/50 shadow-sm backdrop-blur-sm transition-all hover:bg-white/60 p-4`}
      >
        {/* Header da Coluna */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wide">
            <span
              className={`w-3 h-3 ${colorClass} rounded-full ring-2 ring-white shadow-sm`}
            ></span>{" "}
            {title}
            <span className="bg-white/50 px-2 py-0.5 rounded-md text-xs text-slate-400 font-semibold ml-1">
              {colTasks.length}
            </span>
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-slate-400 hover:text-blue-600 transition"
          >
            <FaPlus size={10} />
          </button>
        </div>

        {/* Área de Tarefas */}
        {/* Mobile: Altura automática. Desktop: Scroll interno */}
        <div
          className="flex-1 space-y-3 min-h-[100px] md:overflow-y-auto custom-scrollbar pr-1 pb-2"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, colId)}
        >
          {colTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragEnd={handleDragEnd}
              className={`${task.color} p-4 rounded-2xl cursor-grab active:cursor-grabbing border border-transparent hover:border-black/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative animate-pop-in`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-1">
                  <span
                    className={`bg-white/80 backdrop-blur-sm ${getTagColor(
                      task.color
                    )} px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm`}
                  >
                    {task.tag}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <h4 className="font-bold text-slate-800 text-sm mb-2 leading-snug">
                {task.title}
              </h4>

              {task.notes && (
                <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                  {task.notes}
                </p>
              )}

              {/* Barra de Progresso Decorativa */}
              <div className="w-full bg-white/40 h-1.5 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-slate-900/10 h-full rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mt-1 pt-2 border-t border-black/5">
                <div className="flex -space-x-1.5 pl-1">
                  <UserAvatar
                    name={`User ${task.id}`}
                    className="w-5 h-5 border border-white text-[8px] shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 hover:text-slate-600">
                    <FaCommentDots /> {Math.floor(Math.random() * 5)}
                  </span>
                  <span className="flex items-center gap-1 hover:text-slate-600">
                    <FaPaperclip /> {Math.floor(Math.random() * 3)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {colTasks.length === 0 && (
            <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400">
              Drop items here
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Controls */}
      {!hideControls && (
        <div className="px-4 md:px-8 py-4 shrink-0">
          <UserNavbar title="Board" onNewTask={() => setIsModalOpen(true)} />
        </div>
      )}

      {/* Kanban Board Layout Responsivo */}
      {/* Mobile: overflow-y-auto no container pai (rola a tela toda)
         Desktop: overflow-hidden no pai (rolam as colunas internas) 
      */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden px-4 md:px-8 pb-4 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto md:h-full">
          {renderColumn("col-todo", "A Fazer", "bg-zinc-500")}
          {renderColumn("col-progress", "Em Progresso", "bg-orange-500")}
          {renderColumn("col-review", "Revisão", "bg-purple-500")}
          {renderColumn("col-done", "Concluído", "bg-green-500")}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[2rem] w-full max-w-md shadow-2xl animate-pop-in border border-white/60">
            <h3 className="text-xl font-bold mb-4 text-slate-800">
              Nova Tarefa
            </h3>
            <input
              type="text"
              placeholder="Título"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              autoFocus
            />
            <textarea
              placeholder="Notas"
              value={newTask.notes}
              onChange={(e) =>
                setNewTask({ ...newTask, notes: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24 transition"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                value={newTask.tag}
                onChange={(e) =>
                  setNewTask({ ...newTask, tag: e.target.value })
                }
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="Note">Nota</option>
                <option value="Work">Trabalho</option>
                <option value="Personal">Pessoal</option>
              </select>
              <select
                value={newTask.color}
                onChange={(e) =>
                  setNewTask({ ...newTask, color: e.target.value })
                }
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="bg-pastelBlue">Azul</option>
                <option value="bg-pastelOrange">Laranja</option>
                <option value="bg-pastelPink">Rosa</option>
                <option value="bg-pastelCyan">Ciano</option>
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
                Cancelar
              </button>
              <button
                onClick={createTask}
                className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition active:scale-95"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
