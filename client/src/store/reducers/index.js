import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import toastReducer from './toastReducer';
import homeReducer from './homeReducer';
import roomsReducer from './roomsReducer';
import userProfileReducer from "./userProfileReducer";

const rootReducer = combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toast: toastReducer,
    home: homeReducer,
    userProfile: userProfileReducer,
    rooms: roomsReducer
});

export default rootReducer;
