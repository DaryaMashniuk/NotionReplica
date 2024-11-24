import React from "react";

function InputField({ type = "text", value, onChange, placeholder, rows, className = "" }) {
  if (type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows || 3}
        className={`w-full p-2 border border-gray-300 rounded ${className}`}
      />
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border border-gray-300 rounded ${className}`}
    />
  );
}

export default InputField;
