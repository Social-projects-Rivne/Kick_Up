import React, {Component} from 'react';

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import { Typography } from '@material-ui/core'; 
import axios from "axios";
//import RoomCard from '../Rooms/RoomCard/RoomCard';
import { withSnackbar } from 'notistack';
import NroomCard from '../nRoomCard/nRoomCard';
import NeventCard from '../nEventCard/nEventCard';

// Require smooth scroll polyfill;
import smoothscroll from 'smoothscroll-polyfill';

const API = {
    getRooms: '/api/room/',
    getEvents: '/api/event/'
};
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};

const roomsSliderParams = {
    modules: [Pagination],
    containerClass: 'home__rooms-swiper',
    slidesPerView: 1,
    simulateTouch: true,
    pagination: {
        el: ".home__rooms-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    parallax: true,
    speed: 800
};
const eventsSliderParams = {
    modules: [Pagination],
    containerClass: 'home__events-swiper',
    slidesPerView: 1,
    simulateTouch: true,
    pagination: {
        el: ".home__events-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    parallax: true,
    speed: 800
};

let prevTimer;

// Init smooth scroll polyfill;
window.__forceSmoothScrollPolyfill__ = true;
smoothscroll.polyfill();

class Home extends Component {
    state = {
        events: [],
        rooms: [],
        offset: 0,
        currentSlide: 1,
        scrollInProgress: false
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
    handleScroll = (scrollEvt) => {
        return;
        const awaitTime = 500;
        const animationTime = 550;
        const minHeightToScroll = 50;
        const setNewSlide = () => {
            const minSlide = 1;
            const maxSlide =  3;
            const increaseIdxBy = Math.floor(scrollDiff / window.innerHeight);
            let slideIdx = null;

            if (direction === 'up') {
                slideIdx = this.state.currentSlide - 1 - increaseIdxBy;
                if (slideIdx < minSlide) slideIdx = minSlide;
            } else {
                slideIdx = this.state.currentSlide + 1 + increaseIdxBy;
                if (slideIdx > maxSlide) slideIdx = maxSlide;
            } 

            return slideIdx;
        };
        let direction = null;
        let scrollIntoEl = null;
        let scrollDiff = 0;

        // In case animation wasn't finished, return;
        if (this.state.scrollInProgress) return;

        // Let's do some debouncing;
        window.clearTimeout(prevTimer);
        prevTimer = window.setTimeout(() => {
            console.log('Inside handleScroll');

            // Get offset;
            const currentOffset = document.documentElement.scrollTop || 
            document.body.scrollTop;

            // Get scroll diff;
            scrollDiff = Math.abs(currentOffset - this.state.offset);

            // Define direction;
            if (currentOffset > this.state.offset) {
                direction = 'down';
            } else if (currentOffset < this.state.offset) {
                direction = 'up';
            }

            /* In cases: 
                * 1) no direction;
                * 2) last slide and direction is down;
                * 3) first slide and direction is up;
                * 4) Difference in scroll is less than min val, minHeightToScroll;
                * we do nothing and return;
            */ 
            if (
                !direction ||
                this.state.currentSlide === 3 && direction === 'down' ||
                this.state.currentSlide === 1 && direction === 'up' ||
                scrollDiff <= minHeightToScroll
            ) {
                return;
            }

            const newSlide = setNewSlide();

            // Save new data into state;
            this.setState({
                currentSlide: newSlide,
                offset : currentOffset
            });

            // Scroll into required slide;
            try {
                if (this.state.currentSlide === 1) {
                    scrollIntoEl = document.querySelector('header');
                } else {
                    scrollIntoEl = document.querySelector(`[data-main-slide="${this.state.currentSlide}"]`);
                }
               
                this.setState({scrollInProgress: true});

                // Allow scrolls after scroll animation finished;
                window.setTimeout(() => {
                    this.setState({scrollInProgress: false});

                    // Update current position, as it could be changed;
                    this.setState({
                        offset: document.documentElement.scrollTop || document.body.scrollTop
                    });
                }, animationTime);
                
                scrollIntoEl.scrollIntoView({ behavior: 'smooth' });
            } catch(err) {}
        }, awaitTime);
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

        // Add event listeners;
        document.addEventListener('scroll', this.handleScroll);
    }
    render = () => (
        <div className="main-content home">
            <div data-main-slide="1" className="main-content__slide">
                <h1>Here we have slide 1</h1>
                <h1>Here we have slide 1</h1>
                <h1>Here we have slide 1</h1>
                <h1>Here we have slide 1</h1>
            </div>
            <div data-main-slide="2" className="main-content__slide">
                <Swiper {...eventsSliderParams} >
                    <div key={1} className="swiper-slide">
                        <NeventCard />
                    </div>
                    <div key={2} className="swiper-slide">
                        <NeventCard />
                    </div>
                    <div key={3} className="swiper-slide">
                        <NeventCard />
                    </div>
                </Swiper>
            </div>
            <div data-main-slide="3" className="main-content__slide">
                <Swiper {...roomsSliderParams} >
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
        </div>
    )
};

export default withSnackbar(Home);
