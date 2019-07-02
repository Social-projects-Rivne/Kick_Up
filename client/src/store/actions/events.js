import { 
    STORE_EVENTS, 
    SET_LOADING_EVENTS_STATUS, 
    STORE_EVENT_DETAILS,
    STORE_EVENT_CATEGORIES,
    ADD_EVENTS,
} from "../actions/actionTypes";


import { enqueueSnackbar } from "./toast";
import axios from 'axios';

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

export const storeEvents = data => ({
    type: STORE_EVENTS,
    payload: data
});

export const setEventsLoadState = status => ({
    type: SET_LOADING_EVENTS_STATUS,
    status
});

export const saveEventCatogories = data => {
    return {
        type: STORE_EVENT_CATEGORIES,
        data
    }
};

export const loadEvents = (uri, filter) => dispatch => {
    // Change UI for load start;
    setEventsLoadState(true);
    console.log('loadEvents', filter)
    // Load posts;
    axios
    .get(uri, filter)
    .then(res => {
        console.log('res.data', res.data)
        if (res && res.data && res.data.events) {
            dispatch(storeEvents(res.data));
            setEventsLoadState(false);
        }
    })
    .catch(err => {
        setEventsLoadState(false);
        dispatch(enqueueSnackbar({
            message: 'Could not load events, please reload your page',
            options: {
                variant: messageType.ERR,
            },
        }));
    });
};

export const addEvents = (uri, filter) => dispatch => {
    // Change UI for load start;
    setEventsLoadState(true);
    console.log('addEvents', filter)
    // Load posts;
    axios
    .get(uri, filter)
    .then(res => {
        if (res && res.data && res.data.events) {
            dispatch({
                type: ADD_EVENTS,
                payload: res.data
            });
            setEventsLoadState(false);
        }
    })
    .catch(err => {
        setEventsLoadState(false);
        dispatch(enqueueSnackbar({
            message: 'Could not load events, please reload your page',
            options: {
                variant: messageType.ERR,
            },
        }));
    });
};