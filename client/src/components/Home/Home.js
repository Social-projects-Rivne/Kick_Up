import React, {Component} from 'react';

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import { Typography } from '@material-ui/core'; 
import axios from "axios";
//import RoomCard from '../Rooms/RoomCard/RoomCard';
import { withSnackbar } from 'notistack';
import NroomCard from '../nRoomCard/nRoomCard';

const API = {
    getRooms: '/api/room/',
    getEvents: '/api/event/'
};
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};
const mainSliderParams = {
    modules: [Pagination, Navigation],
    containerClass: 'home__main-swiper',
    direction: 'vertical',
    slidesPerView: 1,
    simulateTouch: true,
    autoHeight: true,
    pagination: {
        el: ".home__main-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    speed: 800,
    navigation: {
        prevEl: '.edit-profile__form-prev',
        nextEl: '.edit-profile__form-next',
    },
    renderFraction: function() {
        return `
            <h1>aaa</h1>
        `
    }
};

const roomsSliderParams = {
    modules: [Pagination],
    containerClass: 'home__rooms-swiper',
    slidesPerView: 1,
    simulateTouch: true,
    nested: true,
    pagination: {
        el: ".home__rooms-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    speed: 800
};

class Home extends Component {
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
    selectedRoomHandler = id => {
        this.props.history.push({ pathname: "/rooms/" + id });
    };
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
        <div className="main-content  home" >
            <Swiper {...mainSliderParams} getSwiper={ this.setSwiper } >
                <div key={1} className="swiper-slide  home__main-swiper-slide">
                    <h1>Here we have slide 1</h1>
                </div>
                <div key={2} className="swiper-slide home__main-swiper-slide">
                    <Typography variant="h4">
                        Interesting rooms:
                    </Typography>



                    <Swiper {...roomsSliderParams} getSwiper={ this.setSwiper } >
                        <div key={1} className="swiper-slide">
                            <NroomCard />
                        </div>
                        <div key={2} className="swiper-slide">
                            <NroomCard />
                        </div>
                        <div key={3} className="swiper-slide">
                            <NroomCard />
                        </div>
                    </Swiper>


                </div>
                <div key={3} className="swiper-slide  home__main-swiper-slide">
                    <h1>Here we have slide 3</h1>
                </div>
            </Swiper>
        </div>
    );
};

export default withSnackbar(Home);
