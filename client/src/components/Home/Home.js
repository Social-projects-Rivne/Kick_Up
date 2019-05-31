import React, {Component} from 'react';
import { Link as DomLink } from 'react-router-dom';

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination } from 'swiper/dist/js/swiper.esm';

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
let eventsSwipers = [];

// Helper functions. 
const convertTime = (str) => {
    // Define manually date;
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    };

    if (str && typeof str === 'string') {
        try{
            let [, month, date] = [...str.split('-')];
            let [hour, min] = [...date.split('T').pop().split(':')];
            
            date = date.slice(0, 2);

            return {
                date: `${date[0] === '0' ? date.slice(1) : date} ${months[month]}`,
                time: `${hour}:${min}` 
            }
        } catch(err) {
            console.log('ERR', err);
            return {
                date: '',
                time: ''
            }
        }
    }
};
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
        console.log('UPDATED');
    } catch(err) {console.log('ERR');}
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
    modules: [Pagination],
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
    speed: 800,
    observer: true,
    observeParents: true,
    on: {
        slideChangeTransitionEnd: updateSwipersHeight
    }
};
const eventsSliderParams = {
    modules: [Pagination],
    containerClass: 'home__events-swiper',
    simulateTouch: true,
    nested: true,
    autoHeight: true,
    pagination: {
        el: ".home__events-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    observer: true,
    observeParents: true,
    speed: 800
};
const introSlidesSliderParams = {
    modules: [Pagination],
    containerClass: 'home__intro',
    slidesPerView: 1,
    simulateTouch: true,
    parallax: true,
    speed: 800,
    nested: true,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: ".home__intro-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
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
};

let prevTimer, prevResizeTimer;

class Home extends Component {
    state = {
        events: [],
        rooms: [],
        roomCount: 0,
        eventCount: 0,
        offset: 0,
        currentSlide: 1,
        scrollInProgress: false,
        renderEventsSlider: false
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
        this.props.history.push({ pathname: "/room/" + id });
    };
    loadData = (callback) => {
        // @todo add load data from new route;
        async function getUser() {
            try {
                const res = await axios.get('/api');
                
                if (res && typeof callback === 'function') return callback(res.data);
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
    renderEventsSwiper = () => {
        const Type = {
            MOBILE: 0,
            TABLET: 1,
            DESKTOP: 2
        };
        const defineUniqueParams = (type) => {
            switch(type) {
                case Type.TABLET:
                    return {
                        slidesPerView: 2,
                        spaceBetween: 20
                        
                    }
                case Type.DESKTOP:
                    return {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        grabCursor: true
                    }
                default:
                    return {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
            }
        };
    
        // Add each type;
        for (let i = 0, length = Object.keys(Type).length; i < length; i++) {
            eventsSwipers.push((
                    <Swiper {...{...eventsSliderParams, ...defineUniqueParams(i)}} >
                        {this.state.events.map((event, idx) => {
                            return <div key={idx} className="swiper-slide">
                                <NeventCard 
                                    id={event.id}
                                    title={event.title}
                                    rating={event.eventRating}
                                    authorId={event.creator.id}
                                    authorName={event.creator.first_name}
                                    authorLastName={event.creator.last_name}
                                    authorAvatar={event.creator.avatar}
                                    cover={event.cover}
                                    description={event.description}
                                    eventLocation={event.location}
                                    eventDate={convertTime(event.start_date).date}
                                    eventTime={convertTime(event.start_date).time}
                                    members={event.members}
                                    membersLimit={event.members_limit}
                                />
                            </div>
                        })}
                    </Swiper>
                )
            );
        }
    }
    setEventsSwiper = () => {
        const Type = {
            MOBILE: 0,
            TABLET: 1,
            DESKTOP: 2
        };
        const defineType = () => {
            let res = Type.MOBILE;

            if (
                window.innerWidth >= 768 &&
                window.innerWidth < 1024                
            ) {
                res = Type.TABLET;
            } else if (window.innerWidth >= 1024) {
                res = Type.DESKTOP;
            }

            return res;
        };

        // In case no instances, render them;
        if (!eventsSwipers.length) this.renderEventsSwiper();

        return eventsSwipers[defineType()];
    }
    handleScroll = () => {
        const awaitTime = 500;
        const minHeightToScroll = 180;
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
    handleResize = () => {
        const _awaitTime = 500;

        window.clearTimeout(prevResizeTimer);
        prevResizeTimer = window.setTimeout(() => {
            updateSwipersHeight();
            applySVGImage();

            // Force re-render of events swiper;
            this.setState({ renderEventsSlider: false }, () => {
                this.setState({ renderEventsSlider: true });
            });
        }, _awaitTime);
    }
    componentDidMount = () => {
        const _awaitTime = 100;

        // Retrieve items;
        this.loadData(res => {
            if (res) {
                // @temp, remove after Alex will add room events;
                res.rooms.forEach(room => {
                    room.events = res.events;
                    if (room.events.length > 3) room.events.length = 3;
                });

                this.setState({
                    renderEventsSlider: true,
                    events: res.events,
                    rooms: res.rooms,
                    eventCount: res.eventCount,
                    roomCount: res.roomCount
                });
            }
        });

        // Update swipers height;
        updateSwipersHeight();

        // Add event listeners;
        document.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
        Events.scrollEvent.register('end', () => {

            this.setState({
                scrollInProgress: false,
                offset: this.getScrollPos()
            })
        });

        // After we accomplished init of all swipers, update height;
        let awaitSwipersInitDone = window.setInterval(() => {
            if (
                mainSwiper &&
                roomsSwiper &&
                eventsSwipers.length > 0
            ) {
                updateSwipersHeight();
                window.clearInterval(awaitSwipersInitDone);
            }
        }, _awaitTime);
    }
    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
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
                        {
                            this.state.eventCount > 0
                            ? <Badge className="home__badge" badgeContent={this.state.eventCount}>
                                <Typography title="Click to view all events" className="home__cards-slide-title" variant="h4">
                                    Events      
                                </Typography>
                            </Badge>
                            : <Typography title="Click to view all events" className="home__cards-slide-title" variant="h4">
                                Events      
                            </Typography>
                        }
                    </DomLink>
                    {this.state.renderEventsSlider && this.setEventsSwiper()}
                </div>
                <div data-main-slide="3" className="main-content__slide">
                    <Element name="main-swiper-slide-3"></Element>
                    <DomLink to={'rooms'} className="home__cards-slide">
                        <SupervisorAccount fontSize="large" />
                        {
                            this.state.roomCount > 0
                            ? <Badge className="home__badge" badgeContent={this.state.roomCount}>
                                <Typography title="Click to view all rooms" className="home__cards-slide-title" variant="h4">
                                    rooms      
                                </Typography>
                            </Badge>
                            : <Typography title="Click to view all rooms" className="home__cards-slide-title" variant="h4">
                                rooms      
                            </Typography>
                        }
                    </DomLink>
                    {
                        this.state.renderEventsSlider &&
                        <Swiper {...roomsSliderParams} getSwiper={setRoomsSwiper}>
                            {
                                this.state.rooms.map((room, idx) => {
                                    return <div key={room.id} className="swiper-slide">
                                        <NroomCard
                                            id={room.id}
                                            title={room.title}
                                            rating={room.eventRating}
                                            authorId={room.creator.id}
                                            authorName={room.creator.first_name}
                                            authorLastName={room.creator.last_name}
                                            authorAvatar={room.creator.avatar}
                                            cover={room.cover}
                                            description={room.description}
                                            members={room.members}
                                            membersLimit={room.members_limit}
                                            category={room.category.title}
                                            events={room.events}
                                        />
                                    </div>
                                })
                            }
                        </Swiper>    
                    }
                </div>
            </div>
        </Swiper>        
    </div>
    )
};

export default withSnackbar(Home);
