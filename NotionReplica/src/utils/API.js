const BASE_URL = "http://localhost:5001";

const API = {
  fetchNotes: async (userId) => {
    const response = await fetch(`${BASE_URL}/notes?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch notes");
    return await response.json();
  },
  createNote: async (note) => {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("Failed to create note");
    return await response.json();
  },
  deleteNote: async (id) => {
    const response = await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete note");
  },
  updateNote: async (id, data) => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update note");
    return res.json();
  },
  fetchNoteById: async (id) => {
    const res = await fetch(`http://localhost:5001/notes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch note");
    return res.json();
  },
};

export default API;
