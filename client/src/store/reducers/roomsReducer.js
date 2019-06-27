import { 
    STORE_ROOMS, 
    SET_LOADING_ROOMS_STATUS, 
    STORE_ROOM_DETAILS 
} from "../actions/actionTypes";

const initialStates = {
    roomsLoading: false,
    rooms: [],
};

export default function (state = initialStates, action) {
    switch(action.type) {
        case STORE_ROOMS:
            let uniqueIds = [];

            return {
                ...state,
                // Filter data to have ONLY uniques rooms;
                rooms: state.rooms
                    .concat(action.payload)
                    .filter(el => {
                        if (!uniqueIds.some(item => item === el.id)) {
                            uniqueIds.push(el.id);
                            return el;
                        }
                    }),
            };
        case SET_LOADING_ROOMS_STATUS:
            return {
                ...state,
                roomsLoading: action.status
            };
        case STORE_ROOM_DETAILS:
            return {
                ...state,
                // If found room, update it, in case not found, add it;
                rooms: (() => {
                    let addNewRoom = true;

                    // Check and  update room
                    let rooms = state.rooms.map(room => {
                        if (room.id === action.id) {
                            room = action.updates;
                            addNewRoom = false;
                        }
                    });

                    // If no room to update, add it;
                    if (addNewRoom) {
                        rooms.push(action.updates);
                    }

                    return rooms;
                })()
            }
        default: 
            return state;
    }
}