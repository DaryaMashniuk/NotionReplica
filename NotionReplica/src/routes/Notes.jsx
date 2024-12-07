import React, { useContext, useEffect, useState } from "react";
import Note from "../components/Note/Note";
import { Link } from "react-router-dom";
import API from "../utils/API";
import {useDispatch, useSelector} from 'react-redux'
import { fetchNotes, deleteNote } from "../redux/notes/actions/actions";

function Notes() {
  const dispatch = useDispatch();
  const { notes, user } = useSelector((store) => store)

  const userId = user.user.id;
  useEffect(()=> {
    dispatch(fetchNotes(userId))
  },[])
  console.log(notes.notes)


  const handleDelete = (id) => {
    dispatch(deleteNote(id))
  };
  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="w-[75%] max-w-2xl prose mx-auto">
        <h1 className="text-center">Notes</h1>
        <Link to="/createNewNote" className="text-center block mb-4">Add new note</Link>
        {notes.notes.length > 0 ? (
          notes.notes.slice().reverse().map((note) => {
            return <Note key={note.id} note={note} onDelete={() => handleDelete(note.id)} />;
          })
        ) : (
          <div className="text-center">You don't have any notes</div>
        )}
      </div>
    </div>
  );
}

export default Notes;