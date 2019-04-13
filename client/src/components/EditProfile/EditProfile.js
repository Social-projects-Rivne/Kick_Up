import React, { Component } from "react";

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import "react-id-swiper/src/styles/scss/swiper.scss";

import {
    Grid,
    Typography,
    TextField,
    Button
} from '@material-ui/core';
import { Person, Email } from '@material-ui/icons';

const swiperParams = {
    modules: [ Pagination, Navigation ],
    slidesPerView: '1',
    loop: false,
    pagination: {
    el: ".edit-profile__form-pagination",
    type: 'progressbar',
    clickable: true
    },
    navigation: {
        prevEl: '.edit-profile__form-prev',
        nextEl: '.edit-profile__form-next',
    },
    centeredSlides: true,
    autoHeight: true,
    spaceBetween: 30,
    rebuildOnUpdate: false,
    shouldSwiperUpdate: false,
    renderPrevButton: () => {
        return (
            <Button variant="outlined" color="primary" className="edit-profile__form-prev">
                Previous
            </Button>
        );
    },
    renderNextButton: () => {
        return (
            <Button variant="outlined" color="primary" className="edit-profile__form-next">
                Next
            </Button>
        );
    }
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
        };

        this.handleSlider = this.handleSlider.bind(this);
    }
    handleSlider(instance) {
        if (instance) {
            instance.on('slideChangeTransitionEnd', () => {
                this.setState({ activeSlide: instance.activeIndex });
                console.log(this.state);
            });
        }
    }
    render() {
        return (
            <div className="edit-profile">
                <form className="edit-profile__form-wrapper">
                    <Swiper {...swiperParams} getSwiper={this.handleSlider} >
                        <div key={1} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="register__form">
                                <Typography align="center" variant="h4">
                                    <Person fontSize="large" />
                                        What is your first name?
                                </Typography>
                                <hr />
                                <div className="register__field-wrapper">
                                    <Email />
                                    <TextField
                                        //svalue={this.state.email}
                                        //onChange={this.updateInputValue}
                                        required
                                        //error={!this.state.emailInputValid}
                                        className="input"
                                        name="email"
                                        label="Your email"
                                        type="email"
                                        margin="normal"
                                        autoComplete="off"
                                    />
                                </div>
                            </Grid>
                        </div>
                        <div key={2} className="swiper-slide">
                            222
                        </div>
                    </Swiper>
                </form>
            </div>
        )
    }
};

export default EditProfile;