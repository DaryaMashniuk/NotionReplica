import React from "react";
import InputField from "./InputField";

function NoteForm({ title, setTitle, body, setBody, onSubmit, buttonText }) {
  return (
    <div className="w-[75%] max-w-2xl">
      <InputField
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="mb-4"
      />
      <InputField
        type="textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        rows="5"
        className="mb-4"
      />
      <button 
        onClick={onSubmit} 
        className="bg-gray-400 text-white p-2 rounded hover:bg-gray-800 w-full"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default NoteForm;
