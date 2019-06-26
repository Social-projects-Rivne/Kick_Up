import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import toastReducer from './toastReducer';
import userProfileReducer from "./userProfileReducer";

const rootReducer = combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toast: toastReducer,
    userProfile: userProfileReducer,
});

export default rootReducer;
