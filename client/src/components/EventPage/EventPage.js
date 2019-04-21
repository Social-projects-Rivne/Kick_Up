import React, { Component } from "react";

import { 
   AppBar,
   Tabs,
   Tab,
   Badge,
   Fab,
   Typography,
   Grid,
   Paper,
   Avatar,
   List,
   ListItem,
   ListItemText,
   ListItemAvatar,
   ListItemIcon,
   ExpansionPanel,
   ExpansionPanelDetails,
   ExpansionPanelSummary
} from '@material-ui/core';
import {
    Face,
    Info,
    Comment,
    Collections,
    Add,
    DateRange,
    LocationOn,
    ExpandMore
} from '@material-ui/icons';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Autoplay } from 'swiper/dist/js/swiper.esm';
import "react-id-swiper/src/styles/scss/swiper.scss";

// Global constants;

// Swipers params for event page;
const galleryParams = {
    modules: [Pagination, Autoplay],
    effect: 'slide',
    slidesPerView: 'auto',
    centeredSlides: false,
    loop: true,
    containerClass: 'swiper-container  event-page__gallery-swiper',
    rebuildOnUpdate: true,
    shouldSwiperUpdate: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    spaceBetween: 16,
    autoplay: true
};
let swiperInstance;

const tabsParams = {
    modules: [Pagination],
    slidesPerView: 'auto',
    loop: false,
    centeredSlides: true,
    autoHeight: true,
    spaceBetween: 30,
    rebuildOnUpdate: true,
    shouldSwiperUpdate: true,
    containerClass: 'swiper-container  event-page__tabs-swiper',
    // Update height;
    on: {
        click: function() {
            this.updateAutoHeight();
        }
    }
};

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: [],
            title: '',
            description: '',
            users: [],
            swiper: null,
            activeSlide: 0
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    saveSwiper = (instance) => {
        // Save and listen for slides change;
        if (instance) {
            swiperInstance = instance;
        swiperInstance.on('slideChange', this.handleSwiperSlideChange);
        }
    }
    handleSwiperSlideChange = () => {
        this.setState({ activeSlide: swiperInstance.activeIndex });
    }
    slideTo = (idx) => {
        if (idx >= 0) {
            swiperInstance.slideTo(idx);
        }
    }
    componentDidMount = () => {
        // Get data, @todo get it from server via axios;
        const data = {
            title: 'Meteor shower gathering',
            description: '9 meteor showers in August 2019 among others! \
            The Lyrids peaking! Keep your eyes to the sky! A meteor shower is \
            a celestial event in which a number of meteors are observed to radiate, \
            or originate, from one point in the night sky. Don\'t miss it!',
            gallery: [
                'http://dennisradai.com/projects/kick/ms1.jpg',
                'http://dennisradai.com/projects/kick/ms2.jpg',
                'http://dennisradai.com/projects/kick/ms3.jpg'
            ],
            users: [
                {
                    id: 1,
                    name: 'Ramon Good',
                    image: 'http://i.pravatar.cc/36',
                    joined: '7 days ago'
                },
                {
                    id: 2,
                    name: 'Mauricio Hawkins',
                    image: 'http://i.pravatar.cc/36',
                    joined: '2 days ago'
                },
                {
                    id: 3,
                    name: 'Sage Gates',
                    image: 'http://i.pravatar.cc/36',
                    joined: '5 days ago'
                },
                {
                    id: 4,
                    name: 'Heath Meadows',
                    image: 'http://i.pravatar.cc/36',
                    joined: '8 days ago'
                },
                {
                    id: 5,
                    name: 'Davion Dennis',
                    image: 'http://i.pravatar.cc/36',
                    joined: '2 days ago'
                },
                {
                    id: 6,
                    name: 'Remington Dalton',
                    image: 'http://i.pravatar.cc/36',
                    joined: '1 day ago'
                },
                {
                    id: 7,
                    name: 'Direct Elton',
                    image: 'http://i.pravatar.cc/36',
                    joined: '12 days ago'
                }
            ]
        }

        // @temp, immitate delay;
        window.setTimeout(() => {
            this.setState(() => data); 
        }, 500);
    }
    render() {
        return (
            <div className="event-page">
                <AppBar position="fixed" className="tab-bar">
                    <Tabs
                        value={this.state.activeSlide}
                        className="event-page__tab-menu"
                    >
                        <Tab label="Info" icon={<Info />} onClick={() => {this.slideTo(0)}}/>
                        <Tab label="Q&A" icon={<Comment /> } onClick={() => {this.slideTo(1)}} />
                        <Tab label="Gallery" icon={<Collections />} onClick={() => {this.slideTo(2)}} />
                        <Tab 
                            onClick={() => {this.slideTo(3)}}
                            label={
                                <div className="event-page__badge-wrapper">
                                    <Badge badgeContent={3} >
                                        <Face />
                                    </Badge>
                                    <p className="badge-members">Members</p>
                                </div>
                            }
                        />
                    </Tabs>
                </AppBar>

                <div className="event-page__title-wrapper">
                    {this.state.title &&
                        <Typography variant="h5" className="event-page__title">
                            {this.state.title}
                        </Typography>
                    }
                    <Fab className="event-page__fab" variant="extended" color="primary">
                        <Add />
                        <span className="event-page__fab-text">Join now</span>
                    </Fab>
                </div>

                <Swiper {...tabsParams} getSwiper={this.saveSwiper}>
                    <Grid className="event-page__section" item xs={12}>
                        <List>
                            <ListItem className="event-page__list-item">
                                <ListItemIcon>
                                    <DateRange />
                                </ListItemIcon>
                                {/* @todo, display via moment.js; */}
                                <ListItemText className="event-page__list-item-text" primary="April 7th 2019, 4:30 pm" />
                            </ListItem>
                            <ListItem className="event-page__list-item">
                                <ListItemIcon>
                                    <LocationOn />
                                </ListItemIcon>
                                {/* @todo, display from DB; */}
                                <ListItemText className="event-page__list-item-text" primary="4-6 Slovatsʹkoho str., Rivne, 33017"/>
                            </ListItem>
                        </List>
                        <Paper elevation={1} className="event-page__main-details-wrapper">
                            {
                                this.state.description &&
                                <Typography component="p" className="event-page__main-details">
                                    {this.state.description}
                                </Typography>
                            }
                        </Paper>
                    </Grid>
                    <Grid className="event-page__section" item xs={12}>
                        <Typography className="event-page__desktop-subtitle" variant="h5">
                        Questions
                        </Typography>
                        <ExpansionPanel>
                            <ExpansionPanelSummary className="event-page__faq-title" expandIcon={<ExpandMore />}>
                                {/* @todo take data from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                <Typography>A time to gather stones! Who will join me from Lutsk?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="event-page__faq-answer">
                                {/* @todo take data from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/2.jpg" className="avatar  event-page__avatar" />
                                <Typography className="event-page__faq-text">
                                    Hello, glad to see you! I do suppose I will be able to join you. Call me morning and 
                                    we agree all the details.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary className="event-page__faq-title" expandIcon={<ExpandMore />}>
                                {/* @todo take data from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/3.jpg" className="avatar  event-page__avatar" />
                                <Typography>What is best time to see this meteor shower?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="event-page__faq-answer">
                                {/* @todo take data from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/4.jpg" className="avatar  event-page__avatar" />
                                <Typography className="event-page__faq-text">
                                This meteor shower is considered to be one of the best displays in the night sky, and this year will peak during 
                                the early hours of Friday. Long, glowing arcs of white, yellow, blue, red and green will streak across the Rivne sky. 
                                You should be able to catch as many as 120 shooting stars an hour over the next night or so.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary className="event-page__faq-title" expandIcon={<ExpandMore />}>
                            {/* @todo take data from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/5.jpg" className="avatar  event-page__avatar" />
                                <Typography>Lorem ipsum dolor sit amet, will there be a comet?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="event-page__faq-answer">
                                {/* @todo take data from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/6.jpg" className="avatar  event-page__avatar" />
                                <Typography className="event-page__faq-text">
                                    Lorem ipsum bro, you mean to view C/Schmidt (1862 N1) too?
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid className="event-page__section" item xs={12} md={6}>
                        <Typography className="event-page__desktop-subtitle" variant="h5">
                            Members
                        </Typography>
                        <List className="event-page__users-list">   
                            {
                                this.state.users.length > 0 &&
                                this.state.users.map((user, idx) => {
                                    return (<ListItem key={idx} className="event-page__users-list-item">
                                        <ListItemAvatar>
                                        <Avatar>
                                            {/* @todo take data from db */}
                                            <Avatar alt="" src={user.image} />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.name}
                                            secondary={user.joined}
                                        />
                                    </ListItem>)
                                })
                            }   
                        </List>
                    </Grid>
                    <Grid className="event-page__section" item xs={12}>
                        <h1>Here we will have gallery</h1>
                    </Grid>
                </Swiper>

            </div>
        );
    }
}

export default EventPage;