import React, { Component } from "react";

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import 'react-id-swiper/src/styles/scss/swiper.scss';
import kute from 'kute.js';
import 'kute.js/kute-svg';

import {
    Grid,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio
} from '@material-ui/core';
import { 
    Person, 
    DateRange,
    SentimentSatisfied,
    People,
    Image
} from '@material-ui/icons';

const swiperParams = {
    modules: [ Pagination, Navigation ],
    slidesPerView: 1,
    loop: false,
    spaceBetween: 16,
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
            birthDate: '',
            gender: ''
        };

        this.handleSlider = this.handleSlider.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleSvg = this.handleSvg.bind(this);
    }
    handleSvg() {
        const firstTween = kute.fromTo(
            '#at-pc', 
            {path: '#at-pc' }, 
            { path: '#skiing' },
            {
                duration: 800,
                morphPrecision: 7,
            }
        );
        const secondTween = kute.fromTo(
            '#at-pc', 
            {path: '#skiing' }, 
            { path: '#hiking' },
            {
                duration: 800,
                morphPrecision: 7,
            }
        );
        window.setTimeout(() => {
            firstTween.start();
        }, 4000);

        window.setTimeout(() => {
            secondTween.start();
        }, 8000);
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
    componentDidMount() {
        this.handleSvg();
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
                                    <SentimentSatisfied fontSize="large" />
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
                        <div key={3} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <DateRange fontSize="large" />
                                        Choose your birth day:
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <TextField
                                        value={this.state.birthDate}
                                        onChange={this.updateInputValue}
                                        className="input  edit-profile__date-picker"
                                        name="birthDate"
                                        label=" "
                                        type="date"
                                        margin="normal"
                                        required
                                    />
                                </div>
                            </Grid>
                        </div>
                        <div key={4} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <People fontSize="large" />
                                    Choose your gender:
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender"
                                        onChange={this.updateInputValue}
                                        className="input"
                                        value={this.state.gender}
                                        className="edit-profile__gender"
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            value="female"
                                            label="Female"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            value="male"
                                            label="Male"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </div>
                            </Grid>
                        </div>
                        <div key={5} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <Image fontSize="large" />
                                    Upload your avatar:
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <input
                                        accept="image/*"
                                        id="outlined-button-file"
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor="outlined-button-file">
                                        <Button variant="outlined" component="span">
                                            Click to choose file
                                        </Button>
                                    </label>
                                </div>
                            </Grid>
                        </div>
                    </Swiper>
                </form>
                <aside className="edit-profile__animation-wrapper">
                    <svg id="morph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440">
                        <path id="at-pc" xmlns="http://www.w3.org/2000/svg" d="M315.27.83c-2.86.85-19.8,8.79-27.22,12.71A14.19,14.19,0,0,0,279.9,25c-.42,3.28-.11,5.19,1.38,7.31,1.59,2.44,1.91,4.66,1.59,12.71-.32,8.47,0,10.38,1.91,13.66,2.75,4.55,2.75,7.52.42,14.83-1.59,4.55-2.44,5.61-4.77,6.14a6.62,6.62,0,0,0-4,2.75,33.61,33.61,0,0,1-5.4,6.35c-2.22,2.22-4.13,4.34-4.13,4.66a54.45,54.45,0,0,1-3.39,7.73c-2.65,5.61-3.39,8.68-3.71,15.57-.42,7.94-1,9.64-6.78,21.5a202,202,0,0,1-13.13,23c-6.35,9.43-11.12,20-11.12,25,0,3.18-2.65,3.71-11.54,2.22-17.16-2.86-15.36-3.18-19.8,3.49-3.92,5.93-4.77,9.74-3.28,14.09l.85,2.44H161.29c-18.53,0-34.63.32-35.8.53-1.91.53-5.3-5.51-27.85-49.14-14.19-27.32-26.37-50-27-50.2-2.22-.74-5,1.38-5,3.81,0,1.27,11.65,25,25.84,52.63l25.84,50.3-13.24.32c-7.2.11-19,.11-26.05,0l-12.92-.32,4.77-2.65L74.66,211l-7.31-.53c-7.52-.53-9.85-2.12-6.14-4.13,2.65-1.38,5.3-8,6.46-15.78a55,55,0,0,1,1.69-7.94c.74-1.69-.64-1.8-19-1.8-13.66,0-19.7.32-19.7,1.16s-1,1-2.44.53a5.9,5.9,0,0,0-7.1,5.72c0,2.12,1.06,3.81,3.49,5.82,1.8,1.48,6.35,5.19,10.06,8.15s6.46,5.93,6.25,6.57-3.39,1.38-7.2,1.69L27,211l4,2c2.12,1.16,3.92,2.44,3.92,3s-7.84.85-17.47.85H0V231.7H45.43c25.1,0,45.75.32,46.07.85.42.74-21.18,75.4-42.68,146.89l-7,23.3-6.57.32-6.67.32v14.72h4.24c2.33,0,4.24.32,4.24.64,0,.64-13.66,47.66-17.79,61.32l-1.91,6.35-8.15.32L1.06,487v16.84H243.58V492.22h6.67c8.58,0,24.57-2.44,37.49-5.72,9.11-2.33,10.48-2.54,11.54-1.16a121.49,121.49,0,0,1,5.19,12.6c2.12,6.14,4.77,11.86,5.82,12.81,1.8,1.59,1.69,1.8-1.16,4.77-3.49,3.49-4.13,8.68-1.38,12.5,1.38,2,2.54,2.33,9.53,2.33s8.26-.32,10.7-2.75c2.22-2.22,2.54-3.39,2.12-6.57-.64-3.92-4.77-8.68-7.62-8.68-1.06,0-1.16-.64-.32-3,1.06-2.65.42-5.51-3.92-19.38-7.52-24.15-7.1-22.45-5-21.82a31.83,31.83,0,0,1,3.39,1.16c2.33,1,15.14-10.7,14.51-13.24s-.74-2.54,27.32.11c32.3,3.07,43.95,4.45,43.95,5.3,0,.42-1,1.59-2.12,2.65-3,2.65-3,10.91.11,14.72,2.65,3.28,6.57,3.6,9.11.64a7.2,7.2,0,0,1,5.08-2.12c4.34,0,5.82-1.69,5.82-6.67a8.85,8.85,0,0,0-3.07-7.2c-1.69-1.69-3.92-3.07-4.77-3.07-1.27,0-1.59-.64-1.06-2.65,1-3.71-.32-7.62-2.65-9-1.06-.53-10.48-2.22-20.86-3.71-25.2-3.49-53.69-8.47-60.47-10.59-3.28-1-5.61-2.33-5.61-3.18s2.22-3.39,4.87-5.72l5-4.34,1.69,3.39A9.69,9.69,0,0,0,338,429.1c2.54.85,3.71.53,7.31-2.12,2.44-1.69,4.77-4,5.3-5.3,1.06-3.18-1.16-7-5.08-8.79-2.65-1.16-3.28-2.12-3.28-4.45.11-3.81-1.91-6.25-5.19-6.25s-5.93,1.38-11.44,5.82c-5.08,4.13-10.8,7.2-12.07,6.46-.53-.32-2.86-3.81-5.19-7.73-4.13-7-4.24-7.52-4.87-19.38-.74-16.94-1-25.1-.85-30.92l.21-5,22.56-.53c22.24-.53,62.48-2.22,62.91-2.54a41.74,41.74,0,0,0,2.86-5.4c3-5.72,7.41-7.84,9.74-4.55,1.8,2.44,4.66.85,4.66-2.86,0-3.07-2.54-5.19-3.71-3.28-1.06,1.69-2.65,1.16-2.65-.85,0-3.92,8.58-24,11.12-26.16,4.13-3.39,7.52-15.25,4.87-16.84-2-1.27-4.13.64-5.3,4.87l-1.38,4.34-2.75-2.86L403,292.06l4.55-13.13c5.72-16.94,5.82-23.3.74-54l-3.6-22.13,2.54-1.91c3.18-2.65,4.13-7.1,2.65-12.39-1.27-4-1.16-4.34,12.5-32.09,18.74-38.23,20.76-44.59,14.4-47.34a43.29,43.29,0,0,0-9.43-1.91c-8.15-.85-8.9-.32-15.67,9.53-3.71,5.51-4.34,6-5.08,4.24a13.69,13.69,0,0,1-.85-4.24c-.11-3.39-6-14.4-9.53-17.79-1.8-1.69-6.67-4.77-10.91-6.88C376.8,87.77,373.2,83.64,372,76.76c-.74-4.77-1.91-5.51-6.14-3.92-1.59.64-3.18.85-3.49.53s-.53-9.32-.32-19.91c.11-14.61-.21-20.76-1.38-25.42-3.49-12.71-9.85-21.5-18.64-25.42C336.77.19,320.57-.87,315.27.83Zm6.67,100c0,.32-2.86,2.54-6.35,5s-6,4.87-5.61,5.51-.21,1.69-1.38,2.54c-1.69,1.16-1.8,1.91-.74,4.66,1.16,3.07,1,3.49-4.24,9.11-3.07,3.28-7.84,8-10.59,10.8s-7.73,7.52-11.12,10.7c-6.46,6.25-13.87,12.07-14.51,11.44-.21-.21.74-2.65,2.22-5.51,6.35-12.6,11.86-20.76,19-28.17a59.77,59.77,0,0,0,11.12-15.14c3.39-7,3.49-7.1,7.84-7.2,3.6,0,6.35-.85,14.19-4C321.84,100.38,321.94,100.59,321.94,100.8ZM260.1,222.27c3.39,1.16,10,3,14.4,4.13a72.67,72.67,0,0,1,9.11,2.54c.53.32,1.27,3.81,1.59,7.73s.85,7.94,1.27,8.9c.53,1.38-.74,2-6,3.39-3.71,1-11.23,3-16.73,4.45-9,2.44-28.38,6.14-84.19,16.31-21.92,3.92-28.06,5.72-32.3,9.32-6.35,5.3-8.37,11.76-16.52,53.27-2.65,13.66-6.35,31.77-8.37,40.24s-3.81,17.47-4.24,20.12-.85,6-1.16,7.62l-.64,3h-29c-16,0-29-.32-29-.64s7.41-26.05,16.52-57,17.37-59.09,18.32-62.59,4.87-16.52,8.58-28.91l6.67-22.45h136.3l.64-2.65a21.18,21.18,0,0,0,.21-5.82c-.42-3.07-.32-3.18,3.92-3.18A38.57,38.57,0,0,1,260.1,222.27Zm145.09,26.58c1.8,10.06,1.8,10.38-.42,15.36-1.16,2.75-3.18,8.68-4.45,13-2.86,9.64-4.66,13.34-7,14.19-1.59.64-1.69-.53-1.27-14.09l.53-14.83,4-6.67c3.6-5.93,4.13-7.62,4.55-15.67C401.79,230.11,401.9,230.32,405.18,248.85Zm-124,96.8c.53,3,1.38,4.13,3.81,5l3.07,1.16v25.42l-5.61-9c-3.18-5-8.15-12.71-11.12-17.16a79.49,79.49,0,0,1-5.51-8.68c0-.32,3.28-.53,7.31-.53h7.31Zm-78.37,21.6c5.08,11.33,10.91,23.83,12.81,27.75a69.44,69.44,0,0,1,3.6,7.73c0,.32-7.2.53-16,.53-14,0-15.89-.21-15.36-1.59.32-1,1.06-11.33,1.69-23.09,1.27-25.42,2-34.1,3.18-32.83C193.17,346.18,197.72,355.92,202.8,367.25Zm-89.49,52.32c0,.32-1.38,4.34-3.18,9l-3.07,8.58,2.33.42c1.27.32,4.45.85,7.1,1.16a44.25,44.25,0,0,1,10.38,3.18l5.72,2.65L127.51,451c-5.72,7.2-10.38,11.23-17.05,14.61-3.71,1.8-6.35,2.22-15.67,2.22-9.85,0-11.33.21-13.34,2.22a6.06,6.06,0,0,0-1.8,4.45c.74,5.19,12.07,7.41,35.69,6.88l17.58-.32,9.43-4.77c5.3-2.65,10-5,10.38-5.08s.85,2,.85,4.87c0,3.28.53,5.51,1.38,5.82a72.3,72.3,0,0,0,10.8-.11c7.62-.42,10.27-.11,13,1.27,1.91,1,3.39,2.22,3.39,2.75s-26.79,1.06-74.24,1.06c-70.11,0-74.13-.11-73.71-1.91.32-1,4.77-16.2,9.85-33.89l9.21-32H83.35C99.76,419.14,113.32,419.36,113.32,419.57Zm108.55,4.34c0,6.25,3,9.43,8.79,9.21,3.92-.21,4.24.11,7,5l2.75,5.19-6.57,2.22c-3.71,1.16-13.13,3.81-21,5.82s-17.16,4.66-20.55,5.93-6.46,2.12-6.67,2.12a6.75,6.75,0,0,1-.32-2.54,16.84,16.84,0,0,0-1.06-5.4c-.74-1.91-.53-4.45.53-8.68a74.81,74.81,0,0,0,1.59-14.83v-8.79h35.48ZM255,463.83c2.44,1.38,4.45,3,4.45,3.71,0,1.8-2.86,4.34-7.84,6.88-6,3.07-12.07,7.94-12.81,10.38-.64,2-1.69,2.12-17.58,2.12H204.29l1.59-2.33c2.33-3.28,2.12-8.9-.32-11.33-2.12-2.12-2-2.12,7.62-4.34,12-2.75,33.57-7.2,35.69-7.31C249.72,461.5,252.47,462.56,255,463.83Z"/>
                        <path id="skiing" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M307.43,2.52a50.52,50.52,0,0,0-9,6.61c-5.32,5-8.66,11.66-8.66,17.32,0,3.41,3.34,11.8,4.77,11.8,1.23,0,.75,2.39-.75,3.41a18.06,18.06,0,0,0-3.34,3.82l-1.91,2.73-4.7-.48c-9.34-1.09-12.89-.75-20.39,1.7-14.93,5-29.73,12.75-35.18,18.34-6.14,6.34-11.39,22.7-13.16,41.18-.48,4.77-.48,5,1,5,1.77,0,1.91,1.91.41,6.2A39.88,39.88,0,0,0,215,128l-.41,5-4.3,2.39c-2.32,1.3-4.36,2.39-4.5,2.39-.34,0,1.23-10.23,3.82-25.57,2.45-14.66,3.14-20.8,3.14-29.18V75.61l-2.32-2.32A10.83,10.83,0,0,0,206,70.57c-1.36-.27-2-.75-1.7-1.36s1.64-.82,5.86-.48c5.11.34,5.8.2,8-1.3,4.77-3.27,7-8,8.18-17.59a60.21,60.21,0,0,1,1.5-8,12.13,12.13,0,0,0,0-6.82c-1-4.64-6.2-13.64-9.89-17-2.32-2.11-2.93-2.32-6.61-2.32-3.2,0-4.36.27-5.45,1.36a4.51,4.51,0,0,0-1.36,2c0,.34-2.11,2-4.77,3.82-5.73,3.75-7.5,5.86-7.5,8.93a26,26,0,0,1-1.43,6.55,15,15,0,0,0-1,6.82c.48,2.8,4,10.3,5.18,11s.75,1.7-1,2.39A9.91,9.91,0,0,0,190.43,62l-1.91,2.66-8.18-.34c-7.36-.27-8.73-.14-14.11,1.43-13.91,4.09-31.36,13-37.5,19-5.25,5.25-10.3,17-13.7,32.39l-1.57,7L69.34,91.09C45.07,72.89,24.89,58,24.55,58a.76.76,0,0,0-.68.82c.07.48,20.11,15.89,44.66,34.3l44.66,33.41-.41,2.18c-.41,2.18-.34,2.25,2.39,2.66,3.07.48,3.41,1.36,1.91,5.59l-.82,2.18-57.41-43c-31.57-23.59-57.75-43-58.16-43S0,53.86,0,54.61c0,1.09,14.11,11.93,57,44,31.36,23.45,57.41,42.82,57.82,43s.68,1.91.55,5c-.2,4.36-.14,4.84,1.36,5.8a16.37,16.37,0,0,0,5.8,1.5c3.82.41,4.23.34,5-1l.75-1.5,2.66,2.11c2.45,1.91,4.09,2.25,4.09.75,0-.34-1.23-1.43-2.73-2.45-2.32-1.64-2.73-2.25-2.73-4.36a7.5,7.5,0,0,0-2-5c-2-2.45-4.43-7.23-3.89-7.77.14-.14,3.48,2.11,7.43,5l7.23,5.25-.34,3.55c-.68,6.41.68,8,7.57,8.86,2.66.34,3.41.2,4-.68.89-1.7,2.39-1.43,5.45,1,1.84,1.5,2.86,2,3.41,1.43s-.41-1.5-2.86-3.34L152,153.14l.41-3.55c.41-3.41.34-3.68-2.25-6.48-3.89-4.3-4.09-5.32-1-5.32h2.52l1.5-6.75c1.7-7.91,5.86-18.68,9.27-24,2.11-3.34,4.57-6.14,4.57-5.25,0,.2-1.23,8.86-2.73,19.3s-2.73,19.23-2.73,19.5.68.61,1.57.75c1.43.2,1.5.48,1.64,7.36.07,4,.2,8,.34,9.14.2,1.7-.2,2.18-2.52,3.41-15.2,8.18-34.43,19.09-34.43,19.57s-.48.61-1.09.61-9.2,4.5-19.09,10C94.09,199,90,201.61,90,202.64c0,.68.34,1.3.68,1.3s8.8-4.43,18.61-9.89,18.34-9.89,18.75-9.89a.77.77,0,0,0,.82-.68c0-.41.68-1,1.57-1.3s8.8-4.64,17.66-9.55,16.5-8.93,16.91-8.93a.73.73,0,0,0,.68-.68c0-.41.41-.68.89-.68s2.45,4.91,5.11,13.09c7.57,23.52,7.77,24.82,5.93,47.25-.55,6.75-1,12.82-1,13.43,0,1.09-1.77,1.23-24,1.36l-24.07.2-.2,2.52-.2,2.59h48L175.7,247c-.27,2.39-.68,6.82-.89,9.89l-.48,5.66-41.66.14-41.66.2-.2,1.57a1.83,1.83,0,0,0,.75,1.91c.55.2,19.3.55,41.66.82,41.93.55,41.93.55,42,3,0,.34-24.07.55-53.45.55H68.25l-.41,1.43a2.32,2.32,0,0,0,.34,2.25c1.23,1.23,195.75,1.09,202.16-.2,5.11-1,10.57-3.41,13.3-5.8,1.23-1.16,3.27-1.77,7.7-2.39a41.35,41.35,0,0,0,9.55-2.39c5.86-2.59,9.82-7.7,10-12.89l.07-1.84h55.43c58,0,67.57-.34,73.36-2.86,7.64-3.27,10.23-7.23,10.3-15.61,0-4.16-.27-5.59-1.3-6.82-2.11-2.59-3.2-.89-3.68,5.52-.55,8.18-3.14,11.11-12.07,13.5-3,.82-10.7,1.09-40,1.3l-36.27.34-1.91-1.77a31.4,31.4,0,0,0-6.14-3.82,18.42,18.42,0,0,1-4.3-2.52,11,11,0,0,1,1.36-2.32c2.25-3.07,3.14-8.59,2.11-13.09-.89-4.09-2-5.11-3.75-3.27-.75.82-1.09,2.52-1.09,5.8,0,4.77-.89,7.36-3.34,9.55-1.84,1.64-2.18,1.23-2.66-2.73-.2-2.18-.07-3.34.61-3.68,1.7-1.09-5.32-44-8.93-54.55C324.48,160,318.2,150.34,306,137.25a49.3,49.3,0,0,1-5.32-6.14c0-.27.61-2.73,1.36-5.45a42.49,42.49,0,0,0,1.36-6.07,34,34,0,0,1,1.57-6.14l1.5-5,15.07,9.07c11.45,7,15.27,8.93,16.09,8.45s2-.14,4.7,1.43a25.54,25.54,0,0,0,6.27,2.52c1.36.27,2.52.68,2.52,1,0,.75,21.34,110.18,21.55,110.39s.61.14,1.16,0c.75-.14-1.09-10.7-9.75-55.09-7-36-10.43-55-10-55.16,1.3-.48,3.14-2.66,3.14-3.82,0-.55.27-1,.61-1s.82-1.09,1.09-2.45c.27-1.77.14-2.8-.61-3.61a4.14,4.14,0,0,1-1.09-2c0-.68-4-2.18-5.93-2.18-.48,0-1-.68-1.23-1.57C349.43,111.55,343,77.59,343,77c0-.34-.48-.61-1-.61a1.15,1.15,0,0,0-1,1.23c0,.61,1.64,9.55,3.61,19.77,2.25,11.45,3.34,18.55,2.93,18.55a12,12,0,0,0-3.41,2c-2.93,2.18-4,2.59-3.41,1.16.2-.55-1.77-2.32-4.91-4.57-7.91-5.45-16.77-13.09-18.82-16.09-2.52-3.68-3.34-8.8-3.75-23.45-.14-7-.61-13.57-1-14.73-.82-2.73-3.75-5.45-7-6.55-2.25-.82-2.45-1-1.7-2.11s1.36-1.09,4.77-.48c4.5.82,8.18.14,11-2,2.59-2,6.14-9.68,6.48-14,.14-2,.55-3.89.89-4.09.82-.48.75-10.09,0-14.32-1.16-5.93-3.55-11.39-6.2-14.11C317-.82,313.77-.89,307.43,2.52ZM266.73,95c-1.3,12.89-2.59,23.45-2.93,23.59-.89.34-.75,11.93.14,15.55a16.19,16.19,0,0,0,3.89,6.48l3.07,3.41-2.8,10.84c-5.59,21.68-6.82,23.66-29.11,49.3-4.5,5.18-8.32,9.75-8.45,10.09a2.1,2.1,0,0,0,1,1.57c1.09.75,1,1.36-1.3,8.59-1.36,4.23-2.45,8-2.45,8.25s2.25,1.36,4.91,2.45l5,1.91-15.27.2c-8.39.07-15.41,0-15.61-.14s1.16-4.36,2.86-9.27c4.84-13.7,6.55-21.34,6.55-28.77,0-10.64-2.73-23.59-8.8-41.93-4.64-13.84-4.43-15.07,3.82-19.7l4.3-2.39,5.25,1.16c5,1.09,5.25,1.09,6.14-.14a16.73,16.73,0,0,0,1.64-4c.41-1.5.89-3.07,1-3.55s2-1.84,4.3-3.07c2.59-1.43,4.16-2.66,4.16-3.48,0-1.7-1.5-1.43-6.34,1.23l-4.3,2.39-1.84-2.86c-2.11-3.27-3.07-7.3-1.91-8,.41-.27,1.43-2.8,2.18-5.59C229.09,97.09,236,83,240.41,79c3.27-2.86,18.2-7,26.18-7.3l2.45-.07ZM154,92.59c-4.64,4.91-10,18.34-13.16,33.14-2,9.2-2,10.64-.68,11.66.82.68.82,1.09-.2,3.27l-1.16,2.52-6.75-5c-8.11-6.14-7.7-5.73-6.68-6.34.41-.34,1.7-4,2.73-8.39,3.34-13,8.93-24.41,13.7-27.82,1.91-1.36,11.11-4.77,13-4.84C155.39,90.75,155.11,91.36,154,92.59Zm142.77,70c8.8,7.5,13.09,13.43,17.59,24.27,2.73,6.55,6.41,20.73,7.84,30.34,1.5,10.3,1.5,10.36,3.07,10.77,1.16.27,1.36.89,1.36,4.84v4.5l-6.61.14c-3.68,0-20.45,0-37.36-.14l-30.61-.2L249.27,235c-1.43-1.16-4.09-3.41-5.86-5-3.2-2.86-3.27-2.93-2.59-5.59.48-1.7,1.09-2.73,1.77-2.73,1.5,0,22.3-21.2,27.2-27.75s7.16-10.3,15-25c3.2-5.86,6-10.7,6.34-10.7A44.23,44.23,0,0,1,296.73,162.61ZM192.82,246a14.13,14.13,0,0,1-1.23,3.82c-.27.34-.34,3.34-.14,6.68l.34,6.07H189c-3.61,0-4.91-.55-4.91-2.11,0-1.16,4.5-15.89,5.25-17.18.14-.27,1.16-.48,2.18-.48h2Zm112.64-2.39c0,.27-16.77.61-37.3.68l-37.36.2v3.41l12.27.41c6.75.27,23.52.48,37.36.55,24.75.07,25,.07,25,1.43,0,2.11-1.7,5-4.09,7.09-2,1.64-6.27,3.2-11.39,4.09l-2.25.34v-4.23c0-4.84-1.16-7.64-3.07-7.64-1.23,0-1.43.61-1.7,5.25-.27,2.93-.82,5.73-1.23,6.14-.68.68-8.52,1-33.61,1.09l-32.73.2L208,259c-8.59-4.16-8.59-4.16-5.73-11.45l1.7-4.43,50.8-.07C282.61,243.07,305.45,243.27,305.45,243.61Zm-30.34,23.86c-4,2.32-8.8,2.66-41.93,3.07l-33.07.41-1.3-1.5-1.3-1.43,21.75-.07c18.41-.14,52.77-.82,56.18-1.16C276.07,266.73,276,267,275.11,267.48Z"/>
                        <path id="hiking" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M381.88.74c-2.79.81-5.06,3.52-6.09,7.34-.44,1.61-1.25,2.86-1.76,2.86a19.93,19.93,0,0,0-4.55,1.91c-5.36,2.79-7.63,3.38-8.15,2.06a2.9,2.9,0,0,0-2.42-1c-1.17,0-2.28-.44-2.42-1s-.59-.66-1-.07c-1.17,1.61-7.78,4.7-10.13,4.7a5.05,5.05,0,0,1-3.3-1.1c-1.47-1.76-2.64-1.32-7.78,2.64-4.26,3.38-4.77,4-4.55,6.09a3.24,3.24,0,0,0,1.91,3c.88.37,1.61,1.1,1.61,1.61A4.54,4.54,0,0,1,331.6,32c-2.5,2-7.12,9.91-7.49,12.77a30.51,30.51,0,0,1-1.47,5.8c-1.39,4.11-1.47,5.43-.15,7.93a20.83,20.83,0,0,1,1.61,4.84c.37,2.35.29,2.72-.51,2.28s-.88-.44,0,.59c1.1,1.39,2.57.88,2-.73-1-2.35,1.47-.29,4.33,3.67a25.26,25.26,0,0,0,4.77,5.43c1,.73.29-.44-1.69-2.72s-3.23-4.11-2.79-4.26A2.29,2.29,0,0,1,332,68a13.5,13.5,0,0,0,4,1.54c2.86.81,3.08,1,3.08,3.38,0,1.76.37,2.57,1.1,2.57a1.13,1.13,0,0,0,1.1-1.1c0-.59.37-1.1.81-1.1,1.25,0,4.48,8.07,5.5,13.87.73,4,1.47,6,2.86,7.41a10.34,10.34,0,0,1,2.35,4.84,25.39,25.39,0,0,0,2.57,6.75l2.2,3.89-13.5,17.84c-13.06,17.32-13.5,17.84-15,16.81-.88-.59-2-.88-2.42-.59a1.72,1.72,0,0,0,.73,3.08c1.91.51,1.83,1.1-.44,3.89-1.1,1.25-1.69,2.5-1.39,2.79s1.25-.37,2.13-1.54c1.91-2.35,2.72-2.5,3.89-.59.73,1.17.59,1.76-1,3.82a11,11,0,0,0-1.76,3,14,14,0,0,0,2.28,3.16c1.32,1.47,2.2,2.79,2.06,2.94-1.32,1.25-15.85,7.12-26.72,10.79a183.28,183.28,0,0,0-17.25,6.39c-2.2,1.17-6,3.08-8.44,4.33a72.57,72.57,0,0,1-12.84,4.26c-9.25,2.06-21.8,5.65-31.71,9-3.6,1.17-6.46,1.83-6.46,1.39a34.48,34.48,0,0,1,2.57-5.36c2.06-3.6,2.42-5,2-6.31a6.36,6.36,0,0,1-.07-3.52c.29-1,1.91-6.39,3.52-11.82s3.38-11.6,3.74-13.58a39.64,39.64,0,0,1,1.76-6.39,23.33,23.33,0,0,0,1.17-7.56c0-3.6.37-5.36,1.47-6.83s1.54-3.74,1.91-10.13c.44-7.12.29-9-1.17-14.9-1.39-5.58-1.54-6.9-.73-7.41s.73-1.25-.22-4.55c-2.35-7.56-2.35-7.49.51-9.47a12.58,12.58,0,0,0,3.45-3.38c.51-1,1.17-1.69,1.54-1.69s.59-1.32.59-3c0-3.67,1.1-5.8,2.94-5.8,1.1,0,1.39-.59,1.61-2.72.22-2.72.29-2.79,3.89-3.38,2.42-.44,4.11-.37,4.92.15,1.69,1,5.8,1,8.44,0,1.1-.37,5.14-3.08,8.88-5.95s7-5,7.27-4.7.22.44-.07.44-.07.81.59,1.83c1.1,1.69.73,3.23-9.39,37.58-5.8,19.67-12.77,43.38-15.49,52.7s-5.58,17.76-6.31,18.94c-1.32,1.76-1.32,2.06-.29,2.42a1.77,1.77,0,0,0,1.83-.15c.29-.37,5.43-17.32,11.38-37.73S285,93.8,287.86,84.34C293,67.31,293.07,67,296.37,64c3.08-2.94,3.23-3.3,2.72-5.87-.59-3.38-1.32-3.89-5.21-3.89-2.79,0-5.43.88-16.07,5.43a24.47,24.47,0,0,1-6.17,1.91c-1.91,0-7.49-4.18-9.39-7-1.1-1.69-1-2,.81-4.7,1-1.61,2.2-2.94,2.5-2.94s1.17-1.54,2-3.38c1-2.42,2-3.6,3.74-4.33a4.58,4.58,0,0,0,2.94-5.8c-.66-2.72-6.46-8.29-9.25-8.88a6.34,6.34,0,0,1-3.38-1.76c-.81-1-1.25-1-5.14,0-3.52.88-4.62,1.54-5.95,3.6-3.52,5.5-3.23,5.36-6.09,3-2.42-2.06-2.57-2.42-2.64-7.12s-.22-5.14-2.57-7.12A21.63,21.63,0,0,0,232.81,12c-7.27-2.13-12.26-.07-19.74,8.22l-5.21,5.72-4.11-1c-4-.88-4.26-.88-8,1.25-3.38,1.83-4,2.57-5.14,6a44.88,44.88,0,0,0-1.76,8.51c-.37,4-.22,4.7,1.17,6.09A5.46,5.46,0,0,0,193,48.37a2.69,2.69,0,0,1,1.91.66c.44.81-1.1,4.48-2,4.48-.29,0-.59.51-.59,1.1,0,1.39-1,1.39-2.2,0-.88-1-1.91-1-6,.15-1.83.44-1.69,3.89.44,9.84l1.69,4.92-1.54,1.83a29.11,29.11,0,0,1-5,4.11c-2,1.32-3.52,2.79-3.52,3.3,0,2.5,2.35,8.22,4.11,10.06,2.35,2.42,3.16,2.57,6.24,1,2-1.1,2.28-1,3.82.37a29.45,29.45,0,0,0,4,3c2.13,1.32,2.28,1.69,1.61,3-.51,1-.66,3.52-.37,6.75.22,2.86.44,6.83.59,8.88s.37-.44.59-5.5l.37-9.17,1.61,2.72c1.1,1.91,2.2,2.72,3.67,2.94,1.91.22,2.06.51,2.5,3.82.22,2.06.88,4,1.61,4.4s1.83,2.64,2.72,4.84a60.51,60.51,0,0,0,3.23,6.9,80.78,80.78,0,0,1,4.11,10c1.32,3.82,2.72,7.71,3.16,8.59a3.51,3.51,0,0,1-.07,3.3c-.66,1.54-6.53,15.49-9.17,21.87-1.47,3.74-8.29,10.79-12.26,12.84-4.55,2.35-11.74,8.22-11.74,9.69,0,.66,1.32,2.94,2.94,5.14,2.13,2.79,3.45,3.89,4.77,3.89a2.2,2.2,0,0,1,2.2,1.39c.37,1.25-4,13.14-5.72,15.34-1,1.17-16.51,6.09-29.87,9.39-5.8,1.47-12.18,3.3-14.17,4s-3.82,1.25-4,1,.37-13.21,1.32-28.84,1.76-30.75,1.91-33.54c.44-10.72,2.64-47.78,2.94-49.25a2.65,2.65,0,0,1,1.83-2c.88-.22,1.39-.81,1.17-1.39a6.77,6.77,0,0,1,.59-3.23c.51-1.32.73-2.64.44-2.94-2-2.28-2.94-11.08-1.39-12.62s-2.2-3.16-4.4-1.69c-.66.37-1,2.2-1.1,4.62-.15,3.82-.37,4.33-3.82,8s-4.11,4-8.07,4.77a79.2,79.2,0,0,1-11.6,1c-5.8.07-7.27-.15-7.56-1a2.27,2.27,0,0,1,.44-2.2c1.25-1.47,2.2-11,1.39-13.8a40,40,0,0,1-.73-7.41c-.07-3.89.15-5.28,1-5.95s1-1.1.37-1.69c-1.32-1.32-.07-2,2-1,3.38,1.54,5.58,1.1,6.46-1.32.44-1.25,1.32-2.28,2-2.28s1.76-.15,2.57-.22c1-.07,1.54-.81,2-3,.88-4,1.54-4.48,4-2.57s7,1.83,7.41-.15c.15-.66-.88-2.42-2.13-3.89-1.91-2.13-2.5-3.6-2.94-7.12a15.2,15.2,0,0,0-8.07-12.11c-4.26-2.35-7.63-2.13-13.21.66-4,2.06-5,3-6.68,6.09-1.25,2.35-1.76,4.33-1.54,5.58a5.94,5.94,0,0,1-.44,3.45c-.66,1.32-1.39,1.47-5,1.25-2.35-.15-5.58-.51-7.27-.73-2.5-.44-3.82-.07-8.51,2.13a24.12,24.12,0,0,0-8.15,5.58,16.19,16.19,0,0,1-2.94,2.94,18.49,18.49,0,0,1-3-1.69c-3.38-2.35-10.42-3.82-13.14-2.79a27.66,27.66,0,0,1-7.19.81c-4,0-5.8.37-8.07,1.61-6.09,3.45-15.71,14.24-16.51,18.57-.51,2.86.88,6.31,4.33,10.94a18.14,18.14,0,0,1,3.16,5.95,4.89,4.89,0,0,0,1.76,3.3,3.83,3.83,0,0,1,1.61,2.35,2,2,0,0,0,1.83,1.91,1.65,1.65,0,0,1,1.69,1.83c0,3.45,2.42,11.45,4.11,13.36A7.48,7.48,0,0,1,49.18,133c0,1.39.07,1.39,1.32.29A4.82,4.82,0,0,1,52.33,132c.29,0,.44,2.57.29,5.65-.15,5.28,0,5.72,1.32,5.72a1.64,1.64,0,0,0,1.69-1.61c.22-1.25,0-1.54-.88-1.25s-1.17-.07-1.17-2.35c0-4.4.66-4.92,4.48-3.6,4.33,1.54,5.06,2.72,5.06,8.37,0,8.66-1.54,27.52-2.64,31.63a22.19,22.19,0,0,0-.37,9.17l.59,5.14L56.59,199c-2.94,7.19-4.48,10.13-5.28,10.13-1.47,0-2.5,3.45-1.47,4.62.44.59-1,5.06-4.48,13.36C42.57,233.92,37,247.64,33,257.48s-7.41,18.06-7.56,18.28a57.83,57.83,0,0,1-6.09,1.76c-7.63,1.91-9.25,3-8.66,5.72.51,2.28.66,2.28-5.43,3.23C2.42,287,0,288.74,0,290.28c0,.59.81,1.54,1.83,2.2,1.54,1,2.94,1.1,7.56.73,5.87-.51,32.73-5.36,43.3-7.85,22-5.06,52.26-17.76,86.75-36.4,33.4-18,41.1-20.84,63.78-23.41,14.9-1.61,20.33-3.45,55.34-18.2,26.5-11.16,39.85-15.27,44.18-13.65,5.14,2,9.61.51,20.18-6.61,13-8.73,23.19-12.33,40.44-14.31,22.31-2.57,59.45-11.38,70-16.66,5.5-2.79,7.49-5.65,6.24-9-1-2.64-3.3-3.23-8.07-2.2s-21,.44-24.44-1a15.1,15.1,0,0,0-4.48-.81h-2.42l-.81-14.17c-.51-7.71-.88-15.85-.88-18,0-3-.59-5.06-2.86-9.54-2.86-5.65-5.95-15.19-5.95-18.57a10.25,10.25,0,0,0-1.47-4.18,9.77,9.77,0,0,1-1.47-3.38c0-.51,1.32-2.79,3-5.14,2.42-3.38,3.3-4.11,4.48-3.67,2.28.66,6.46-3.67,6.46-6.75,0-1.32.44-2.5,1-2.72s.66-.66.07-1.69-1.69-1.39-3.67-1.39-4.18-.81-7.27-2.79c-7-4.33-6.68-3.74-7.27-11.89-.66-9.17.51-8.59,2.13,1.1,1.17,6.68,2,8.88,3,7.85.22-.22.07-2.57-.37-5.14a58.89,58.89,0,0,1-.81-8,8.46,8.46,0,0,0-1.47-5.21c-1.91-2.42-1.83-2.72.59-2.72,1.61,0,2.28-.51,3.16-2.42.66-1.47,1.61-2.42,2.72-2.57s1.61-.73,1.61-2.2a7.65,7.65,0,0,1,1.1-3.6c1.25-1.76,1.1-9.32-.15-11.6C394.36,3.45,386.72-.14,385,0A21.14,21.14,0,0,0,381.88.74Zm-4.26,110.09c1.1,2.06,1.1,3.67-.07,19.74l-1.25,17.54-8.51,2.94c-4.7,1.54-8.59,2.79-8.66,2.72a18.55,18.55,0,0,1,1.76-3.08c2.57-3.74,9-18.06,11.89-26.5,1.54-4.62,2.28-8,2.28-11.16C375.05,108.12,375.86,107.38,377.62,110.83ZM358,115.38a29.7,29.7,0,0,1-3.45,7.56c-3.82,6.17-18.94,26-19.82,26-.37,0-1-.66-1.47-1.54-.88-1.61-2.06.07,16.51-24,4.4-5.72,8.15-10.42,8.37-10.42A5.75,5.75,0,0,1,358,115.38ZM145,142.47c-.73,14-1.54,24.66-2,24.88s-.51,1.69-.22,3.52c.73,4.55-1.91,57.91-3,59.38-.66,1-1.1,1-1.91.29-.59-.51-2.86-1.17-5-1.61a18.42,18.42,0,0,1-4.92-1.54c-1.61-1.39-1.1-7.34,1.54-15.78a109.69,109.69,0,0,0,3-11.3c.22-1.83,1.1-7.27,1.83-12.11s1.83-12.92,2.28-18c.73-8.22.66-9.47-.44-12.33-1.47-3.6-7.71-9.25-13.43-12.18a55.85,55.85,0,0,1-7.85-5.5c-2.35-2.06-4.7-3.74-5.21-3.74a5.94,5.94,0,0,1-2.57-1.39l-1.69-1.32L108,131a25.47,25.47,0,0,0,3.89-5.28c1.1-2.42,1.32-2.5,5.14-2.5,2.28,0,7.63-1,12.26-2.35,7.12-2,15.78-3.6,16.66-3C146.13,118,145.69,129,145,142.47ZM70,150.17l4.18,6.31-1.17,3c-3.82,9.69-10.28,25.1-10.79,25.69-.29.44-.59-1.1-.59-3.3,0-3.16.37-4.62,1.83-6.53,1.25-1.69,1.61-2.72,1.1-3.23s-.73-5.36-.73-11.82c0-11.16.51-16.51,1.47-16.51C65.62,143.79,67.74,146.65,70,150.17ZM225.1,175.86c-.51,9.32-1.39,13.73-3.3,16.37-1.25,1.61-1.61,3.23-1.61,6.46,0,2.35.37,4.62.81,5.06s-.81,1.32-4.92,2.72c-5.14,1.69-5.5,1.76-4.33.44s1.17-1.54-.37-4.18a25.14,25.14,0,0,1-2.28-7.19c-.51-3.74-.44-4.7.73-6.24,2.94-4.11,3.89-6.61,2.86-7.85-.81-1-.07-2,5.28-6.9,3.45-3.23,6.53-5.8,6.83-5.8S225.32,172,225.1,175.86ZM110.61,174c.66.51.51,1.25-.59,3s-1.39,3.74-1.39,8.73c0,7.49-2.2,16.07-6.24,24.73a34.67,34.67,0,0,0-2.57,6.39A20.17,20.17,0,0,1,98,221.73a17.36,17.36,0,0,0-1.83,5.87c0,1.1-.37,2.06-.81,2.06s-.66.88-.51,2c.22,1.83.66,2.13,4.62,2.94a54.27,54.27,0,0,0,7.19,1c3.23,0,12.26,2.13,12.26,2.86,0,.29-2.2,1.54-4.84,2.86s-10.2,5.8-16.73,10-13.21,8.29-14.9,9.17c-2.94,1.47-3.16,1.47-3.16.22,0-2.2-1.61-3.08-5.8-3.08-4.4,0-6.24-1-8.44-4.48-1.1-1.76-1.1-2.06,0-4.26a8,8,0,0,1,3.3-3.3c3.38-1.39,5.95-5.87,11.3-19.52,4.33-10.94,5.58-13.43,8.51-16.59,4.55-4.92,6.24-8.44,11.3-23.93l4.18-13.06,3.08.44A13.73,13.73,0,0,1,110.61,174ZM65.69,188.34a47.46,47.46,0,0,1-2.2,9.39c-.88,2.42-3.23,8.51-5.14,13.58s-4.11,12-4.92,15.41c-1.76,7.49-2.72,9.39-5.58,11.52a6.81,6.81,0,0,0-2.72,4.4,18.84,18.84,0,0,1-1.69,4.84c-1,1.61-1,2.28-.37,3.45s.73,1.91-.07,3.82-2.64,13.87-2.64,17c0,.51-11,2.86-11.45,2.5s22.53-56.59,23.71-57.91A11.17,11.17,0,0,0,54,213.15c.59-2.72,11.38-29.73,11.82-29.73C66.06,183.42,65.91,185.62,65.69,188.34Z"/>
                    </svg>
                </aside>
            </div>
        )
    }
};

export default EditProfile;