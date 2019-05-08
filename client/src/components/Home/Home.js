import React, {Component} from 'react';

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import { Typography, Button } from '@material-ui/core';
import { EventAvailable, SupervisorAccount, ExpandMore } from "@material-ui/icons";
import axios from "axios";
//import RoomCard from '../Rooms/RoomCard/RoomCard';
import { withSnackbar } from 'notistack';
import NroomCard from '../nRoomCard/nRoomCard';
import NeventCard from '../nEventCard/nEventCard';

// Require smooth scroll polyfill;
import smoothscroll from 'smoothscroll-polyfill';

// Import media;
import bg1_desk from '../../assets/images/intro-slider/bg-1-desk.png';
import bg1_desk_placeholder from '../../assets/images/intro-slider/bg-1-desk.svg';
import bg1_mob_vert from '../../assets/images/intro-slider/bg-1-mob-vert.png';
import bg1_mob_vert_placeholder from '../../assets/images/intro-slider/bg-1-mob-vert.svg';
import bg1_mob_hor from '../../assets/images/intro-slider/bg-1-mob-hor.png';
import bg1_mob_hor_placeholder from '../../assets/images/intro-slider/bg-1-mob-hor.svg';

import bg2_desk from '../../assets/images/intro-slider/bg-2-desk.png';
import bg2_desk_placeholder from '../../assets/images/intro-slider/bg-2-desk.svg';
import bg2_mob_vert from '../../assets/images/intro-slider/bg-2-mob-vert.png';
import bg2_mob_vert_placeholder from '../../assets/images/intro-slider/bg-2-mob-vert.svg';
import bg2_mob_hor from '../../assets/images/intro-slider/bg-2-mob-hor.png';
import bg2_mob_hor_placeholder from '../../assets/images/intro-slider/bg-2-mob-hor.svg';

import bg3_desk from '../../assets/images/intro-slider/bg-3-desk.png';
import bg3_desk_placeholder from '../../assets/images/intro-slider/bg-3-desk.svg';
import bg3_mob_vert from '../../assets/images/intro-slider/bg-3-mob-vert.png';
import bg3_mob_vert_placeholder from '../../assets/images/intro-slider/bg-3-mob-vert.svg';
import bg3_mob_hor from '../../assets/images/intro-slider/bg-3-mob-hor.png';
import bg3_mob_hor_placeholder from '../../assets/images/intro-slider/bg-3-mob-hor.svg';

const API = {
    getRooms: '/api/room/',
    getEvents: '/api/event/'
};
const _desktopWidth = 1024;
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};
const placeholders = [
    {
        mobileVert: bg1_mob_vert_placeholder,
        mobileHor: bg1_mob_hor_placeholder,
        desktop: bg1_desk_placeholder
    },
    {
        mobileVert: bg2_mob_vert_placeholder,
        mobileHor: bg2_mob_hor_placeholder,
        desktop: bg2_desk_placeholder
    },
    {
        mobileVert: bg3_mob_vert_placeholder,
        mobileHor: bg3_mob_hor_placeholder,
        desktop: bg3_desk_placeholder
    }
];
const slides = [
    {
        mobileVert: bg1_mob_vert,
        mobileHor: bg1_mob_hor,
        desktop: bg1_desk
    },
    {
        mobileVert: bg2_mob_vert,
        mobileHor: bg2_mob_hor,
        desktop: bg2_desk
    },
    {
        mobileVert: bg3_mob_vert,
        mobileHor: bg3_mob_hor,
        desktop: bg3_desk
    }
];
const selectors = {
    activeIntroSlide: '.home__intro-slide.swiper-slide-active',
    loadingImageClass: 'home__intro-slide_loading',
};

// Need this as swiper here, cannot bind it, as swiper is initialized aync; 
const applySVGImage = function() {    
    const svg = document.createElement('img');
    const img = document.createElement('img');
    let svgPath = null;
    let imgToLoadPath = null;
    const activeSlide = document.querySelector(selectors.activeIntroSlide);
    
    // In case image was loaded already, return;
    if (activeSlide.querySelectorAll('img').length > 0) return;
    
    // Define svg placeholder and image to be applied;
    svgPath = window.innerWidth < _desktopWidth 
    ? window.innerWidth >= window.innerHeight
        ? placeholders[this.activeIndex].mobileHor 
        : placeholders[this.activeIndex].mobileVert
    : placeholders[this.activeIndex].desktop;
    
    imgToLoadPath = window.innerWidth < _desktopWidth 
    ? window.innerWidth >= window.innerHeight
        ? slides[this.activeIndex].mobileHor
        : slides[this.activeIndex].mobileVert
    : slides[this.activeIndex].desktop;

    // Prepend placeholder, add loading class;
    if (svgPath) svg.setAttribute('src', svgPath);
    activeSlide.insertAdjacentElement('afterbegin', svg);
    activeSlide.classList.add(selectors.loadingImageClass);

    // Prepend image, show on load;
    if (imgToLoadPath) img.setAttribute('src', imgToLoadPath);
    activeSlide.insertAdjacentElement('beforeend', img);
    img.addEventListener('load', () => {
        activeSlide.classList.remove(selectors.loadingImageClass);
    });
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
const introSlidesSliderParams = {
    containerClass: 'home__intro',
    slidesPerView: 1,
    simulateTouch: true,
    parallax: true,
    speed: 800,
    //noSwiping: true,
    autoplay: {
        delay: 50000,
    },
    on: {
        init: applySVGImage,
        sliderMove: applySVGImage,
        slideChangeTransitionStart: applySVGImage,
        resize: function() {
            const images = this.el.querySelectorAll('.home__intro-slide img');
            
            // Remove all images;
            [].slice.call(images).forEach(el => {
                el.parentElement.removeChild(el);
            });

            // Load new ones;
            applySVGImage.call(this);
        }
    }
}

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
                <aside className="home__intro-btns-wrapper">
                    Here will go btns wrapper
                </aside>
                <Swiper {...introSlidesSliderParams} >
                    <div key={1} className="swiper-slide  home__intro-slide" data-intro-swiper-slide="1">
                        <Typography className="home__intro-title" variant="h3" gutterBottom>
                            Got hobby? You're in the right place
                        </Typography>
                    </div>
                    <div key={2} className="swiper-slide  home__intro-slide" data-intro-swiper-slide="2" >
                        <Typography className="home__intro-title" variant="h3" gutterBottom>
                            Kick Up unites people of same interests into virtual rooms
                        </Typography>
                        <Button
                            className="home__intro-btn"
                            variant="outlined"
                        >
                            <SupervisorAccount />
                            Explore rooms now
                            <ExpandMore />
                        </Button>
                    </div>
                    <div key={3} className="swiper-slide  home__intro-slide" data-intro-swiper-slide="3">
                        <Typography className="home__intro-title" variant="h3" gutterBottom>
                            Kick Up offers splendid events for you and your mates
                        </Typography>
                    </div>
                </Swiper>
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
