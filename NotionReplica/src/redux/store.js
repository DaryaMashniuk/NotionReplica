import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
import userReducer from "./user/reducer/reducer";
import notesReducer from "./notes/reducer/reducer";


const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
});

const store = createStore(
  rootReducer,
 
  composeWithDevTools(applyMiddleware(thunk))
);


export default store;
