import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    errors: errorReducer,
    auth: authReducer,
});

export default rootReducer;
