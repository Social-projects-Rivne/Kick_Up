import React, { Component } from "react";
import { Link } from 'react-router-dom';

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
    ExpandMore,
    Edit
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
import defaultAvatar from "../../assets/images/face.png";

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
            authUser:  false,
            userCount: 0,
            showUpload: false,
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
    join = () => {
        const eventId = this.props.match.params.id;
        axios.post(`http://localhost:3001/api/member/event/join`, { entity_id:eventId })
        .then((res) => {
            this.roomMembers()
            this.setState({ authUser :!this.state.authUser, userCount:res.data });
          })
    };
    leave = () => {
        console.log(this.state.authUser)
        const eventId = this.props.match.params.id;
        axios.delete(`http://localhost:3001/api/member/event/${eventId}`)
        .then((res) => {
            this.roomMembers();
            this.setState({ authUser :!this.state.authUser, userCount:res.data });
          })
          .catch(err => {
            console.log(err);
          });
    }
    roomMembers = () => {
        const { id } = this.props.match.params;
        axios
        .get(`/api/member/event/${id}/members`)
        .then((res) => {
            
            const users = res.data.map( i => i.users[0])
            this.setState( {users})
        })
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
        //check invite
        axios
        .get(`/api/member/event/${id}`)
        .then((res) => {
            if(res.data.invite){
                this.setState({authUser:  true})
              }
              this.setState({userCount: res.data.count})
              this.roomMembers();
        }).catch(()=>{
            this.setState({authUser:  false})
        })
        // Get data of  event;
        axios
        .get('/api/event/' + id)
        .then(res => {
            res = res.data;
            let gallery = [];
            [...res.media].map(e => {
                gallery.push({src:e.key.slice(6), thumbnail:e.key.slice(6)})
            });

            this.setState({
                title: res.title,
                cover: res.cover,
                location: res.location,
                date: new Date(res.start_date).toLocaleString('en-US', timeOptions),
                description: res.description,
                gallery,
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

    getImagesSRC = (src) => {
        const gallery = [...this.state.gallery].concat(src);
        this.setState({gallery});
    }

    render() {
        // const stateUser = this.props.user;
        // const eventId = this.props.match.params.id;
        //
        // if(stateUser){
        //     const checkInvite = stateUser.invited.find(event => event.entity_type === 'event' && event.entity_id === +eventId);
        //     //TO DO
        // }

        const joinBtn = (
            <Fab className="event-page__fab" variant="extended" color="primary" onClick={this.join}>
                        <span className="event-page__fab-text">Join now</span>
           </Fab>
        );
        const leaveBtn = (
            <Fab className="event-page__fab" variant="extended" color="primary" onClick={this.leave}>
                        <span className="event-page__fab-text">Leave now</span>
           </Fab>
        );
        const renderBtn = this.state.authUser ? leaveBtn : joinBtn;
        return (
            <div className={!this.state.title ? 'event-page  event-page_loading' : 'event-page'}>
                <ImageUploader 
                    show={this.state.showUpload}
                    closeUploadComponent={this.closeUploadComponent} 
                    entityURL={this.props.match.url}
                    authUser={this.state.authUser}
                    isAuthenticated={this.props.isAuthenticated}
                    getImagesSRC={this.getImagesSRC}
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
                    {renderBtn}
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
                            <Add />
                            <span 
                                className="event-page__fab-text" 
                                onClick={this.showUploadComponent}
                            >
                                Upload
                            </span>
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
                                    <Link to={'/profile/' + user.id} className="event-page__member_link">
                                        <ListItem key={idx} className="event-page__users-list-item">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Avatar alt="" src={user.avatar ? user.avatar : defaultAvatar} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${user.first_name || ""} ${user.last_name || ""}`}
                                            />
                                        </ListItem>
                                    </Link>
                                )}
                            </Swiper>
                        }
                    </Grid>
                </Swiper>
                <Link to={this.props.location.pathname + "/edit"} className="event-page__edit-link">
                    <Fab variant="extended" className="event-page__edit-event">
                        <Edit />
                    </Fab>
                </Link>
            </div>
        );
    }
}

export default withSnackbar(EventPage);