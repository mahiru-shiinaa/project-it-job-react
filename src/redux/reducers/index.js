import { combineReducers } from "redux"
import loginReducer from "./loginReducer";
import authReducer from "./auth.reducer";




const allReducers = combineReducers({
    login: loginReducer ,
    auth: authReducer,
    //Thêm nhiều reducer ở đây
});

export default allReducers;