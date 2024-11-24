import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../components/UserContextProvider";
import NoteForm from "../components/NoteForm";
import NotePageHeader from "../components/NotePageHeader";
import API from "../utils/API";

function CreateNewNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const userContext = useContext(UserContext);
  const userId = userContext.user.id;
  const navigate = useNavigate();

  const handleCreate = async () => {
    const date = new Date();
    const newNote = {
      id: uuidv4(),
      userId: userId,
      title: title,
      body: body,
      created: date.toLocaleDateString("en-GB"),
    };

    await API.createNote(newNote);
    navigate(`/notes/${newNote.id}`);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <NotePageHeader to="/notes" />
      <h1 className="text-3xl font-bold mb-6">Create New Note</h1>
      <NoteForm
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        onSubmit={handleCreate}
        buttonText="Add Note"
      />
    </div>
  );
}

export default CreateNewNote;
