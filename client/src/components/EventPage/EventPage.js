import React, { Component } from "react";

import { Typography, Grid, Paper } from '@material-ui/core';
import SwiperInstance from '../Swiper/Swiper';

// Swiper params for event page;
const swiperParams = {
    pagination: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    shouldSwiperUpdate: true,
    rebuildOnUpdate: true
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
                <SwiperInstance
                    params={swiperParams}
                    slides={this.state.images}
                 />
                <Grid container spacing={12}>
                    <Grid item xs={3}>
                        Date
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="event-page__title" variant="h3">
                            {this.state.eventTitle}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        Join
                    </Grid>
                    <section className="event-page__main-details">
                        <Paper elevation={1}>
                            <Typography component="p" className="event-page__main-details-inner">
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
                        <Paper elevation={1}>
                        <Typography component="p" className="event-page__main-details-inner">
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
                    </section>
                </Grid>
            </main>
        );
    }
}

export default EventPage;