import { useState } from "react";

export function Toast({ message, type, onClose }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg text-white shadow-lg ${colors[type]}`}
    >
      <div className="flex items-center">
        <span className="mr-2">{message}</span>
        <button onClick={onClose} className="font-bold ml-4">×</button>
      </div>
    </div>
  );
}
