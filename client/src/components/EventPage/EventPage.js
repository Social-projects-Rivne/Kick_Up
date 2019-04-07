import React, { Component } from "react";

import { 
    Typography, 
    Grid, 
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Avatar,
    Fab
} from '@material-ui/core';
import {
    Add,
    DateRange, 
    LocationOn,
    ExpandMore
} from '@material-ui/icons';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Autoplay } from 'swiper/dist/js/swiper.esm';
import "react-id-swiper/src/styles/scss/swiper.scss";

// Global constants;
const tabletWidth = 768;

// Swipers params for event page;
const galleryParams = {
    modules: [Pagination, Autoplay],
    effect: 'slide',
    slidesPerView: 'auto',
    centeredSlides: false,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    spaceBetween: 16,
    autoplay: true
};

const tabsParams = {
    modules: [Pagination],
    slidesPerView: 'auto',
    loop: false,
    pagination: {
      el: ".event-page__section-pagination",
      type: "bullets",
      clickable: true
    },
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
} 

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventTitle: 'Meteor shower gathering',
            // @todo, pass images from server;
            images: [
                'http://dennisradai.com/projects/kick/ms1.jpg',
                'http://dennisradai.com/projects/kick/ms2.jpg',
                'http://dennisradai.com/projects/kick/ms3.jpg'
            ]
        };
        //this.submitHandler = this.submitHandler.bind(this);
    }
    render() {
        return (
            <main className="event-page">
                <Swiper {...galleryParams} >
                {this.state.images.map((slide, idx) => 
                    <div key={idx}>
                        <img src={slide} alt="" />
                    </div>
                )}
                </Swiper>
                <div className="event-page__title-wrapper">
                    <Typography variant="h5" className="event-page__title">
                        Meteor shower in Rivne!
                    </Typography>
                    <Fab className="event-page__fab" variant="extended" color="primary">
                        <Add />
                        <span className="event-page__fab-text">Join now</span>
                    </Fab>
                </div>
                <Swiper {...tabsParams} >
                    <Grid className="event-page__section" item xs={12}>
                        <div className="event-page__info-wrapper">
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
                                <Typography component="p" className="event-page__main-details">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nullam a neque lacus. Donec tristique eros nisi, a feugiat 
                                    nisi congue vitae. Nullam sodales tempor elementum. Nullam 
                                    volutpat euismod mauris id commodo. Praesent vitae lacus purus. 
                                    Proin congue finibus risus, eu lacinia tellus. Donec eget sem 
                                    nec diam suscipit dapibus. Fusce a rhoncus libero, sed tristique 
                                    nisl. Maecenas turpis elit, vulputate eget magna vitae, volutpat pulvinar 
                                    nibh. Praesent pellentesque quis leo at maximus.
                                </Typography>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid className="event-page__section" item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary className="event-page__faq-title" expandIcon={<ExpandMore />}>
                                {/* @todo take avatar from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam nulla, commodo eu sodales eu?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="event-page__faq-answer">
                                {/* @todo take avatar from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                <Typography className="event-page__faq-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary className="event-page__faq-title" expandIcon={<ExpandMore />}>
                                {/* @todo take avatar from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam nulla, commodo eu sodales eu?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="event-page__faq-answer">
                                {/* @todo take avatar from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                <Typography className="event-page__faq-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary className="event-page__faq-title" expandIcon={<ExpandMore />}>
                            {/* @todo take avatar from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam nulla, commodo eu sodales eu?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="event-page__faq-answer">
                                {/* @todo take avatar from db */}
                                <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                <Typography className="event-page__faq-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid className="event-page__section" item xs={12} md={6}>
                        <List className="event-page__users-list">
                            <ListItem className="event-page__users-list-item">
                                <ListItemAvatar>
                                <Avatar>
                                    {/* @todo take avatar from db */}
                                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Ramon Good"
                                    secondary='joined 2 days ago'
                                />
                            </ListItem>

                            <ListItem className="event-page__users-list-item">
                                <ListItemAvatar>
                                <Avatar>
                                    {/* @todo take avatar from db */}
                                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Heath Meadows"
                                    secondary='joined 2 days ago'
                                />
                            </ListItem>

                            <ListItem className="event-page__users-list-item">
                                <ListItemAvatar>
                                <Avatar>
                                    {/* @todo take avatar from db */}
                                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Penelope Ellison"
                                    secondary='joined 2 days ago'
                                />
                            </ListItem>

                            <ListItem className="event-page__users-list-item">
                                <ListItemAvatar>
                                <Avatar>
                                    {/* @todo take avatar from db */}
                                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Mauricio Hawkins"
                                    secondary='joined 2 days ago'
                                />
                            </ListItem>

                            <ListItem className="event-page__users-list-item">
                                <ListItemAvatar>
                                <Avatar>
                                    {/* @todo take avatar from db */}
                                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Davion Dennis"
                                    secondary='joined 2 days ago'
                                />
                            </ListItem>

                            <ListItem className="event-page__users-list-item">
                                <ListItemAvatar>
                                <Avatar>
                                    {/* @todo take avatar from db */}
                                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Remington Dalton"
                                    secondary='joined 2 days ago'
                                />
                            </ListItem>

                            <ListItem className="event-page__users-list-item">
                                <ListItemAvatar>
                                <Avatar>
                                    {/* @todo take avatar from db */}
                                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/1.jpg" className="avatar  event-page__avatar" />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Sage Gates"
                                    secondary='joined 2 days ago'
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Swiper>
            </main>
        );
    }
}

export default EventPage;