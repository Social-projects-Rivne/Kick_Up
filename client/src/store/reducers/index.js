import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import toastReducer from './toastReducer';
import homeReducer from './homeReducer';
import userProfileReducer from "./userProfileReducer";
import editProfileReducer from "./editProfileReducer";

const rootReducer = combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toast: toastReducer,
    home: homeReducer
    userProfile: userProfileReducer,
    editProfile: editProfileReducer,
});

export default rootReducer;
