const DEFAULT_STATE = {
    notes: [],
    loading: false,
    error: null,
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
    }
}