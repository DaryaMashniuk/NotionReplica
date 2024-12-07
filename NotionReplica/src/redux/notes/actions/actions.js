import API from "../../../utils/API";

export const fetchNotes=(userId)=> async(dispatch,state)=> {
    dispatch({type: 'NOTES/FETCH/START'})
    try {
        console.log(userId)
        const notes = await API.fetchNotes(userId);
        dispatch({type: 'NOTES/FETCH/SUCCESS', payload: notes })
    } catch (e) {
        console.error(e);
        dispatch({type: 'NOTES/FETCH/ERROR', payload: e})
    }
}

export const fetchNoteById=( noteId ) => async(dispatch,state) => {
    dispatch({type: 'NOTES/FETCH/ID/START'})
    try {
        
        const fetchedNote = await API.fetchNoteById(noteId);
        console.log(fetchedNote)
        dispatch({type: 'NOTES/FETCH/ID/SUCCESS', payload: fetchedNote })
    } catch (e) {
        console.error(e);
        dispatch({type: 'NOTES/FETCH/ID/ERROR', payload: e})
    }
}
export const deleteNote =(id)=> async (dispatch) => {
    await API.deleteNote(id); 
    dispatch({ type: 'NOTES/DELETE/ID', payload: id }); 
};

export const updateNote = (id,note)=> async (dispatch)=> {
  await API.updateNote(id, note);
  dispatch({
    type: "NOTES/UPDATE/ID",
    payload: note,
  });
}

export const  createNewNote = (note)=> async(dispatch)=> {
  await API.createNote(note);
  dispatch({
    type :'NOTES/CREATE',
    payload : note,
  })
}
// export const handleUpdate = (noteId) => async(dispatch) => {
//   dispatch({type :'NOTES/UPDATE/ID', payload})
// }

// const handleUpdate = async () => {
//   try {
    
//     await API.updateNote(id, {
//       ...note,           
//       title: note.title, 
//       body: note.body,   
//     });
//     navigate(`/notes/${id}`); 
//   } catch (error) {
//     console.error("Failed to update note", error);
//   }
// };