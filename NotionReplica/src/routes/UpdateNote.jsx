import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/API";
import NoteForm from "../components/NoteForm";
import NotePageHeader from "../components/NotePageHeader";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Состояние для заметки (содержит все данные, включая created и userId)
  const [note, setNote] = useState({
    title: "",
    body: "",
    created: "", // Дата создания
    userId: "",  // userId
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await API.fetchNoteById(id);
        setNote({
          title: fetchedNote.title,
          body: fetchedNote.body,
          created: fetchedNote.created,  // Сохраняем оригинальную дату создания
          userId: fetchedNote.userId,    // Сохраняем userId
        });
      } catch (error) {
        console.error("Failed to fetch note", error);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    try {
      // Отправляем только обновленные данные title и body, оставляя created и userId неизменными
      await API.updateNote(id, {
        ...note,           // Сохраняем все поля
        title: note.title, // Обновляем только title
        body: note.body,   // Обновляем только body
      });
      navigate(`/notes/${id}`);  // После успешного обновления, перенаправляем на страницу заметки
    } catch (error) {
      console.error("Failed to update note", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <NotePageHeader to={`/notes/${id}`} />
      <h1 className="text-3xl font-bold mb-6">Edit Note</h1>
      <NoteForm
        title={note.title}
        setTitle={(value) => setNote((prev) => ({ ...prev, title: value }))}
        body={note.body}
        setBody={(value) => setNote((prev) => ({ ...prev, body: value }))}
        onSubmit={handleUpdate}
        buttonText="Save Changes"
      />
    </div>
  );
}

export default UpdateNote;
