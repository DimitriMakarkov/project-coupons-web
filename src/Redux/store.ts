import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authReducer";
import { AdminReducer } from "./adminReducer";
import { CompanyReducer } from "./companyReducer";
import { CustomerReducer } from "./customerReducer";

//which reducers should we use
const reducers = combineReducers({auth:AuthReducer,admin:AdminReducer,company:CompanyReducer,customer:CustomerReducer});

//combine all reducer to one single and happy store
export const store = configureStore({
    reducer: reducers,
    middleware: (getDefualtMiddleWare)=> getDefualtMiddleWare({serializableCheck:false})
});