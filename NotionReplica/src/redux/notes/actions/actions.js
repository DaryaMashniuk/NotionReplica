import API from "../../../utils/API";

export const fetchNotes= async(dispatch,userId)=> {
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