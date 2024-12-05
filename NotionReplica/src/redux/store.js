import {applyMiddleware, combineReducers, createStore } from 'redux'
import {composeWithDevTools} from '@redux-devtools/extension'
import notesReducer from './notes/reducer/reducer';
import userReducer from './user/reducer/reducer'
import thunk from 'redux-thunk'

export default createStore(combineReducers({
    notes: notesReducer,
    user: userReducer
}),
   composeWithDevTools(applyMiddleware(thunk))
);
//.withExtraArgument(Api)