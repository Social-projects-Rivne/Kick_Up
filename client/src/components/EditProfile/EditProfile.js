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
import { Person } from '@material-ui/icons';

const swiperParams = {
    modules: [ Pagination, Navigation ],
    slidesPerView: 1,
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
    spaceBetween: 0,
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
    },
    breakpointsInverse: true,
    breakpoints: {
        768: {
            spaceBetween: 32
        },
        1168: {
            autoHeight: false,
            noSwipingClass: 'swiper-container'
        }
    }
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            firstName: '',
            lastName: '',
        };

        this.handleSlider = this.handleSlider.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }
    handleSlider(instance) {
        if (instance) {
            instance.on('slideChangeTransitionEnd', () => {
                this.setState({ activeSlide: instance.activeIndex });
                console.log(this.state);
            });
        }
    }
    updateInputValue(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        });
    }
    render() {
        return (
            <div className="edit-profile">
                <form className="edit-profile__form-wrapper">
                    <Swiper {...swiperParams} getSwiper={this.handleSlider} >
                        <div key={1} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <Person fontSize="large" />
                                        What is your first name?
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <TextField
                                        value={this.state.firstName}
                                        onChange={this.updateInputValue}
                                        className="input"
                                        name="firstName"
                                        label="Enter first name, min. 3 letters"
                                        type="text"
                                        margin="normal"
                                        minLength="3"
                                        autoComplete="on"
                                    />
                                </div>
                            </Grid>
                        </div>
                        <div key={2} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <Person fontSize="large" />
                                        What is your last name?
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <TextField
                                        value={this.state.lastName}
                                        onChange={this.updateInputValue}
                                        className="input"
                                        name="lastName"
                                        label="Enter last name, min. 3 letters"
                                        type="text"
                                        margin="normal"
                                        minLength="3"
                                        autoComplete="on"
                                    />
                                </div>
                            </Grid>
                        </div>
                    </Swiper>
                </form>
                <aside className="edit-profile__animation-wrapper">
                    Here will go animations
                </aside>
            </div>
        )
    }
};

export default EditProfile;