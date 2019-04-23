import React, {Component} from 'react';

import axios from "axios";
import RoomCard from '../Rooms/RoomCard/RoomCard';
import { Grid } from '@material-ui/core';
import { withSnackbar } from 'notistack';

const API = {
    getRooms: '/api/room/',
    getEvents: '/api/event/'
};
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};

class Home extends Component {
    constructor(props) { super(props) };
    state = {
        events: [],
        rooms: []
    };
    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
    }
    loadData = (callback) => {
        async function getUser() {
            try {
                const rooms = await axios.get(API.getRooms);
                const events = await axios.get(API.getEvents);
                
                return {
                    events: events.data,
                    rooms: rooms.data
                }
            } catch (err) {
                this.handleServerErrors(err.response.data.error.errors);
            }
        };

        getUser().then(res => {
            if (typeof callback === 'function') return callback(res);
        }).catch(() => {
            this.showToast('Something went wrong, please reload your page.', messageType.ERR);
            return callback(false);
        });
    }
    handleServerErrors = (err) => {
        let res = [];

        // Retrieve all errors;
        Object.values(err).forEach((el) => {
            res.push(el[0]);
        });

        // Show all messages;
        try {
            res.forEach(msg => {
                this.showToast(msg, messageType.ERR);
            });
        } catch(err) {
            this.showToast('Something went wrong :( Try reload your page', messageType.ERR);
        }
    }
    componentDidMount = () => {
        // Retrieve items;
        this.loadData(res => {
            if (res) {
                this.setState({
                    events: res.events,
                    rooms: res.rooms
                });
            }
        });
    }
    render = () => (
        <div className="main-content" >
            <Grid container spacing={24}>
                {
                    this.state.rooms &&
                    this.state.rooms.map(room => (
                        <RoomCard 
                            background={room.cover}
                            avatar={room.creator.avatar}
                            title={room.title}
                            category={room.category.title}
                            rating={room.rating}
                            description={room.description}
                            members={room.members}
                            limit={room.members_limit}
                        />
                    ))
                }
            </Grid>
        </div>
    );
};

export default withSnackbar(Home);
