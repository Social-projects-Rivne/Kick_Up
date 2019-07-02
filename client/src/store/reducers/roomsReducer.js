import { 
    STORE_ROOMS, 
    SET_LOADING_ROOMS_STATUS, 
    STORE_ROOM_DETAILS,
    STORE_ROOM_CATEGORIES,
    STORE_ROOM_TAGS,
    ADD_ROOMS
} from "../actions/actionTypes";

const initialStates = {
    roomsLoading: false,
    rooms: [],
    pageCount: 1,
    roomCount: null,
    categories: [],
    tags: []
};

export default function (state = initialStates, action) {
    switch(action.type) {
        case STORE_ROOMS:
            return {
                ...state,
                ...action.payload
            };
        case ADD_ROOMS:
        let uniqueIds = [];
        return {
            ...state,
            // Filter data to have ONLY uniques rooms;
            rooms: state.rooms
                .concat(action.payload.rooms)
                .filter(el => {
                    if (!uniqueIds.some(item => item === el.id)) {
                        uniqueIds.push(el.id);
                        return el;
                    }
                }),
            pageCount: action.payload.pageCount,
            roomCount: action.payload.roomCount,
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
                        if (parseInt(room.id) === parseInt(action.id)) {
                            room = {
                                ...room,
                                ...action.updates
                            }
                            
                            addNewRoom = false;
                        }

                        return room;
                    });

                    // If no room to update, add it;
                    if (addNewRoom) {
                        rooms.push(action.updates);
                    }
                    
                    return rooms;
                })()
            }
        case STORE_ROOM_CATEGORIES:
            return {
                ...state,
                categories: action.data
            }
        case STORE_ROOM_TAGS:
            return {
                ...state,
                tags: action.data
            }
        default: 
            return state;
    }
}