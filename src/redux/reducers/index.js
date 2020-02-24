import { combineReducers } from "redux";
import OwnedListReducer from "./OwnedListReducer";

export default combineReducers({
  ownedList: OwnedListReducer
});