import React, { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { FiCheckCircle, FiLayers, FiActivity } from "react-icons/fi";
import api from "../services/api";
import { getActivities, logActivity } from "../utils/activityLogger";
import { useAuth } from "../contexts/AuthContext";
// Importing extracted Navbar
import UserNavbar from "../components/UserNavbar";
import UserAvatar from "../components/UserAvatar";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalDone: 0,
    mostFrequent: "None",
    active: 0,
    pending: 0,
    inProgress: 0,
    review: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    notes: "",
    tag: "Note",
    color: "bg-pastelBlue",
    dueDate: "",
  });

  const { user } = useAuth();

  // Animation Styles
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && user.userid) {
          const response = await api.get(`/users/${user.userid}/notes`);
          const fetchedTasks = response.data;
          setTasks(fetchedTasks);
          calculateStats(fetchedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
    setActivities(getActivities());
  }, [user]);

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

      const response = await api.get(`/users/${user.userid}/notes`);
      setTasks(response.data);
      calculateStats(response.data);
      setActivities(getActivities());

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

  const calculateStats = (taskList) => {
    const newStats = {
      totalDone: 0,
      mostFrequent: "None",
      active: 0,
      pending: 0,
      inProgress: 0,
      review: 0,
    };

    const categoryCounts = {};

    taskList.forEach((task) => {
      if (task.status === "done") newStats.totalDone++;
      else if (task.status === "active") newStats.active++;
      else if (task.status === "pending") newStats.pending++;
      else if (task.status === "inProgress") newStats.inProgress++;
      else if (task.status === "review") newStats.review++;

      const cat = task.category || "General";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    let maxCount = 0;
    let mostFreq = "None";
    for (const [cat, count] of Object.entries(categoryCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostFreq = cat;
      }
    }
    newStats.mostFrequent = mostFreq;

    setStats(newStats);
  };

  const getDaysLeft = (dueDate) => {
    if (!dueDate) return 0;
    const diff = new Date(dueDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50/80 backdrop-blur-sm",
        text: "text-blue-600",
        bar: "bg-blue-500",
        badge: "bg-blue-100 text-blue-600",
        border: "border-blue-100",
      },
      orange: {
        bg: "bg-orange-50/80 backdrop-blur-sm",
        text: "text-orange-600",
        bar: "bg-orange-500",
        badge: "bg-orange-100 text-orange-600",
        border: "border-orange-100",
      },
      green: {
        bg: "bg-green-50/80 backdrop-blur-sm",
        text: "text-green-600",
        bar: "bg-green-500",
        badge: "bg-green-100 text-green-600",
        border: "border-green-100",
      },
      pink: {
        bg: "bg-pink-50/80 backdrop-blur-sm",
        text: "text-pink-600",
        bar: "bg-pink-500",
        badge: "bg-pink-100 text-pink-600",
        border: "border-pink-100",
      },
    };
    return colors[color] || colors.blue;
  };

  const getCategoryColor = (category) => {
    const map = {
      "Web Design": "blue",
      Development: "orange",
      Dashboard: "green",
      General: "pink",
      Note: "blue",
      Work: "orange",
      Personal: "pink",
    };
    return map[category] || "blue";
  };

  const getCategoryDisplayName = (category) => {
    const map = {
      "Web Design": "Web Design",
      Development: "Desenvolvimento",
      Dashboard: "Dashboard",
      General: "Geral",
      Note: "Nota",
      Work: "Trabalho",
      Personal: "Pessoal",
      None: "Nenhum",
    };
    return map[category] || category;
  };

  return (
    <div className="min-h-screen bg-[#F3F6FD] font-sans flex text-slate-700 relative overflow-hidden">
      <style>{animationStyles}</style>

      {/* Background Blobs (Animated) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="flex-1 flex flex-col lg:flex-row p-4 md:p-8 gap-8 overflow-hidden z-10">
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Navbar */}
          <UserNavbar
            onNewTask={() => setIsModalOpen(true)}
            title="Painel"
            secondaryTitle="Visão Geral"
          />

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 mb-8 items-center text-center md:text-left animate-fade-in-up">
            <div className="group cursor-default">
              <p className="text-3xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {stats.active}
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>{" "}
                Tarefas Ativas
              </p>
            </div>
            <div className="group cursor-default">
              <p className="text-3xl font-bold text-slate-800 group-hover:text-orange-500 transition-colors">
                {stats.inProgress}
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Em
                Progresso
              </p>
            </div>
            <div className="group cursor-default">
              <p className="text-3xl font-bold text-slate-800 group-hover:text-pink-500 transition-colors">
                {stats.pending}
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>{" "}
                Pendentes
              </p>
            </div>
            <div className="group cursor-default">
              <p className="text-3xl font-bold text-slate-800 group-hover:text-green-500 transition-colors">
                {stats.totalDone}
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                Concluídas
              </p>
            </div>

            <div className="ml-auto flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-800 transition-transform hover:rotate-90">
                <FaEllipsisV />
              </button>
            </div>
          </div>

          {/* Task Grid with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2 pb-4 custom-scrollbar">
            {loading ? (
              <div className="col-span-2 flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              tasks.slice(0, 4).map((task, index) => {
                const color = getCategoryColor(task.category);
                const theme = getColorClasses(color);
                const daysLeft = getDaysLeft(task.dueDate);

                return (
                  <div
                    key={task._id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className={`
                        ${theme.bg} p-6 rounded-[2.5rem] relative transition-all duration-300
                        border border-white/50 shadow-sm
                        hover:shadow-xl hover:-translate-y-2 hover:border-${color}-200
                        animate-fade-in-up
                    `}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-medium text-slate-500 bg-white/50 px-2 py-1 rounded-lg">
                        {formatDate(task.createdAt)}
                      </span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <FaEllipsisV />
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      {task.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mb-6">
                      {getCategoryDisplayName(task.category || "General")}
                    </p>

                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-slate-400">Progresso</span>
                        <span className={theme.text}>
                          {task.progress || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-white/40 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${theme.bar} transition-all duration-1000 ease-out`}
                          style={{ width: `${task.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[1, 2].map((i) => (
                          <UserAvatar
                            key={i}
                            name={`User ${i}`}
                            className="w-8 h-8 border-2 border-white shadow-sm text-xs"
                          />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-white/80 flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm">
                          +2
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold px-4 py-2 rounded-full shadow-sm ${theme.badge}`}
                      >
                        {daysLeft > 0
                          ? `${daysLeft} Dias Restantes`
                          : "Vencido"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        <aside
          className="w-full lg:w-80 flex flex-col gap-8 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Insights Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-sm border border-white/60 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              Insights <FiActivity className="text-blue-500" />
            </h3>

            {/* Stats Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl transition hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white">
                  <FiCheckCircle />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Total Concluído
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    {stats.totalDone} Tarefas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-2xl transition hover:bg-indigo-50 hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                  <FiLayers />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                    Categoria Principal
                  </p>
                  <p className="text-lg font-bold text-indigo-900 truncate max-w-[120px]">
                    {getCategoryDisplayName(stats.mostFrequent)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-slate-700 mb-4 text-sm">
                Distribuição de Atividades
              </h4>
              <div className="space-y-4">
                {/* Animated Bars */}
                {[
                  { label: "Web Design", val: "45%", color: "bg-blue-400" },
                  { label: "Mobile Apps", val: "30%", color: "bg-orange-400" },
                  { label: "Branding", val: "25%", color: "bg-pink-400" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1 font-medium text-slate-500">
                      <span>{item.label}</span>
                      <span>{item.val}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full animate-fade-in-up`}
                        style={{
                          width: item.val,
                          animationDelay: `${0.5 + idx * 0.1}s`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-sm border border-white/60 flex-1 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                Atividade Recente
              </h3>
              <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition">
                <FaSearch className="text-slate-300" size={14} />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              {activities.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">
                  Nenhuma atividade recente.
                </p>
              ) : (
                activities.slice(0, 3).map((activity, idx) => (
                  <div
                    key={activity.id || idx}
                    className="flex gap-4 items-start group animate-fade-in-up"
                    style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                  >
                    <UserAvatar
                      name={activity.user}
                      className="w-10 h-10 min-w-[2.5rem] border-2 border-white shadow-sm text-sm"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {activity.user}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {activity.action}:{" "}
                        <span className="text-slate-800 font-medium">
                          {activity.target}
                        </span>
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {new Date(activity.timestamp).toLocaleDateString()}{" "}
                        {new Date(activity.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Modal with Pop-in Animation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[2rem] w-full max-w-md shadow-2xl animate-pop-in border border-white/50">
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              autoFocus
            />
            <textarea
              placeholder="Notas (opcional)"
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

export default UserDashboard;
