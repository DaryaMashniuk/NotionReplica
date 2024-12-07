const DEFAULT_STATE = {
    notes: [],
    loading: false,
    error: null,
    currNote: {},
}
export default function notesReducer(
    state=DEFAULT_STATE,
    { type , payload }
){
    switch(type) {
        case 'NOTES/FETCH/START':
            return {...state, loading:true}
        case 'NOTES/FETCH/SUCCESS':
            return {...state, loading: false, error: null, notes: payload}
        case 'NOTES/FETCH/ERROR':
            return {...state, loading: false, error: payload}
        case 'NOTES/DELETE/ID': {
            console.log(state.notes)
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== payload)
            }
        }
        case 'NOTES/FETCH/ID/START':
            return {...state, loading:true}
        case 'NOTES/FETCH/ID/SUCCESS':{
            return {...state, loading: false, error: null,
                currNote: payload}
        }
        case 'NOTES/FETCH/ID/ERROR':
            return {...state, loading: false, error: payload}  
        case 'NOTES/UPDATE/ID': {
            return {
                ...state,
                notes: state.notes.map((note) => note.id === payload.id ?  { ...note, ...payload } : note)
            }
        }
        case 'NOTES/CREATE' : 
            return {...state, notes: [payload].concat(state.notes)}
        default :
            return state
    }
}