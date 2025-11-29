export const logActivity = (action, taskTitle) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const newActivity = {
    id: Date.now(),
    user: user?.username || "User",
    userPhoto: `https://i.pravatar.cc/150?u=${user?.userid || "default"}`,
    action: action,
    target: taskTitle,
    timestamp: new Date().toISOString(),
  };

  const existingLogs = JSON.parse(
    localStorage.getItem("daynotes_activity_log") || "[]"
  );
  const updatedLogs = [newActivity, ...existingLogs].slice(0, 50); // Keep last 50
  localStorage.setItem("daynotes_activity_log", JSON.stringify(updatedLogs));
};

export const getActivities = () => {
  return JSON.parse(localStorage.getItem("daynotes_activity_log") || "[]");
};
