const DEFAULT_STATE = {
    user: [],
    loading: false,
    error: null,
}
export default function userReducer(
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