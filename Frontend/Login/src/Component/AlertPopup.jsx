import React, { useEffect } from "react";

const AlertPopup = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-5 right-5 p-4 text-white rounded shadow-lg transition-transform duration-300 ${
        alertStyles[type] || "bg-gray-500"
      }`}
    >
      {message}
      <button
        className="ml-4 text-sm underline"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default AlertPopup;
