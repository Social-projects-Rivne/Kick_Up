import { 
    STORE_ROOMS,
    ADD_ROOMS,
    STORE_ROOM_DETAILS,
    SET_LOADING_ROOMS_STATUS,
    STORE_ROOM_CATEGORIES,
    STORE_ROOM_TAGS,
    
} from "./actionTypes";
import { enqueueSnackbar } from "./toast";
import axios from 'axios';

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

const roomDetailsApi = '/api/room/';
const roomCategoriesApi = '/api/category/';
const roomTagsApi = '/api/tag';

// Action creators;
export const storeRooms = data => ({
    type: STORE_ROOMS,
    payload: data
});

export const storeNewRoom = data => ({
    type: ADD_ROOMS,
    payload: data
});

export const setRoomsLoadState = status => ({
    type: SET_LOADING_ROOMS_STATUS,
    status
});

export const saveRoomDetails = (id, updates) => {
    if (parseInt(id) > 0) {
        return {
            type: STORE_ROOM_DETAILS,
            id,
            updates
        }
    }
};

export const saveRoomCatogories = data => {
    return {
        type: STORE_ROOM_CATEGORIES,
        data
    }
};

export const saveRoomTags = data => {
    return {
        type: STORE_ROOM_TAGS,
        data
    }
};

// Helpers;
export const addNewRoom = data => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);

    // Save new room;
    axios
        .post(roomDetailsApi, data)
        .then(res => {
            console.log('res.data', res.data)
            dispatch(storeNewRoom(res.data));
            setRoomsLoadState(false);
        })
        .catch(err => {
            let errors = err.response.data.error.errors;
            for (const key in errors) {
                dispatch(enqueueSnackbar({
                    message: errors[key][0],
                        options: {
                            variant: messageType.ERR,
                        },
                 }));
            }
            setRoomsLoadState(false);
        });
};

export const loadRooms = (uri, filter) => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);
    // Load posts;
    axios
    .get(uri, filter)
    .then(res => {
        if (res && res.data && res.data.rooms) {
            dispatch(storeRooms(res.data));
            setRoomsLoadState(false);
        }
    })
    .catch(err => {
        setRoomsLoadState(false);
        dispatch(enqueueSnackbar({
            message: 'Could not load rooms, please reload your page',
            options: {
                variant: messageType.ERR,
            },
        }));
    });
};

export const addRooms = (uri, filter) => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);
    // Load posts;
    axios
    .get(uri, filter)
    .then(res => {
        if (res && res.data && res.data.rooms) {
            dispatch(storeNewRoom(res.data.rooms));
            setRoomsLoadState(false);
        }
    })
    .catch(err => {
        setRoomsLoadState(false);
        dispatch(enqueueSnackbar({
            message: 'Could not load rooms, please reload your page',
            options: {
                variant: messageType.ERR,
            },
        }));
    });
};

export const loadRoomDetails = id => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);

    // Load posts;
    axios
    .get(`${roomDetailsApi}${id}/`)
    .then(res => {
        if (res && res.data) {
            dispatch(saveRoomDetails(id, res.data));
            setRoomsLoadState(false);
        }
    })
    .catch(err => {
        setRoomsLoadState(false);
        dispatch(enqueueSnackbar({
            message: 'Could not load room details, please reload your page',
            options: {
                variant: messageType.ERR,
            },
        }));
    });  
};

export const loadRoomCategories = () => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);

    // Load categories;
    axios
        .get(roomCategoriesApi)
        .then(res => {
            dispatch(saveRoomCatogories(res.data));
            setRoomsLoadState(false);
        })
        .catch(err => {
            setRoomsLoadState(false);
        });
};

export const loadRoomTags = () => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);

    // Load Tags;
    axios
        .get(roomTagsApi)
        .then(res => {
            dispatch(saveRoomTags(res.data));
            setRoomsLoadState(false);
        })
        .catch(err => {
            setRoomsLoadState(false);
        });
};

export const editRoom = (id, updates) => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);

    // Pass to server updates;
    axios
        .put(roomDetailsApi + id, updates)
        .then(() => {
            updates.wasEdited = true;
            dispatch(saveRoomDetails(id, updates));
        })
        .catch(err => {
            let errors = err.response.data.error.errors;
            for (const key in errors) {
                dispatch(enqueueSnackbar({
                    message: errors[key][0],
                        options: {
                            variant: messageType.ERR,
                        },
                 }));
            }
        });
};

