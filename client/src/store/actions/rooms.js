import { 
    STORE_ROOMS, 
    SET_LOADING_ROOMS_STATUS,
    STORE_ROOM_DETAILS
} from "./actionTypes";
import { enqueueSnackbar } from "./toast";
import axios from 'axios';

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

const roomDetailsApi = '/api/room/';

export const storeRooms = data => ({
    type: STORE_ROOMS,
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

export const loadRooms = (uri, filter) => dispatch => {
    // Change UI for load start;
    setRoomsLoadState(true);

    // Load posts;
    axios
    .get(uri, filter)
    .then(res => {
        if (res && res.data && res.data.rooms) {
            dispatch(storeRooms(res.data.rooms));
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