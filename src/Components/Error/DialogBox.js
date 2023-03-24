import React from "react";

const DialogBox = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative z-20 w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-2xl font-bold">{message}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
