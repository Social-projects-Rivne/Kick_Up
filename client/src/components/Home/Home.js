import React, {Component} from 'react';
import { Link as DomLink } from 'react-router-dom';

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';

import { withSnackbar } from 'notistack';
import { Typography, Button, Badge } from '@material-ui/core';
import { EventAvailable, SupervisorAccount, ExpandMore } from "@material-ui/icons";

import axios from "axios";

// Scroll to plugin;
import { Element, Events, Link, scroller } from 'react-scroll';

import NroomCard from '../nRoomCard/nRoomCard';
import NeventCard from '../nEventCard/nEventCard';

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
let mainSwiper, roomsSwiper;

// Helper functions;
const setMainSwiper = instance => {
    mainSwiper = instance;
};
const setRoomsSwiper = instance => {
    roomsSwiper = instance;
};
const updateSwipersHeight = () => {
    try {
        roomsSwiper.updateAutoHeight(300);
        
        // Wait rooms update, then main;
        window.setTimeout(() => {
            mainSwiper.updateAutoHeight(300);
        }, 300);
    } catch(err) {}
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

const mainSwiperParams = {
    containerClass: 'home__main-swiper',
    slidesPerView: 1,
    autoHeight: true
};

const roomsSliderParams = {
    modules: [Pagination],
    containerClass: 'home__rooms-swiper',
    slidesPerView: 1,
    simulateTouch: true,
    nested: true,
    autoHeight: true,
    pagination: {
        el: ".home__rooms-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    parallax: true,
    speed: 800,
    on: {
        slideChangeTransitionEnd: updateSwipersHeight
    }
};
const eventsSliderParams = {
    modules: [Pagination],
    containerClass: 'home__events-swiper',
    slidesPerView: 1,
    simulateTouch: true,
    nested: true,
    autoHeight: true,
    pagination: {
        el: ".home__events-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    speed: 800
};
const introSlidesSliderParams = {
    containerClass: 'home__intro',
    slidesPerView: 1,
    simulateTouch: true,
    parallax: true,
    speed: 800,
    nested: true,
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
    getScrollPos = () => {
        const currentOffset = document.documentElement.scrollTop || 
        document.body.scrollTop;
        return currentOffset;
    }
    handleScroll = () => {
        const awaitTime = 500;
        const minHeightToScroll = 100;
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
        let scrollDiff = 0;
        
        // In case animation wasn't finished, return;
        if (this.state.scrollInProgress) return;

        // Let's do some debouncing;
        window.clearTimeout(prevTimer);
        prevTimer = window.setTimeout(() => {
            // Get offset;
            const currentOffset = this.getScrollPos();

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
                (this.state.currentSlide === 3 && direction === 'down') ||
                (this.state.currentSlide === 1 && direction === 'up') ||
                scrollDiff <= minHeightToScroll
            ) {
                return;
            }

            const newSlide = setNewSlide();

            // Save new data into state;
            this.setState({
                currentSlide: newSlide,
                offset: currentOffset
            });

            // Scroll into required slide;
            try {
                this.setState({scrollInProgress: true});
                scroller.scrollTo('main-swiper-slide-' + newSlide, {
                    duration: 500,
                    delay: 100,
                    smooth: true,
                    isDynamic: true,
                    offset: (() => {
                        const headerHeight = {
                            DESKTOP: -87,
                            MOBILE: -80
                        };

                        if (newSlide === 1) {
                            return window.innerWidth >= _desktopWidth 
                            ? headerHeight.DESKTOP 
                            : headerHeight.MOBILE;   
                        } else { return 0; }
                    })()
                });
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
        Events.scrollEvent.register('end', () => {
            console.log('And our animation ended!');

            this.setState({
                scrollInProgress: false,
                offset: this.getScrollPos()
            })
        });
    }
    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.handleScroll);
        Events.scrollEvent.remove('end');
    }
    render = () => (
        <div className="main-content home">
            <Swiper {...mainSwiperParams} getSwiper={setMainSwiper}>
                <div>
                    <div data-main-slide="1" className="main-content__slide">
                    <Element name="main-swiper-slide-1"></Element>
                    <aside className="home__intro-btns-wrapper">
                        Here will go btns wrapper
                    </aside>
                    <Swiper {...introSlidesSliderParams} >
                        <div key={1} className="swiper-slide  home__intro-slide" data-intro-swiper-slide="1">
                            <div className="home__intro-title-wrapper">
                                <Typography className="home__intro-title" variant="h3" gutterBottom>
                                    Got hobby? You're in the right place
                                </Typography>
                            </div>
                        </div>
                        <div key={2} className="swiper-slide  home__intro-slide" data-intro-swiper-slide="2" >
                            <div className="home__intro-title-wrapper">
                                <Typography className="home__intro-title" variant="h3" gutterBottom>
                                    Kick Up unites people of same interests into virtual rooms
                                </Typography>
                                <Link 
                                    to="main-swiper-slide-3" 
                                    smooth={true} 
                                    duration={500}
                                >
                                    <Button
                                        className="home__intro-btn"
                                        variant="outlined"
                                        onClick={() => {this.setState({ 
                                            scrollInProgress: true,
                                            currentSlide: 3
                                        })}}
                                    >
                                        <SupervisorAccount />
                                        Explore rooms now
                                        <ExpandMore />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div key={3} className="swiper-slide  home__intro-slide" data-intro-swiper-slide="3">
                            <div className="home__intro-title-wrapper">
                                <Typography className="home__intro-title" variant="h3" gutterBottom>
                                    Kick Up offers splendid events for you and your mates
                                </Typography>
                                <Link 
                                    to="main-swiper-slide-2" 
                                    smooth={true} 
                                    duration={500}
                                >
                                    <Button
                                        className="home__intro-btn"
                                        variant="outlined"
                                        onClick={() => {this.setState({ 
                                            scrollInProgress: true,
                                            currentSlide: 2
                                        })}}
                                    >
                                        <EventAvailable />
                                        View events now
                                        <ExpandMore />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Swiper>
                </div>
                <div data-main-slide="2" className="main-content__slide">
                    <Element name="main-swiper-slide-2"></Element>
                    <DomLink to={'events'} className="home__cards-slide">
                        <EventAvailable fontSize="large" />
                        <Badge className="home__badge" badgeContent={328}>
                            <Typography className="home__cards-slide-title" variant="h4">
                                Events      
                            </Typography>
                        </Badge>
                    </DomLink>
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
                    <Element name="main-swiper-slide-3"></Element>
                    <DomLink to={'rooms'} className="home__cards-slide">
                        <SupervisorAccount fontSize="large" />
                        <Badge className="home__badge" badgeContent={328}>
                            <Typography className="home__cards-slide-title" variant="h4">
                                groups      
                            </Typography>
                        </Badge>
                    </DomLink>
                    <Swiper {...roomsSliderParams} getSwiper={setRoomsSwiper}>
                        <div key={1} className="swiper-slide">
                            <NroomCard btnClickHandler={updateSwipersHeight} />
                        </div>
                        <div key={2} className="swiper-slide">
                            <NroomCard btnClickHandler={updateSwipersHeight} />
                        </div>
                        <div key={3} className="swiper-slide">
                            <NroomCard btnClickHandler={updateSwipersHeight} />
                        </div>
                    </Swiper>
                </div>
            </div>
        </Swiper>        
    </div>
    )
};

export default withSnackbar(Home);
