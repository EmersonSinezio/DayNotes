import React from "react";

const UserAvatar = ({ name, className = "" }) => {
  const getInitials = (name) => {
    if (!name) return "US";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div
      className={`flex items-center justify-center bg-brand text-white font-bold rounded-full select-none ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
