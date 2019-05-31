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
import Gallery from 'react-grid-gallery';
import "react-id-swiper/src/styles/scss/swiper.scss";
import axios from 'axios';
import { withSnackbar } from 'notistack';
import ImageUploader from "../ImageUploader/ImageUploader";

// @temp, we need add get data from MongoDB;
import mock from '../../mocks/eventPage';

// Swipers params for event page;
const userParams = {
    modules: [Pagination, Autoplay],
    slidesPerView: 2,
    slidesPerColumn: 3,
    containerClass: 'swiper-container  event-page__users-swiper',
    rebuildOnUpdate: true,
    shouldSwiperUpdate: true,
    nested: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },
    simulateTouch: false,
    breakpointsInverse: true,
    breakpoints: {
        768: {
            slidesPerView: 3,
            slidesPerColumn: 2
        },
        1168: {
            slidesPerView: 2,
            slidesPerColumn: 2
        }
    },
    pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
    }
};
const tabsParams = {
    modules: [Pagination],
    slidesPerView: 1,
    loop: false,
    centeredSlides: true,
    autoHeight: true,
    spaceBetween: 0,
    rebuildOnUpdate: true,
    shouldSwiperUpdate: true,
    noSwipingClass: 'event-page__users-swiper',
    containerClass: 'swiper-container  event-page__tabs-swiper',
    breakpointsInverse: true,
    breakpoints: {
        768: {
            noSwipingClass: 'swiper-container'
        }
    },
    on: {
        slideChangeTransitionEnd: function() {
            window.dispatchEvent(new Event('resize'));
        },
        resize: function() {
            this.update();   
        }
    }
};
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};
let swiperInstance;

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            cover: '',
            location: '',
            date: '',
            description: '',
            users: [],
            swiper: null,
            activeSlide: 0,
            gallery: [],
            showUpload: false
        };
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
    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
    }
    componentDidMount = () => {
        const timeOptions = {
            hour12: false,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric', 
            minute: '2-digit',
        };
        const { id } = this.props.match.params;

        // Get data of  event;
        axios
        .get('/api/event/' + id)
        .then(res => {
            res = res.data;
            res.users = mock.users;
            res.gallery = mock.gallery;

            this.setState({
                title: res.title,
                cover: res.cover,
                location: res.location,
                date: new Date(res.start_date).toLocaleString('en-US', timeOptions),
                description: res.description,
                users: mock.users,
                gallery: mock.gallery
            });
        })
        .catch((err) => {
            const data = err.response.data.error.errors;
            let res = [];

            // Retrieve all errors;
            Object.values(data).forEach((el) => {
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
        });
    }

    showUploadComponent = () => {
        this.setState({showUpload: true})
    }

    closeUploadComponent = () => {
        this.setState({showUpload: false})
    }

    render() {
        return (
            <div className={!this.state.title ? 'event-page  event-page_loading' : 'event-page'}>
                <ImageUploader 
                    show={this.state.showUpload}
                    closeUploadComponent={this.closeUploadComponent} 
                    entityURL={this.props.match.url}
                    isAuthenticated={this.props.isAuthenticated}
                />
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
                        <div className="event-page__title-desktop-wrapper">
                            <Typography variant="h5" className="event-page__title">
                                {this.state.title}
                            </Typography>
                            <List>
                                <ListItem className="event-page__list-item">
                                    <ListItemIcon>
                                        <DateRange />
                                    </ListItemIcon>
                                    {/* @todo, display via moment.js; */}
                                    <ListItemText className="event-page__list-item-text" primary={this.state.date} />
                                </ListItem>
                                <ListItem className="event-page__list-item">
                                    <ListItemIcon>
                                        <LocationOn />
                                    </ListItemIcon>
                                    {/* @todo, display from DB; */}
                                    <ListItemText className="event-page__list-item-text" primary={this.state.location}/>
                                </ListItem>
                            </List>
                            <Paper elevation={1} className="event-page__main-details-wrapper">
                                {
                                    this.state.description &&
                                    <Typography id="event-page-main-info" component="p" className="event-page__main-details">
                                        {this.state.description}
                                    </Typography>
                                }
                            </Paper>
                        </div>
                    }
                    <Fab className="event-page__fab" variant="extended" color="primary">
                        <Add />
                        <span className="event-page__fab-text">Join now</span>
                    </Fab>
                    {
                        this.state.cover &&
                        <div style={{ backgroundImage: `url(${this.state.cover})` }} className="event-page__img-wrapper"></div>
                    }
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
                    <Grid className="event-page__section" item xs={12}>
                        <Typography className="event-page__desktop-subtitle" variant="h5">
                            Gallery
                        </Typography>
                        <Fab className="event-page__fab  event-page__fab_upload" variant="extended" color="primary">
                            {/* <input
                                accept="image/*"
                                id="event-page-upload-images"
                                multiple
                                type="file"
                            /> */}
                            {/* <label htmlFor="event-page-upload-images"> */}
                                <Add />
                                <span 
                                    className="event-page__fab-text" 
                                    onClick={this.showUploadComponent}
                                >
                                    Upload
                                </span>
                            {/* </label> */}
                        </Fab>
                        <Gallery images={this.state.gallery} backdropClosesModal={true} />
                    </Grid>
                    <Grid className="event-page__section" item xs={12} md={6}>
                        <Typography className="event-page__desktop-subtitle" variant="h5">
                            Members
                        </Typography>
                        {
                            this.state.users.length > 0 &&
                            <Swiper {...userParams}>
                                {this.state.users.map((user, idx) => 
                                    <ListItem key={idx} className="event-page__users-list-item">
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
                                    </ListItem>
                                )}
                            </Swiper>
                        }
                    </Grid>
                </Swiper>
            </div>
        );
    }
}

export default withSnackbar(EventPage);