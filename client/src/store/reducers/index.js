import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import toastReducer from './toastReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toast: toastReducer,
    home: homeReducer
});

export default rootReducer;
