import React, { useState, useEffect, useCallback } from "react";
import {
  FaCaretDown,
  FaSlidersH,
  FaPlus,
  FaCommentDots,
  FaPaperclip,
  FaTrash,
} from "react-icons/fa";
import api from "../services/api";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    notes: "",
    tag: "Note",
    color: "bg-pastelBlue",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userid;

  const fetchTasks = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await api.get(`/users/${userId}/notes`);
      const formattedTasks = response.data.map((note) => ({
        id: note._id,
        title: note.title,
        notes: note.notes,
        tag: "Note", // Default tag as backend might not have it yet
        color: "bg-pastelBlue", // Default color
        col: "col-todo", // Default column
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

  const handleDrop = (e, targetCol) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    // Note: Backend update for column change would go here
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTaskId ? { ...t, col: targetCol } : t))
    );
  };

  const createTask = async () => {
    if (!newTask.title) return alert("Please enter a title");

    try {
      await api.post(`/users/${userId}/notes`, {
        title: newTask.title,
        notes: newTask.notes,
        priority: false,
      });
      fetchTasks();
      setIsModalOpen(false);
      setNewTask({ title: "", notes: "", tag: "Note", color: "bg-pastelBlue" });
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
      <div className="flex flex-col h-full min-w-[280px]">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-bold text-zinc-700 flex items-center gap-2">
            <span className={`w-2 h-2 ${colorClass} rounded-full`}></span>{" "}
            {title}
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <FaPlus />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-20"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, colId)}
        >
          {colTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragEnd={handleDragEnd}
              className={`${task.color} p-5 rounded-2xl cursor-grab active:cursor-grabbing hover:shadow-md transition group relative animate-pop-in`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-1">
                  <span
                    className={`bg-white/60 ${getTagColor(
                      task.color
                    )} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide`}
                  >
                    {task.tag}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                >
                  <FaTrash />
                </button>
              </div>
              <h4 className="font-bold text-zinc-800 text-sm mb-3 leading-snug">
                {task.title}
              </h4>
              {task.notes && (
                <p className="text-xs text-zinc-600 mb-3 line-clamp-2">
                  {task.notes}
                </p>
              )}

              <div className="w-full bg-white/50 h-1.5 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-current opacity-40 h-full rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex -space-x-1.5">
                  <img
                    src={`https://i.pravatar.cc/150?u=${task.id}1`}
                    className="w-6 h-6 rounded-full border border-white"
                    alt="User 1"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <FaCommentDots /> {Math.floor(Math.random() * 10)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaPaperclip /> {Math.floor(Math.random() * 5)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <>
      {/* Controls */}
      <div className="px-8 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Board</h1>
          <span className="text-zinc-400 mx-2">-</span>
          <div className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:bg-white px-3 py-1.5 rounded-lg transition">
            <span>Daily Tasks</span>
            <FaCaretDown className="text-zinc-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white"
                src={`https://i.pravatar.cc/150?u=${i}`}
                alt={`User ${i}`}
              />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500">
              +3
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow text-zinc-600">
            <FaSlidersH /> Filters
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-zinc-500/30 hover:bg-zinc-800 transition transform active:scale-95"
          >
            <FaPlus className="text-white" /> Create task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full min-w-[1000px]">
          {renderColumn("col-todo", "Todo list", "bg-zinc-400")}
          {renderColumn("col-progress", "In Progress", "bg-orange-400")}
          {renderColumn("col-review", "In Review", "bg-purple-400")}
          {renderColumn("col-done", "Done", "bg-green-400")}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl animate-pop-in">
            <h3 className="text-xl font-bold mb-4">New Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-brand outline-none"
              autoFocus
            />
            <textarea
              placeholder="Notes (optional)"
              value={newTask.notes}
              onChange={(e) =>
                setNewTask({ ...newTask, notes: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-brand outline-none resize-none h-24"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                value={newTask.tag}
                onChange={(e) =>
                  setNewTask({ ...newTask, tag: e.target.value })
                }
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm"
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
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm"
              >
                <option value="bg-pastelBlue">Blue</option>
                <option value="bg-pastelOrange">Orange</option>
                <option value="bg-pastelPink">Pink</option>
                <option value="bg-pastelCyan">Cyan</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-zinc-500 font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createTask}
                className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanBoard;
