import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaPlus,
} from "react-icons/fa";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import UserNavbar from "../components/UserNavbar";

const CalendarPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const animationStyles = `
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-fade-in-scale { animation: fadeInScale 0.5s ease-out forwards; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-slide-in { animation: slideInRight 0.4s ease-out forwards; }
  `;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && user.userid) {
          const response = await api.get(`/users/${user.userid}/notes`);
          const tasksWithDates = response.data.map((task, index) => ({
            ...task,
            dueDate:
              task.dueDate ||
              new Date(
                new Date().setDate(new Date().getDate() + (index % 5))
              ).toISOString(),
          }));
          setTasks(tasksWithDates);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user]);

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getTasksForDate = (date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return isSameDay(date, taskDate);
    });
  };

  const renderCalendar = () => {
    const { days, firstDay } = getDaysInMonth(currentDate);
    const daysArray = [];

    // Empty spaces
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(
        <div
          key={`empty-${i}`}
          className="h-16 sm:h-24 md:h-32 bg-transparent opacity-0"
        ></div>
      );
    }

    // Days of the month
    for (let d = 1; d <= days; d++) {
      const dateToCheck = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        d
      );
      const dayTasks = getTasksForDate(dateToCheck);
      const isToday = isSameDay(new Date(), dateToCheck);
      const isSelected = isSameDay(selectedDate, dateToCheck);

      daysArray.push(
        <div
          key={d}
          onClick={() => setSelectedDate(dateToCheck)}
          className={`
            group relative h-16 sm:h-24 md:h-32 p-1 sm:p-2 md:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col
            ${
              isSelected
                ? "bg-white border-blue-400 shadow-[0_4px_20px_-5px_rgba(59,130,246,0.3)] transform scale-[1.02] z-10 ring-1 ring-blue-100"
                : "bg-white/40 border-white/60 hover:bg-white hover:shadow-md hover:border-blue-200/50 hover:-translate-y-1"
            }
            ${isToday && !isSelected ? "bg-blue-50/30 border-blue-100" : ""}
          `}
        >
          {/* Day Header */}
          <div className="flex justify-center sm:justify-between items-start">
            <span
              className={`text-xs sm:text-sm font-bold w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg sm:rounded-xl transition-colors
              ${
                isToday
                  ? "bg-blue-600 text-white shadow-blue-500/30 shadow-lg"
                  : isSelected
                  ? "bg-slate-800 text-white"
                  : "text-slate-600 group-hover:text-blue-600 bg-white/50"
              }
              `}
            >
              {d}
            </span>
            {dayTasks.length > 0 && (
              <span
                className={`hidden sm:flex text-[10px] font-bold px-1.5 py-0.5 rounded-full border backdrop-blur-sm transition-colors
                ${
                  isSelected
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "bg-white/60 text-slate-500 border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
              >
                {dayTasks.length}
              </span>
            )}

            {/* Mobile Dot Indicator (replaces number on small screens) */}
            {dayTasks.length > 0 && (
              <div className="flex sm:hidden absolute top-1 right-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              </div>
            )}
          </div>

          {/* Task List (Hidden on Mobile, visible on SM+) */}
          <div className="hidden sm:block space-y-1 mt-1 sm:mt-2">
            {dayTasks.slice(0, 2).map((task, idx) => (
              <div
                key={idx}
                className={`text-[9px] sm:text-[10px] truncate px-1.5 py-0.5 rounded-md border-l-2 shadow-sm font-medium transition-all
                  ${
                    isSelected
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-white border-slate-300 text-slate-600 opacity-80 group-hover:opacity-100"
                  }
                `}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 2 && (
              <div className="text-[9px] font-medium text-slate-400 pl-1">
                + {dayTasks.length - 2}..
              </div>
            )}
          </div>

          {/* Mobile Dots Row (colored dots only) */}
          <div className="flex sm:hidden mt-2 justify-center gap-1 flex-wrap content-end h-full pb-1">
            {dayTasks.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${
                  isSelected ? "bg-blue-400" : "bg-slate-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      );
    }

    return daysArray;
  };

  const tasksForSelectedDate = getTasksForDate(selectedDate);
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="min-h-screen bg-[#F3F6FD] font-sans flex text-slate-700 relative overflow-hidden">
      <style>{animationStyles}</style>

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-200/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Mobile Layout: Normal page scroll / Desktop: Fixed height without external scroll */}
      <div className="flex-1 flex flex-col p-4 md:p-8 gap-6 md:gap-8 h-full md:h-screen overflow-y-auto md:overflow-hidden z-10 custom-scrollbar">
        {/* Navbar */}
        <div className="shrink-0">
          <UserNavbar
            title="Calendário"
            secondaryTitle={currentDate.toLocaleString("pt-BR", {
              month: "long",
              year: "numeric",
            })}
            onNewTask={() => alert("Open Modal Logic Here")}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-auto md:h-full md:min-h-0 pb-4 md:pb-0">
          {/* Main Calendar Area */}
          <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-white/50 p-4 md:p-6 flex flex-col animate-fade-in-scale min-h-[450px]">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500 text-sm md:text-base">
                  <FaCalendarAlt />
                </div>
                <span className="capitalize">
                  {currentDate.toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </h2>

              <div className="flex items-center gap-1 md:gap-2 bg-white/50 p-1 rounded-xl md:rounded-2xl border border-white/60 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl hover:bg-white hover:shadow text-slate-500 transition-all"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Hoje
                </button>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl hover:bg-white hover:shadow text-slate-500 transition-all"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>

            {/* Week Headers */}
            <div className="grid grid-cols-7 mb-2 md:mb-4 px-1 md:px-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest"
                >
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-3 flex-1 overflow-y-auto auto-rows-fr p-1 md:p-2 custom-scrollbar">
              {renderCalendar()}
            </div>
          </div>

          {/* Right Panel: Tasks for Selected Date */}
          <div
            className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-white/60 flex flex-col h-[500px] md:h-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Tarefas para{" "}
                  {selectedDate.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                  })}
                </h2>
                <p className="text-sm text-slate-400 font-medium mt-1">
                  {getTasksForDate(selectedDate).length} tarefas agendadas
                </p>
              </div>
              <button
                onClick={() => {
                  // Logic to open add task modal (can be implemented later or linked to main modal)
                  alert("Funcionalidade de adicionar tarefa rápida em breve!");
                }}
                className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:scale-110 transition shadow-lg shadow-slate-900/20"
              >
                <FaPlus />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {getTasksForDate(selectedDate).length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-3xl">
                    🎉
                  </div>
                  <p className="text-lg font-bold text-slate-600">
                    Nenhuma tarefa ainda
                  </p>
                  <p className="text-sm text-slate-400">
                    Aproveite seu tempo livre!
                  </p>
                </div>
              ) : (
                getTasksForDate(selectedDate).map((task, idx) => (
                  <div
                    key={task._id}
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                        {task.category || "Geral"}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          task.status === "done"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                    </div>
                    <h3
                      className={`font-bold text-slate-800 mb-1 ${
                        task.status === "done"
                          ? "line-through text-slate-400"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <FaClock />
                      {new Date(task.dueDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button className="mt-4 md:mt-6 w-full py-3 md:py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group shrink-0 text-sm md:text-base">
              <FaPlus className="group-hover:rotate-90 transition-transform" />
              Adicionar Tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
