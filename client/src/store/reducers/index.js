import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import toastReducer from './toastReducer';
import homeReducer from './homeReducer';
import roomsReducer from './roomsReducer';
import eventsReducer from './eventsReducer';
import userProfileReducer from "./userProfileReducer";

const rootReducer = combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toast: toastReducer,
    home: homeReducer,
    events: eventsReducer,
    userProfile: userProfileReducer,
    rooms: roomsReducer
});

export default rootReducer;
