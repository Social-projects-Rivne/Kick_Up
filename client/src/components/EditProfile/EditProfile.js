import React, { Component } from "react";
import { connect } from "react-redux";

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import kute from 'kute.js';
import 'kute.js/kute-svg';
import AvatarCropper from 'react-avatar-edit';
import { withSnackbar } from 'notistack';
import is from 'is_js';

import 'react-id-swiper/src/styles/scss/swiper.scss';

import {
    Grid,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    Avatar,
    IconButton
} from '@material-ui/core';
import { 
    PersonOutline, 
    DateRange,
    SentimentSatisfied,
    DeleteOutline,
    PeopleOutline,
    MailOutline,
    CheckCircleOutlineOutlined
} from '@material-ui/icons';
import {editUserProfileAction} from "../../store/actions/editProfileAction";
import {userProfileAction} from "../../store/actions/userProfileAction";

const _maxFileSize = 10000000;
const _desktopWidth = 1168;
const swiperParams = {
    modules: [ Pagination, Navigation ],
    slidesPerView: 'auto',
    spaceBetween: 16,
    watchOverflow: true,
    simulateTouch: false,
    pagination: {
        el: ".edit-profile__form-pagination",
        type: 'progressbar',
        clickable: true
    },
    navigation: {
        prevEl: '.edit-profile__form-prev',
        nextEl: '.edit-profile__form-next',
    },
    autoHeight: true,
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
        1168: {
            noSwipingClass: 'swiper-container'
        }
    },
    on: {
        resize: function() {
            if (window.innerWidth >= _desktopWidth) this.slideTo(0);
        }
    }
};
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};
const inputType = {
    name: 1,
    last_name: 2,
    email: 3,
    birth_day: 4,
    gender: 5,
    avatar: 6
};
let prevTimer;

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            croppedImage: '',
            avatar: {
                data: '',
                wasChanged: false
            },
            first_name: {
                data: '',
                wasChanged: false
            },
            last_name: {
                data: '',
                wasChanged: false
            },
            email: {
                data: '',
                wasChanged: false
            },
            emailReceived: '',
            birth_date: {
                data: '',
                wasChanged: false
            },
            gender: {
                data: '',
                wasChanged: false
            },
            activeAnimation: null,
            windowWidth: window.innerWidth,
        };
    }
    handleSvg = (activeInput) => {
        const _delayTime = 1000;

        if (
            !activeInput ||
            activeInput === this.state.activeAnimation
        ) { return; }

        // Save new animation;
        this.setState({activeAnimation: activeInput});

        // We run animations only desktop;
        if (window.innerWidth >= _desktopWidth) {
            window.setTimeout(() => {
                switch(activeInput) {
                    case inputType.name:
                        kute.fromTo(
                            '#at-pc', 
                            {path: '#at-pc' }, 
                            { path: '#guitar' },
                            {
                                duration: 1000,
                                morphPrecision: 15,
                                morphIndex: 150,
                            }).start();
                        break;
                    case inputType.last_name:
                        kute.fromTo(
                            '#at-pc', 
                            {path: '#at-pc' }, 
                            { path: '#dancing' },
                            {
                                duration: 1200,
                                morphPrecision: 15,
                                morphIndex: 150
                            }).start();
                        break;
                    case inputType.email:
                        kute.fromTo(
                            '#at-pc', 
                            {path: '#at-pc' }, 
                            { path: '#horse' },
                            {
                                duration: 1200,
                                morphPrecision: 15,
                                morphIndex: 150
                        }).start();
                        break;
                    case inputType.birth_day:
                        kute.fromTo(
                            '#at-pc', 
                            {path: '#at-pc' }, 
                            { path: '#box' },
                            {
                                duration: 1200,
                                morphPrecision: 15,
                                morphIndex: 150
                        }).start();
                        break;
                    case inputType.gender:
                        kute.fromTo(
                            '#at-pc', 
                            {path: '#at-pc' }, 
                            { path: '#dog' },
                            {
                                duration: 1200,
                                morphPrecision: 15,
                                morphIndex: 150
                        }).start();
                        break;
                    case inputType.avatar:
                        kute.fromTo(
                            '#at-pc', 
                            {path: '#at-pc' }, 
                            { path: '#hiking' },
                            {
                                duration: 1200,
                                morphPrecision: 15,
                                morphIndex: 150
                        }).start();
                        break;
                    default: return;
                }
            }, _delayTime);
        }
    };

    updateInputValue = (evt) => {
        this.setState({
          [evt.target.name]: {
              data: evt.target.value,
              wasChanged: true
          }
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.initialized) {
            return;
        }

        const _this = this;
        // Get user data;
        this.getUserData((res) => {
            if (res) {
                _this.setState({
                    initialized: true,
                    avatar: {
                        data: res.avatar ? res.avatar : '',
                        wasChanged: false
                    },
                    first_name: {
                        data: res.first_name ? res.first_name : '',
                        wasChanged: false
                    },
                    last_name: {
                        data: res.last_name ? res.last_name : '',
                        wasChanged: false
                    },
                    email: {
                        data: res.email,
                        wasChanged: false
                    },
                    emailReceived: res.email,
                    birth_date: {
                        data: res.birth_date ? res.birth_date.toISOString().split('T')[0] : '',
                        wasChanged: false
                    },
                    gender: {
                        data: res.gender === "Male" ? 1 : (res.gender === "Female" ? 2 : 3),
                        wasChanged: false
                    },
                });
            }
        });
    }

    handleAvatarDimensions = () => {
        if (window.innerWidth < _desktopWidth) {
            if (window.innerWidth > window.innerHeight) {
                return 110;
            } else {
                return 150;
            }
        } else { return 180; }
    }
    handleAvatarBorder = () => {
        if (window.innerWidth >= _desktopWidth) {
            return {
                border: '2px dashed #62553a',
                borderRadius: 5,
                textAlign: 'center',
            }
        } else {
            return {
                border: '2px dashed #f7f4e9',
                borderRadius: 5,
                textAlign: 'center',
            }
        }
    }
    validateImage = (evt) => {
        const extention = evt.currentTarget.files[0].name
        .split('.')
        .pop()
        .toLowerCase();
        const allowedFormats = ['png', 'gif', 'jpg', 'jpeg'];
        const resetInput = () => {
            evt.currentTarget.value = '';
        };

        // Validate size;
        if (evt.currentTarget.files[0].size > _maxFileSize) {
            this.showToast('Your image is too big, please upload image up to 10mb.', messageType.ERR, 5000);
        }

        /** 
         * Validate format, at moment we are ok with extension;
         * Mime type validation can be added later;
         * */
        if (!allowedFormats.some((el) => el === extention)) {
            this.showToast('This file format is disallowed, please upload another image', messageType.ERR, 5000);
            resetInput();
        }
    }
    handleWindowResize = () => {
        const _awaitTime = 1000;
        const _this = this;

        // Need debouncing;
        window.clearTimeout(prevTimer);
    
        prevTimer = window.setTimeout(() => {
            _this.setState({ windowWidth: window.innerWidth });
        }, _awaitTime);
    }
    validateEmail = () => {
        // Validate email;
        if (this.state.email.data && !is.email(this.state.email.data)) {
            this.showToast(
                `Your new email address is invalid, and won't be saved. Please correct it`,
                messageType.ERR,
                5000
            );
        }
    };

    getUserData = (callback) => {
        callback(this.props.userProfileData);
    };

    saveData = () => {
        const data = {};

        // Update user info, send ONLY CHANGED items;
        Object.keys(this.state).forEach((key) => {
            if (this.state[key] && this.state[key].wasChanged) {
                data[key] = this.state[key].data;
            }
        });

        // If needed, remove email;
        if (data.email && !is.email(data.email)) delete data.email;

        if (Object.keys(data).length) {
            // Send data;
            this.props.editUserProfileAction(data, (res) => {
                this.showToast(
                    res ? `All your changed were saved` : `We are sorry, we couldn't save your profile changes :(`,
                    res ? messageType.SUCCESS : messageType.ERR,
                    5000
                );
            });
        }
    }
    componentDidMount = () => {

        const {id} = this.props.match.params;
        this.props.userProfileAction(id);

        // Handle animations for desktop;
        this.handleSvg();

        // Handle swiper changes;
        window.addEventListener('resize', this.handleWindowResize);
    };
    componentWillUnmount = () => {
        // Save data;
        this.saveData();

        // Remove EL;
        window.removeEventListener('resize', this.handleWindowResize);
    };
    resetAvatar = () => {
        this.setState({avatar: ''});
    };
    showToast = (message, variant, duration) => {
        this.props.enqueueSnackbar(message, {
            transitionDuration: { exit: 300, enter: 300 },
            variant: variant ? variant : 'default',
            autoHideDuration: duration ? duration : 10000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
    };

    render() {
        return (
            <div className="edit-profile">
                <Button
                    className="edit-profile__submit-btn"
                    variant="outlined"
                    onClick={this.saveData}
                >
                    Save changes
                </Button>
                <form className="edit-profile__form-wrapper">
                    {
                        this.state.windowWidth  >= 0 &&
                        <Swiper {...swiperParams} getSwiper={ this.setSwiper } >
                        <div key={1} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <SentimentSatisfied fontSize="inherit" />
                                        What is your first name?
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <TextField
                                        value={this.state.first_name.data}
                                        onChange={this.updateInputValue}
                                        onFocus={() => { this.handleSvg(inputType.name) }}
                                        className="input"
                                        name="first_name"
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
                                    <SentimentSatisfied fontSize="inherit" />
                                        What is your last name?
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <TextField
                                        value={this.state.last_name.data}
                                        onChange={this.updateInputValue}
                                        onFocus={() => { this.handleSvg(inputType.last_name) }}
                                        className="input"
                                        name="last_name"
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
                                    <MailOutline fontSize="inherit" />
                                    Your email:
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <TextField
                                        value={this.state.email.data}
                                        onChange={this.updateInputValue}
                                        onBlur={this.validateEmail}
                                        onFocus={() => { this.handleSvg(inputType.email) }}
                                        className="input"
                                        name="email"
                                        label="Enter a valid email address"
                                        type="email"
                                        minLength="3"
                                        margin="normal"
                                        autoComplete="on"
                                    />
                                </div>
                            </Grid>
                        </div>
                        <div key={4} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <DateRange fontSize="inherit" />
                                        Choose your birth day:
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <TextField
                                        value={this.state.birth_date.data}
                                        onChange={ (e) => {
                                            this.updateInputValue(e);
                                            this.handleSvg(inputType.birth_day);
                                        }}
                                        className="input  edit-profile__date-picker"
                                        name="birth_date"
                                        label=" "
                                        type="date"
                                        margin="normal"
                                        required
                                    />
                                </div>
                            </Grid>
                        </div>
                        <div key={5} className="swiper-slide  edit-profile__form-section">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <PeopleOutline fontSize="inherit" />
                                    Choose your gender:
                                </Typography>
                                <div className="edit-profile__field-wrapper">
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender"
                                        onChange={ (e) => {
                                            this.updateInputValue(e);
                                            this.handleSvg(inputType.gender);
                                        }}
                                        value={this.state.gender.data}
                                        className="input edit-profile__gender"
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            value="1"
                                            label="Male"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            value="2"
                                            label="Female"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </div>
                            </Grid>
                        </div>
                        <div key={6} className="swiper-slide  edit-profile__form-section  edit-profile__form-section_avatar">
                            <Grid item xs={10} sm={6} className="edit-profile__form-inner">
                                <Typography align="center" variant="h4">
                                    <PersonOutline fontSize="inherit" />
                                    Upload your avatar:
                                </Typography>
                                <div className="edit-profile__field-wrapper  edit-profile__field-wrapper_avatar">
                                    <div className="edit-profile__cropper-wrapper  swiper-no-swiping">
                                        {!this.state.avatar.data &&
                                            <AvatarCropper
                                                height={this.handleAvatarDimensions()}
                                                mimeTypes=''
                                                imageHeight={this.handleAvatarDimensions()}
                                                closeIconColor={window.innerWidth >= _desktopWidth ? '#f7f4e9' : '#62553a'} 
                                                onCrop={ (image) => {this.setState({croppedImage: image})}}
                                                onBeforeFileLoad={(e) => {
                                                    this.handleSvg(inputType.avatar);
                                                    this.validateImage(e);
                                                }}
                                                backgroundColor='#fff'
                                                borderStyle={this.handleAvatarBorder()}
                                                label="Choose"
                                                labelStyle = {{
                                                    fontWeight: 100,
                                                    fontFamily: '"Roboto", "Helvetica", "Arial, sans-serif"',
                                                    color: window.innerWidth < _desktopWidth ? '#f7f4e9' : 'rgba(0, 0, 0, 0.8)'
                                                }}
                                                src={this.state.avatar.data}
                                            />
                                        }
                                        {
                                            <div className="edit-profile__avatar-wrapper">
                                                {this.state.avatar.data &&
                                                    <Avatar alt="" src={this.state.avatar.data} className="edit-profile__user-avatar" />
                                                }
                                                {this.state.avatar.data &&
                                                    <IconButton 
                                                        aria-label="Delete"
                                                        onClick={this.resetAvatar}
                                                    >
                                                    <DeleteOutline fontSize="default" />
                                                    </IconButton>
                                                }
                                                {
                                                    this.state.croppedImage &&
                                                    <IconButton
                                                        aria-label="Save"
                                                        onClick={ () => {this.setState({
                                                                avatar: {
                                                                    data: this.state.croppedImage,
                                                                    wasChanged: true
                                                                },
                                                                croppedImage: ''
                                                            })
                                                        }
                                                    }
                                                    >
                                                    <CheckCircleOutlineOutlined className="edit-profile__save-btn" fontSize="default" />
                                                    </IconButton>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Grid>
                        </div>
                        <Button
                            className="edit-profile__submit-btn"
                            variant="outlined"
                            onClick={this.saveData}
                        >
                            Save changes
                        </Button>
                    </Swiper>
                    }
                </form>
                <aside className="edit-profile__animation-wrapper">
                    <Typography className="edit-profile__animation-title" align="center" variant="h4">
                        Review your profile now
                    </Typography>
                    <svg id="morph" xmlns="http://www.w3.org/2000/svg">
                        <path id="at-pc" xmlns="http://www.w3.org/2000/svg" d="M315.27.83c-2.86.85-19.8,8.79-27.22,12.71A14.19,14.19,0,0,0,279.9,25c-.42,3.28-.11,5.19,1.38,7.31,1.59,2.44,1.91,4.66,1.59,12.71-.32,8.47,0,10.38,1.91,13.66,2.75,4.55,2.75,7.52.42,14.83-1.59,4.55-2.44,5.61-4.77,6.14a6.62,6.62,0,0,0-4,2.75,33.61,33.61,0,0,1-5.4,6.35c-2.22,2.22-4.13,4.34-4.13,4.66a54.45,54.45,0,0,1-3.39,7.73c-2.65,5.61-3.39,8.68-3.71,15.57-.42,7.94-1,9.64-6.78,21.5a202,202,0,0,1-13.13,23c-6.35,9.43-11.12,20-11.12,25,0,3.18-2.65,3.71-11.54,2.22-17.16-2.86-15.36-3.18-19.8,3.49-3.92,5.93-4.77,9.74-3.28,14.09l.85,2.44H161.29c-18.53,0-34.63.32-35.8.53-1.91.53-5.3-5.51-27.85-49.14-14.19-27.32-26.37-50-27-50.2-2.22-.74-5,1.38-5,3.81,0,1.27,11.65,25,25.84,52.63l25.84,50.3-13.24.32c-7.2.11-19,.11-26.05,0l-12.92-.32,4.77-2.65L74.66,211l-7.31-.53c-7.52-.53-9.85-2.12-6.14-4.13,2.65-1.38,5.3-8,6.46-15.78a55,55,0,0,1,1.69-7.94c.74-1.69-.64-1.8-19-1.8-13.66,0-19.7.32-19.7,1.16s-1,1-2.44.53a5.9,5.9,0,0,0-7.1,5.72c0,2.12,1.06,3.81,3.49,5.82,1.8,1.48,6.35,5.19,10.06,8.15s6.46,5.93,6.25,6.57-3.39,1.38-7.2,1.69L27,211l4,2c2.12,1.16,3.92,2.44,3.92,3s-7.84.85-17.47.85H0V231.7H45.43c25.1,0,45.75.32,46.07.85.42.74-21.18,75.4-42.68,146.89l-7,23.3-6.57.32-6.67.32v14.72h4.24c2.33,0,4.24.32,4.24.64,0,.64-13.66,47.66-17.79,61.32l-1.91,6.35-8.15.32L1.06,487v16.84H243.58V492.22h6.67c8.58,0,24.57-2.44,37.49-5.72,9.11-2.33,10.48-2.54,11.54-1.16a121.49,121.49,0,0,1,5.19,12.6c2.12,6.14,4.77,11.86,5.82,12.81,1.8,1.59,1.69,1.8-1.16,4.77-3.49,3.49-4.13,8.68-1.38,12.5,1.38,2,2.54,2.33,9.53,2.33s8.26-.32,10.7-2.75c2.22-2.22,2.54-3.39,2.12-6.57-.64-3.92-4.77-8.68-7.62-8.68-1.06,0-1.16-.64-.32-3,1.06-2.65.42-5.51-3.92-19.38-7.52-24.15-7.1-22.45-5-21.82a31.83,31.83,0,0,1,3.39,1.16c2.33,1,15.14-10.7,14.51-13.24s-.74-2.54,27.32.11c32.3,3.07,43.95,4.45,43.95,5.3,0,.42-1,1.59-2.12,2.65-3,2.65-3,10.91.11,14.72,2.65,3.28,6.57,3.6,9.11.64a7.2,7.2,0,0,1,5.08-2.12c4.34,0,5.82-1.69,5.82-6.67a8.85,8.85,0,0,0-3.07-7.2c-1.69-1.69-3.92-3.07-4.77-3.07-1.27,0-1.59-.64-1.06-2.65,1-3.71-.32-7.62-2.65-9-1.06-.53-10.48-2.22-20.86-3.71-25.2-3.49-53.69-8.47-60.47-10.59-3.28-1-5.61-2.33-5.61-3.18s2.22-3.39,4.87-5.72l5-4.34,1.69,3.39A9.69,9.69,0,0,0,338,429.1c2.54.85,3.71.53,7.31-2.12,2.44-1.69,4.77-4,5.3-5.3,1.06-3.18-1.16-7-5.08-8.79-2.65-1.16-3.28-2.12-3.28-4.45.11-3.81-1.91-6.25-5.19-6.25s-5.93,1.38-11.44,5.82c-5.08,4.13-10.8,7.2-12.07,6.46-.53-.32-2.86-3.81-5.19-7.73-4.13-7-4.24-7.52-4.87-19.38-.74-16.94-1-25.1-.85-30.92l.21-5,22.56-.53c22.24-.53,62.48-2.22,62.91-2.54a41.74,41.74,0,0,0,2.86-5.4c3-5.72,7.41-7.84,9.74-4.55,1.8,2.44,4.66.85,4.66-2.86,0-3.07-2.54-5.19-3.71-3.28-1.06,1.69-2.65,1.16-2.65-.85,0-3.92,8.58-24,11.12-26.16,4.13-3.39,7.52-15.25,4.87-16.84-2-1.27-4.13.64-5.3,4.87l-1.38,4.34-2.75-2.86L403,292.06l4.55-13.13c5.72-16.94,5.82-23.3.74-54l-3.6-22.13,2.54-1.91c3.18-2.65,4.13-7.1,2.65-12.39-1.27-4-1.16-4.34,12.5-32.09,18.74-38.23,20.76-44.59,14.4-47.34a43.29,43.29,0,0,0-9.43-1.91c-8.15-.85-8.9-.32-15.67,9.53-3.71,5.51-4.34,6-5.08,4.24a13.69,13.69,0,0,1-.85-4.24c-.11-3.39-6-14.4-9.53-17.79-1.8-1.69-6.67-4.77-10.91-6.88C376.8,87.77,373.2,83.64,372,76.76c-.74-4.77-1.91-5.51-6.14-3.92-1.59.64-3.18.85-3.49.53s-.53-9.32-.32-19.91c.11-14.61-.21-20.76-1.38-25.42-3.49-12.71-9.85-21.5-18.64-25.42C336.77.19,320.57-.87,315.27.83Zm6.67,100c0,.32-2.86,2.54-6.35,5s-6,4.87-5.61,5.51-.21,1.69-1.38,2.54c-1.69,1.16-1.8,1.91-.74,4.66,1.16,3.07,1,3.49-4.24,9.11-3.07,3.28-7.84,8-10.59,10.8s-7.73,7.52-11.12,10.7c-6.46,6.25-13.87,12.07-14.51,11.44-.21-.21.74-2.65,2.22-5.51,6.35-12.6,11.86-20.76,19-28.17a59.77,59.77,0,0,0,11.12-15.14c3.39-7,3.49-7.1,7.84-7.2,3.6,0,6.35-.85,14.19-4C321.84,100.38,321.94,100.59,321.94,100.8ZM260.1,222.27c3.39,1.16,10,3,14.4,4.13a72.67,72.67,0,0,1,9.11,2.54c.53.32,1.27,3.81,1.59,7.73s.85,7.94,1.27,8.9c.53,1.38-.74,2-6,3.39-3.71,1-11.23,3-16.73,4.45-9,2.44-28.38,6.14-84.19,16.31-21.92,3.92-28.06,5.72-32.3,9.32-6.35,5.3-8.37,11.76-16.52,53.27-2.65,13.66-6.35,31.77-8.37,40.24s-3.81,17.47-4.24,20.12-.85,6-1.16,7.62l-.64,3h-29c-16,0-29-.32-29-.64s7.41-26.05,16.52-57,17.37-59.09,18.32-62.59,4.87-16.52,8.58-28.91l6.67-22.45h136.3l.64-2.65a21.18,21.18,0,0,0,.21-5.82c-.42-3.07-.32-3.18,3.92-3.18A38.57,38.57,0,0,1,260.1,222.27Zm145.09,26.58c1.8,10.06,1.8,10.38-.42,15.36-1.16,2.75-3.18,8.68-4.45,13-2.86,9.64-4.66,13.34-7,14.19-1.59.64-1.69-.53-1.27-14.09l.53-14.83,4-6.67c3.6-5.93,4.13-7.62,4.55-15.67C401.79,230.11,401.9,230.32,405.18,248.85Zm-124,96.8c.53,3,1.38,4.13,3.81,5l3.07,1.16v25.42l-5.61-9c-3.18-5-8.15-12.71-11.12-17.16a79.49,79.49,0,0,1-5.51-8.68c0-.32,3.28-.53,7.31-.53h7.31Zm-78.37,21.6c5.08,11.33,10.91,23.83,12.81,27.75a69.44,69.44,0,0,1,3.6,7.73c0,.32-7.2.53-16,.53-14,0-15.89-.21-15.36-1.59.32-1,1.06-11.33,1.69-23.09,1.27-25.42,2-34.1,3.18-32.83C193.17,346.18,197.72,355.92,202.8,367.25Zm-89.49,52.32c0,.32-1.38,4.34-3.18,9l-3.07,8.58,2.33.42c1.27.32,4.45.85,7.1,1.16a44.25,44.25,0,0,1,10.38,3.18l5.72,2.65L127.51,451c-5.72,7.2-10.38,11.23-17.05,14.61-3.71,1.8-6.35,2.22-15.67,2.22-9.85,0-11.33.21-13.34,2.22a6.06,6.06,0,0,0-1.8,4.45c.74,5.19,12.07,7.41,35.69,6.88l17.58-.32,9.43-4.77c5.3-2.65,10-5,10.38-5.08s.85,2,.85,4.87c0,3.28.53,5.51,1.38,5.82a72.3,72.3,0,0,0,10.8-.11c7.62-.42,10.27-.11,13,1.27,1.91,1,3.39,2.22,3.39,2.75s-26.79,1.06-74.24,1.06c-70.11,0-74.13-.11-73.71-1.91.32-1,4.77-16.2,9.85-33.89l9.21-32H83.35C99.76,419.14,113.32,419.36,113.32,419.57Zm108.55,4.34c0,6.25,3,9.43,8.79,9.21,3.92-.21,4.24.11,7,5l2.75,5.19-6.57,2.22c-3.71,1.16-13.13,3.81-21,5.82s-17.16,4.66-20.55,5.93-6.46,2.12-6.67,2.12a6.75,6.75,0,0,1-.32-2.54,16.84,16.84,0,0,0-1.06-5.4c-.74-1.91-.53-4.45.53-8.68a74.81,74.81,0,0,0,1.59-14.83v-8.79h35.48ZM255,463.83c2.44,1.38,4.45,3,4.45,3.71,0,1.8-2.86,4.34-7.84,6.88-6,3.07-12.07,7.94-12.81,10.38-.64,2-1.69,2.12-17.58,2.12H204.29l1.59-2.33c2.33-3.28,2.12-8.9-.32-11.33-2.12-2.12-2-2.12,7.62-4.34,12-2.75,33.57-7.2,35.69-7.31C249.72,461.5,252.47,462.56,255,463.83Z"/>
                        <path id="hiking" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M381.88.74c-2.79.81-5.06,3.52-6.09,7.34-.44,1.61-1.25,2.86-1.76,2.86a19.93,19.93,0,0,0-4.55,1.91c-5.36,2.79-7.63,3.38-8.15,2.06a2.9,2.9,0,0,0-2.42-1c-1.17,0-2.28-.44-2.42-1s-.59-.66-1-.07c-1.17,1.61-7.78,4.7-10.13,4.7a5.05,5.05,0,0,1-3.3-1.1c-1.47-1.76-2.64-1.32-7.78,2.64-4.26,3.38-4.77,4-4.55,6.09a3.24,3.24,0,0,0,1.91,3c.88.37,1.61,1.1,1.61,1.61A4.54,4.54,0,0,1,331.6,32c-2.5,2-7.12,9.91-7.49,12.77a30.51,30.51,0,0,1-1.47,5.8c-1.39,4.11-1.47,5.43-.15,7.93a20.83,20.83,0,0,1,1.61,4.84c.37,2.35.29,2.72-.51,2.28s-.88-.44,0,.59c1.1,1.39,2.57.88,2-.73-1-2.35,1.47-.29,4.33,3.67a25.26,25.26,0,0,0,4.77,5.43c1,.73.29-.44-1.69-2.72s-3.23-4.11-2.79-4.26A2.29,2.29,0,0,1,332,68a13.5,13.5,0,0,0,4,1.54c2.86.81,3.08,1,3.08,3.38,0,1.76.37,2.57,1.1,2.57a1.13,1.13,0,0,0,1.1-1.1c0-.59.37-1.1.81-1.1,1.25,0,4.48,8.07,5.5,13.87.73,4,1.47,6,2.86,7.41a10.34,10.34,0,0,1,2.35,4.84,25.39,25.39,0,0,0,2.57,6.75l2.2,3.89-13.5,17.84c-13.06,17.32-13.5,17.84-15,16.81-.88-.59-2-.88-2.42-.59a1.72,1.72,0,0,0,.73,3.08c1.91.51,1.83,1.1-.44,3.89-1.1,1.25-1.69,2.5-1.39,2.79s1.25-.37,2.13-1.54c1.91-2.35,2.72-2.5,3.89-.59.73,1.17.59,1.76-1,3.82a11,11,0,0,0-1.76,3,14,14,0,0,0,2.28,3.16c1.32,1.47,2.2,2.79,2.06,2.94-1.32,1.25-15.85,7.12-26.72,10.79a183.28,183.28,0,0,0-17.25,6.39c-2.2,1.17-6,3.08-8.44,4.33a72.57,72.57,0,0,1-12.84,4.26c-9.25,2.06-21.8,5.65-31.71,9-3.6,1.17-6.46,1.83-6.46,1.39a34.48,34.48,0,0,1,2.57-5.36c2.06-3.6,2.42-5,2-6.31a6.36,6.36,0,0,1-.07-3.52c.29-1,1.91-6.39,3.52-11.82s3.38-11.6,3.74-13.58a39.64,39.64,0,0,1,1.76-6.39,23.33,23.33,0,0,0,1.17-7.56c0-3.6.37-5.36,1.47-6.83s1.54-3.74,1.91-10.13c.44-7.12.29-9-1.17-14.9-1.39-5.58-1.54-6.9-.73-7.41s.73-1.25-.22-4.55c-2.35-7.56-2.35-7.49.51-9.47a12.58,12.58,0,0,0,3.45-3.38c.51-1,1.17-1.69,1.54-1.69s.59-1.32.59-3c0-3.67,1.1-5.8,2.94-5.8,1.1,0,1.39-.59,1.61-2.72.22-2.72.29-2.79,3.89-3.38,2.42-.44,4.11-.37,4.92.15,1.69,1,5.8,1,8.44,0,1.1-.37,5.14-3.08,8.88-5.95s7-5,7.27-4.7.22.44-.07.44-.07.81.59,1.83c1.1,1.69.73,3.23-9.39,37.58-5.8,19.67-12.77,43.38-15.49,52.7s-5.58,17.76-6.31,18.94c-1.32,1.76-1.32,2.06-.29,2.42a1.77,1.77,0,0,0,1.83-.15c.29-.37,5.43-17.32,11.38-37.73S285,93.8,287.86,84.34C293,67.31,293.07,67,296.37,64c3.08-2.94,3.23-3.3,2.72-5.87-.59-3.38-1.32-3.89-5.21-3.89-2.79,0-5.43.88-16.07,5.43a24.47,24.47,0,0,1-6.17,1.91c-1.91,0-7.49-4.18-9.39-7-1.1-1.69-1-2,.81-4.7,1-1.61,2.2-2.94,2.5-2.94s1.17-1.54,2-3.38c1-2.42,2-3.6,3.74-4.33a4.58,4.58,0,0,0,2.94-5.8c-.66-2.72-6.46-8.29-9.25-8.88a6.34,6.34,0,0,1-3.38-1.76c-.81-1-1.25-1-5.14,0-3.52.88-4.62,1.54-5.95,3.6-3.52,5.5-3.23,5.36-6.09,3-2.42-2.06-2.57-2.42-2.64-7.12s-.22-5.14-2.57-7.12A21.63,21.63,0,0,0,232.81,12c-7.27-2.13-12.26-.07-19.74,8.22l-5.21,5.72-4.11-1c-4-.88-4.26-.88-8,1.25-3.38,1.83-4,2.57-5.14,6a44.88,44.88,0,0,0-1.76,8.51c-.37,4-.22,4.7,1.17,6.09A5.46,5.46,0,0,0,193,48.37a2.69,2.69,0,0,1,1.91.66c.44.81-1.1,4.48-2,4.48-.29,0-.59.51-.59,1.1,0,1.39-1,1.39-2.2,0-.88-1-1.91-1-6,.15-1.83.44-1.69,3.89.44,9.84l1.69,4.92-1.54,1.83a29.11,29.11,0,0,1-5,4.11c-2,1.32-3.52,2.79-3.52,3.3,0,2.5,2.35,8.22,4.11,10.06,2.35,2.42,3.16,2.57,6.24,1,2-1.1,2.28-1,3.82.37a29.45,29.45,0,0,0,4,3c2.13,1.32,2.28,1.69,1.61,3-.51,1-.66,3.52-.37,6.75.22,2.86.44,6.83.59,8.88s.37-.44.59-5.5l.37-9.17,1.61,2.72c1.1,1.91,2.2,2.72,3.67,2.94,1.91.22,2.06.51,2.5,3.82.22,2.06.88,4,1.61,4.4s1.83,2.64,2.72,4.84a60.51,60.51,0,0,0,3.23,6.9,80.78,80.78,0,0,1,4.11,10c1.32,3.82,2.72,7.71,3.16,8.59a3.51,3.51,0,0,1-.07,3.3c-.66,1.54-6.53,15.49-9.17,21.87-1.47,3.74-8.29,10.79-12.26,12.84-4.55,2.35-11.74,8.22-11.74,9.69,0,.66,1.32,2.94,2.94,5.14,2.13,2.79,3.45,3.89,4.77,3.89a2.2,2.2,0,0,1,2.2,1.39c.37,1.25-4,13.14-5.72,15.34-1,1.17-16.51,6.09-29.87,9.39-5.8,1.47-12.18,3.3-14.17,4s-3.82,1.25-4,1,.37-13.21,1.32-28.84,1.76-30.75,1.91-33.54c.44-10.72,2.64-47.78,2.94-49.25a2.65,2.65,0,0,1,1.83-2c.88-.22,1.39-.81,1.17-1.39a6.77,6.77,0,0,1,.59-3.23c.51-1.32.73-2.64.44-2.94-2-2.28-2.94-11.08-1.39-12.62s-2.2-3.16-4.4-1.69c-.66.37-1,2.2-1.1,4.62-.15,3.82-.37,4.33-3.82,8s-4.11,4-8.07,4.77a79.2,79.2,0,0,1-11.6,1c-5.8.07-7.27-.15-7.56-1a2.27,2.27,0,0,1,.44-2.2c1.25-1.47,2.2-11,1.39-13.8a40,40,0,0,1-.73-7.41c-.07-3.89.15-5.28,1-5.95s1-1.1.37-1.69c-1.32-1.32-.07-2,2-1,3.38,1.54,5.58,1.1,6.46-1.32.44-1.25,1.32-2.28,2-2.28s1.76-.15,2.57-.22c1-.07,1.54-.81,2-3,.88-4,1.54-4.48,4-2.57s7,1.83,7.41-.15c.15-.66-.88-2.42-2.13-3.89-1.91-2.13-2.5-3.6-2.94-7.12a15.2,15.2,0,0,0-8.07-12.11c-4.26-2.35-7.63-2.13-13.21.66-4,2.06-5,3-6.68,6.09-1.25,2.35-1.76,4.33-1.54,5.58a5.94,5.94,0,0,1-.44,3.45c-.66,1.32-1.39,1.47-5,1.25-2.35-.15-5.58-.51-7.27-.73-2.5-.44-3.82-.07-8.51,2.13a24.12,24.12,0,0,0-8.15,5.58,16.19,16.19,0,0,1-2.94,2.94,18.49,18.49,0,0,1-3-1.69c-3.38-2.35-10.42-3.82-13.14-2.79a27.66,27.66,0,0,1-7.19.81c-4,0-5.8.37-8.07,1.61-6.09,3.45-15.71,14.24-16.51,18.57-.51,2.86.88,6.31,4.33,10.94a18.14,18.14,0,0,1,3.16,5.95,4.89,4.89,0,0,0,1.76,3.3,3.83,3.83,0,0,1,1.61,2.35,2,2,0,0,0,1.83,1.91,1.65,1.65,0,0,1,1.69,1.83c0,3.45,2.42,11.45,4.11,13.36A7.48,7.48,0,0,1,49.18,133c0,1.39.07,1.39,1.32.29A4.82,4.82,0,0,1,52.33,132c.29,0,.44,2.57.29,5.65-.15,5.28,0,5.72,1.32,5.72a1.64,1.64,0,0,0,1.69-1.61c.22-1.25,0-1.54-.88-1.25s-1.17-.07-1.17-2.35c0-4.4.66-4.92,4.48-3.6,4.33,1.54,5.06,2.72,5.06,8.37,0,8.66-1.54,27.52-2.64,31.63a22.19,22.19,0,0,0-.37,9.17l.59,5.14L56.59,199c-2.94,7.19-4.48,10.13-5.28,10.13-1.47,0-2.5,3.45-1.47,4.62.44.59-1,5.06-4.48,13.36C42.57,233.92,37,247.64,33,257.48s-7.41,18.06-7.56,18.28a57.83,57.83,0,0,1-6.09,1.76c-7.63,1.91-9.25,3-8.66,5.72.51,2.28.66,2.28-5.43,3.23C2.42,287,0,288.74,0,290.28c0,.59.81,1.54,1.83,2.2,1.54,1,2.94,1.1,7.56.73,5.87-.51,32.73-5.36,43.3-7.85,22-5.06,52.26-17.76,86.75-36.4,33.4-18,41.1-20.84,63.78-23.41,14.9-1.61,20.33-3.45,55.34-18.2,26.5-11.16,39.85-15.27,44.18-13.65,5.14,2,9.61.51,20.18-6.61,13-8.73,23.19-12.33,40.44-14.31,22.31-2.57,59.45-11.38,70-16.66,5.5-2.79,7.49-5.65,6.24-9-1-2.64-3.3-3.23-8.07-2.2s-21,.44-24.44-1a15.1,15.1,0,0,0-4.48-.81h-2.42l-.81-14.17c-.51-7.71-.88-15.85-.88-18,0-3-.59-5.06-2.86-9.54-2.86-5.65-5.95-15.19-5.95-18.57a10.25,10.25,0,0,0-1.47-4.18,9.77,9.77,0,0,1-1.47-3.38c0-.51,1.32-2.79,3-5.14,2.42-3.38,3.3-4.11,4.48-3.67,2.28.66,6.46-3.67,6.46-6.75,0-1.32.44-2.5,1-2.72s.66-.66.07-1.69-1.69-1.39-3.67-1.39-4.18-.81-7.27-2.79c-7-4.33-6.68-3.74-7.27-11.89-.66-9.17.51-8.59,2.13,1.1,1.17,6.68,2,8.88,3,7.85.22-.22.07-2.57-.37-5.14a58.89,58.89,0,0,1-.81-8,8.46,8.46,0,0,0-1.47-5.21c-1.91-2.42-1.83-2.72.59-2.72,1.61,0,2.28-.51,3.16-2.42.66-1.47,1.61-2.42,2.72-2.57s1.61-.73,1.61-2.2a7.65,7.65,0,0,1,1.1-3.6c1.25-1.76,1.1-9.32-.15-11.6C394.36,3.45,386.72-.14,385,0A21.14,21.14,0,0,0,381.88.74Zm-4.26,110.09c1.1,2.06,1.1,3.67-.07,19.74l-1.25,17.54-8.51,2.94c-4.7,1.54-8.59,2.79-8.66,2.72a18.55,18.55,0,0,1,1.76-3.08c2.57-3.74,9-18.06,11.89-26.5,1.54-4.62,2.28-8,2.28-11.16C375.05,108.12,375.86,107.38,377.62,110.83ZM358,115.38a29.7,29.7,0,0,1-3.45,7.56c-3.82,6.17-18.94,26-19.82,26-.37,0-1-.66-1.47-1.54-.88-1.61-2.06.07,16.51-24,4.4-5.72,8.15-10.42,8.37-10.42A5.75,5.75,0,0,1,358,115.38ZM145,142.47c-.73,14-1.54,24.66-2,24.88s-.51,1.69-.22,3.52c.73,4.55-1.91,57.91-3,59.38-.66,1-1.1,1-1.91.29-.59-.51-2.86-1.17-5-1.61a18.42,18.42,0,0,1-4.92-1.54c-1.61-1.39-1.1-7.34,1.54-15.78a109.69,109.69,0,0,0,3-11.3c.22-1.83,1.1-7.27,1.83-12.11s1.83-12.92,2.28-18c.73-8.22.66-9.47-.44-12.33-1.47-3.6-7.71-9.25-13.43-12.18a55.85,55.85,0,0,1-7.85-5.5c-2.35-2.06-4.7-3.74-5.21-3.74a5.94,5.94,0,0,1-2.57-1.39l-1.69-1.32L108,131a25.47,25.47,0,0,0,3.89-5.28c1.1-2.42,1.32-2.5,5.14-2.5,2.28,0,7.63-1,12.26-2.35,7.12-2,15.78-3.6,16.66-3C146.13,118,145.69,129,145,142.47ZM70,150.17l4.18,6.31-1.17,3c-3.82,9.69-10.28,25.1-10.79,25.69-.29.44-.59-1.1-.59-3.3,0-3.16.37-4.62,1.83-6.53,1.25-1.69,1.61-2.72,1.1-3.23s-.73-5.36-.73-11.82c0-11.16.51-16.51,1.47-16.51C65.62,143.79,67.74,146.65,70,150.17ZM225.1,175.86c-.51,9.32-1.39,13.73-3.3,16.37-1.25,1.61-1.61,3.23-1.61,6.46,0,2.35.37,4.62.81,5.06s-.81,1.32-4.92,2.72c-5.14,1.69-5.5,1.76-4.33.44s1.17-1.54-.37-4.18a25.14,25.14,0,0,1-2.28-7.19c-.51-3.74-.44-4.7.73-6.24,2.94-4.11,3.89-6.61,2.86-7.85-.81-1-.07-2,5.28-6.9,3.45-3.23,6.53-5.8,6.83-5.8S225.32,172,225.1,175.86ZM110.61,174c.66.51.51,1.25-.59,3s-1.39,3.74-1.39,8.73c0,7.49-2.2,16.07-6.24,24.73a34.67,34.67,0,0,0-2.57,6.39A20.17,20.17,0,0,1,98,221.73a17.36,17.36,0,0,0-1.83,5.87c0,1.1-.37,2.06-.81,2.06s-.66.88-.51,2c.22,1.83.66,2.13,4.62,2.94a54.27,54.27,0,0,0,7.19,1c3.23,0,12.26,2.13,12.26,2.86,0,.29-2.2,1.54-4.84,2.86s-10.2,5.8-16.73,10-13.21,8.29-14.9,9.17c-2.94,1.47-3.16,1.47-3.16.22,0-2.2-1.61-3.08-5.8-3.08-4.4,0-6.24-1-8.44-4.48-1.1-1.76-1.1-2.06,0-4.26a8,8,0,0,1,3.3-3.3c3.38-1.39,5.95-5.87,11.3-19.52,4.33-10.94,5.58-13.43,8.51-16.59,4.55-4.92,6.24-8.44,11.3-23.93l4.18-13.06,3.08.44A13.73,13.73,0,0,1,110.61,174ZM65.69,188.34a47.46,47.46,0,0,1-2.2,9.39c-.88,2.42-3.23,8.51-5.14,13.58s-4.11,12-4.92,15.41c-1.76,7.49-2.72,9.39-5.58,11.52a6.81,6.81,0,0,0-2.72,4.4,18.84,18.84,0,0,1-1.69,4.84c-1,1.61-1,2.28-.37,3.45s.73,1.91-.07,3.82-2.64,13.87-2.64,17c0,.51-11,2.86-11.45,2.5s22.53-56.59,23.71-57.91A11.17,11.17,0,0,0,54,213.15c.59-2.72,11.38-29.73,11.82-29.73C66.06,183.42,65.91,185.62,65.69,188.34Z"/>
                        <path id="dancing" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M140,.26a18.18,18.18,0,0,1-3.39.44c-3.39.1-9,3.88-13.81,9.4-3.92,4.51-4.36,5.23-6,10.27-2.47,7.51-3,10.17-3.25,17.83-.39,9.2-.63,9.79-4.07,9.79-2,0-2.66.19-3.1.92-2.86,4.8-5.33,7.75-6.25,7.46a3.2,3.2,0,0,1-1.07-1.26A1.8,1.8,0,0,0,97.13,54c-1.84,0-6.69-1.79-7.17-2.71a1.51,1.51,0,0,0-1.26-.68,1.89,1.89,0,0,1-1.4-1.21c-.63-1.4-2.08-1.55-4-.48a11.24,11.24,0,0,1-4,.73c-3.05,0-5.33,1.11-5.91,2.86-.19.63-1.11,1-3.49,1.45-4.41.82-6.54,1.74-6.35,2.81.15.73,1.4,1.65,3,2.23.53.19-.73,2.28-1.4,2.28-1,0-7.8,3.54-10.17,5.28-1.31,1-3.05,2.18-3.88,2.66a49.53,49.53,0,0,0-7,6.35C42.2,78,31.64,88,29.89,89.11a33.9,33.9,0,0,1-4.7,2,32.08,32.08,0,0,0-4.8,2.08,44.41,44.41,0,0,1-4.12,2.08c-3.34,1.45-4.7,2.66-8.62,7.46C3.44,108,0,115.66,0,120a24.45,24.45,0,0,0,1.94,7.51c2,3.1,11.77,5.67,24.27,6.25l6.1.29,6.06-2.42c5.81-2.33,9.35-3.92,17.25-7.7,3.63-1.7,4.46-1.74,4.46-.1a37.19,37.19,0,0,0,.68,4.46c.34,1.94.92,5.67,1.26,8.33a58.77,58.77,0,0,0,1.55,7.75A41.9,41.9,0,0,1,65,150.3a22.78,22.78,0,0,0,1.36,5.09,25.32,25.32,0,0,1,1.5,5c.29,1.6.87,4.17,1.26,5.67.87,3.54.87,4.6,0,7.22a47.13,47.13,0,0,0-1.26,8.28c-.24,3.44-1,9.4-1.65,13.32-1.84,10.71-1.74,11.29,1.74,11.29h1.4v3.29c0,2.33-.63,5.77-2.28,12-2.23,8.62-2.28,8.82-2.28,16.47,0,7.07.15,8.14,1.36,12.11a75.21,75.21,0,0,0,10.51,20.69c6.3,8.77,8.19,12,8.19,13.71a10.37,10.37,0,0,0,.73,3.29,11.52,11.52,0,0,1,.73,3.59,10.85,10.85,0,0,0,1,3.88,21.57,21.57,0,0,1,1.26,4.26c.29,2.23.29,2.33-2.08,4.75a35.33,35.33,0,0,0-7.46,10.76c-1.84,3.83-2.13,4.75-2.08,7.51,0,3.68,1.7,7.75,5.38,13.18l2.23,3.29-1.4,2a17.93,17.93,0,0,1-3.34,3.59C78,345.93,75.24,349.12,67.44,359c-1.26,1.6-3.49,4.84-4.94,7.17-2.71,4.31-15.5,23.69-18.65,28.24-1.7,2.42-4.65,5.43-12.06,12-3.59,3.2-8.43,9.5-12.35,16a15.51,15.51,0,0,1-3.63,4.17c-3.2,2.37-9,11.92-10.46,17.44a29.08,29.08,0,0,0-.73,5.14l-.15,3,2.28,1.21c1.21.68,4.17,2,6.54,3a32,32,0,0,1,5.09,2.42c1.11,1,5.67,3,8.53,3.63,2.13.48,2.91,1.11,6.44,4.8a40.2,40.2,0,0,1,4,4.51c0,.19.73.58,1.6,1l4,1.7c3.05,1.4,11.14,3.54,13.61,3.63,4.89.15,14-1.65,17.68-3.49,2-1.07,4.26-3.73,4.26-5.14,0-1.84-4-4-7.41-4-2.66,0-9.54-2-10.08-3a43.85,43.85,0,0,1-1.89-9.79c0-1.7.15-1.89,2.08-2.71s2.23-1.21,3.29-3.92c1.21-3.1,1.4-3.34,5.52-6.83a151.13,151.13,0,0,0,15-15.7c4.94-6.59,7.95-10.66,8.82-12.11.53-.82,1.65-2.47,2.52-3.63,1.89-2.57,4.26-6,6.69-9.69l2.66-4a5.39,5.39,0,0,0,.92-1.7,5.88,5.88,0,0,1,1-1.6,62.08,62.08,0,0,0,4.89-7.22c2.08-3.59,1.89-3.73,8.58,6,5.47,8,12,24.85,14.39,37.3,1.16,5.86,2,10.27,2.86,14s.73,4.65-.78,4.65a8.5,8.5,0,0,0-2.81.92,12.47,12.47,0,0,1-3.49,1.21c-1.45.24-1.89.63-2.57,2.13a11.89,11.89,0,0,0-.87,3.49c-.15,1.5,0,1.79,1.65,2.57a19.27,19.27,0,0,0,4.36,1.36c3.49.68,12.16,1.11,13.81.68s9.83-8.62,10.9-10.9c.48-1.07.87-3.73,1-7.36.34-6.54.82-7.95,2.37-7.12,1.79,1,5.09,4.26,7,7s2.91,3.25,4.21,1.79c1-1.11,1.07-2.23.15-3a12.57,12.57,0,0,1-1.74-3.78c-.53-1.79-1.16-3.83-1.4-4.6-.68-2,.1-1.55,1.74,1,1.79,2.91,5.86,9,7.22,11a54,54,0,0,0,4.6,5c2,1.94,4.36,4.26,5.28,5.23a6.92,6.92,0,0,0,2.23,1.7c1.11,0,2.62,2.52,2.62,4.31a6,6,0,0,0,.73,2.81c1.65,2.33,12.11,7.07,18.89,8.58,2.76.63,3,.63,4.84-.44q2-1.16,2.91-.73c2.62,1,23.21,3.29,28,3.15a22.51,22.51,0,0,0,12.06-3.78c1.89-1.26,2.33-1.79,2.33-3a5.29,5.29,0,0,0-.73-2.52c-.39-.53-3.83-2.57-7.61-4.41-5.57-2.76-7.7-4.12-10.76-6.88-4.8-4.26-8.58-9-10.56-13.08-2.33-4.75-5.91-8.53-12.64-13.23-7.46-5.18-7.95-5.72-8.58-8.77s-4.7-10-7.8-13.32c-3.73-4-6.69-8.24-7.22-10.37a64.31,64.31,0,0,0-3.39-9.3,14.13,14.13,0,0,1-1-2.42,40.47,40.47,0,0,0-2.13-4.84,30.43,30.43,0,0,1-3.63-10.17,24.13,24.13,0,0,0-2.18-6.25c-1.31-2.52-1.74-3.92-1.74-5.77a12.92,12.92,0,0,0-1.7-6c-2.52-5.28-2.33-5.91,1.84-5.09a42.44,42.44,0,0,0,12.45.1c1.74-.24,6.88-.68,11.38-1,10.95-.78,25.53-2.33,31.49-3.44,2.66-.48,5.91-1,7.17-1.21l2.33-.29,3.25,3.05a80.1,80.1,0,0,0,14.29,10.37c1.36.73,4,2.28,5.81,3.44a78.81,78.81,0,0,0,7.27,4,37.78,37.78,0,0,1,6.39,3.78,54.73,54.73,0,0,0,5.67,3.68,142.28,142.28,0,0,1,13.42,8.87c1.21.92,4,3,6.1,4.65,9.45,7.07,8.09,6.2,19.14,13,3.68,2.28,7.65,5,16.13,11.14,2.76,2,9.93,9.3,11.38,11.58a101.7,101.7,0,0,0,15.84,18.41c4.21,3.88,9.4,10.17,9.93,12,1.07,3.83,4,6.88,10.37,10.71,2.57,1.55,8.82,3.49,11.34,3.49a10.31,10.31,0,0,0,6.44-3.49c.92-1.26,1-1.89.82-4.89a26.11,26.11,0,0,0-5.57-14.44,19.09,19.09,0,0,0-3.05-3.34,75.32,75.32,0,0,1-6.35-5.86c-3.29-3.2-6.83-6.39-7.8-7.07s-1.84-1.6-1.84-2-1.26-2.18-2.81-3.92a23.22,23.22,0,0,1-3.1-4c-.39-1-5.43-3.59-7.95-4-2.18-.39-5.47-3.39-9.35-8.53a194.46,194.46,0,0,0-12.89-15.31c-2.71-2.76-5.91-6.39-10.8-12.26-10.9-13.08-24.71-24.66-37-31.05-8.77-4.55-15.7-10.46-20.3-17.25A58.84,58.84,0,0,0,277.6,314a123.85,123.85,0,0,1-15.16-20.64,48.08,48.08,0,0,1-2.76-5A10.75,10.75,0,0,0,258,285.9a34.74,34.74,0,0,1-2.37-3.44,8.16,8.16,0,0,0-1.74-2.37,3.45,3.45,0,0,1-1-2.37A5,5,0,0,0,252,275a12.24,12.24,0,0,1-1.21-2.37,6.68,6.68,0,0,0-2-2.28c-2-1.5-4.6-5.28-4.6-6.64,0-1.07-2.71-3.83-3.73-3.83s-2.57-3-2.57-5.23-1.4-6.83-3.39-10.76c-.73-1.45-1.65-3.44-2.08-4.41a38.82,38.82,0,0,0-4.31-5.91c-1.94-2.33-4.7-5.81-6.1-7.85s-2.91-3.63-3.39-3.63c-.87,0-2.08-1.5-2.52-3.15-.15-.53-.53-1-.87-1l-1.07-.15c-.24,0-.48-.58-.48-1.21a6.91,6.91,0,0,0-2.52-5.18c-1.4-1.26-1.5-1.5-.78-1.89s.73-.92.53-2.42a4.34,4.34,0,0,1,.24-2.57,2.06,2.06,0,0,0,.29-1.65c-.39-1.5,2.62-2.42,5.14-1.6,3.25,1.07,4.75-.15,3.34-2.81-.58-1.07-.58-1.26.48-2,6.78-4.75,8.28-8.19,8.14-18.46-.15-9,.87-11.63,6.49-17,3.25-3.1,3.78-4.94,1.65-5.77-1.26-.48-5.77.58-6.3,1.45a1.25,1.25,0,0,1-1.07.48c-.82,0-.78-1.6.34-7.75.73-4.12.29-7.65-1.7-14-2.52-8-3.54-10.42-5.28-12.45-3.88-4.55-5.14-9.06-4.7-17l.29-5,2.28-2.28c2.52-2.47,2.62-2.47,6.3,0,1.79,1.21,3.1,1.07,5.81-.63,1.94-1.26,2.62-2.13,4-5,2-4.36,2.37-8.24.73-8.67-.78-.19-1-.48-.73-1.16a10.12,10.12,0,0,0,.44-1.31c.1-.39-1.4-1.4-2.71-1.89-.24,0-.19-1,.1-2.08a50.86,50.86,0,0,0,1-14.34c-.82-8.58-4.75-14.44-12.11-18-4.84-2.33-8.58-2.91-17.54-2.66-6.1.15-7.7.34-9.11,1.07-2.33,1.26-7.22,5.72-7.27,6.54A20.62,20.62,0,0,1,187.25,55a20.18,20.18,0,0,0-2.47,6c-.29,2-.53,2.42-2.47,3.63-4,2.47-6.93,4.94-6.93,5.86a5.77,5.77,0,0,0,1.74,2.66c1.7,1.7,1.74,1.79,1,3a4.63,4.63,0,0,0-.78,2.08,2.34,2.34,0,0,1-.73,1.55c-.53.44-.63,1.11-.44,2.42a3.64,3.64,0,0,1-.48,3,4.27,4.27,0,0,0,.34,5.38c1.11,1,4.65,2.47,10.32,4.26,4.46,1.45,4.75,2,4.94,8.58s-.19,8.48-2.76,14c-2,4.17-3.92,6.2-8.53,8.67-1.31.68-3.73,2-5.33,2.91-4.75,2.71-6.15,2.08-6-2.76,0-3.1-1.65-8.19-4.12-12.21a18.64,18.64,0,0,1-1.74-3.29c0-.68-4.89-7.75-8.58-12.35-2.76-3.49-3.78-5.23-4.55-7.75a29.82,29.82,0,0,0-2.52-5.72c-4.51-7.27-6.69-12.35-5.28-12.35a12.93,12.93,0,0,1,2.66,1.5c2.91,1.89,7,3.34,9.69,3.34s3.92-1.16,4.8-4a9.3,9.3,0,0,1,2.42-3.78c1.26-1.16,1.74-2,1.55-2.57s.1-.92.92-1.21,1.45-1.16,2-2.86a11.67,11.67,0,0,0,.68-3.05c-.1-.48.48-.68,2.18-.68,2.81,0,4-1.11,3.54-3.39-.15-.82-.48-2.76-.73-4.36a26,26,0,0,0-1-4.26c-.82-2.08-.68-2.62,1.21-4.7l1.79-1.94.19-6.59c.19-6.1.1-6.88-1.07-10.61-1.07-3.29-1.21-4.21-.73-5.09s.39-1.31-.87-2.86C166.12,9.13,151.25.84,143.6.07A10.12,10.12,0,0,0,140,.26Z"/>
                        <path id="dog" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M361.81,1.08c-8.2,2.67-10.33,6.5-8,14.46,1.15,4,.85,8.81-.67,10.51a6,6,0,0,1-2.8,1.52c-1.34.3-1.76.73-1.76,1.82a3.25,3.25,0,0,0,.91,2.13,1.82,1.82,0,0,1,.61,1.82,2,2,0,0,0,.61,1.82,1.88,1.88,0,0,1,.61,1.88c-.24.73-.06,1.28.49,1.52a2.4,2.4,0,0,1,1.28,1.7,11.07,11.07,0,0,0,2.19,3.4c2.13,2.37,2.25,3.4.79,6-1,1.76-1,2-.06,3.71l1,1.88-6.81,6.56c-8.51,8.26-11.06,12.28-11,17a46.15,46.15,0,0,0,1.4,8.39c2.07,8,1.88,9.36-2,14.1-5.29,6.38-29.84,30.38-36.52,35.61-3.34,2.61-7.29,5.77-8.81,7a27.93,27.93,0,0,1-6.32,3.59c-4.8,1.76-5,1.94-3.4,2.8,1.34.73,1.34.73-.79,2.07-3,1.88-3.71,4.19-1.88,6.26,1,1,.73,1.4-3.59,6.75-19.2,23.64-53.3,46.12-95.83,63.32C172.51,232.31,151,240,149.78,240c-.3,0-.55-.79-.55-1.7a2.29,2.29,0,0,1,1.52-2.43c1.82-.85,2.55-3.34,1.64-5.77a15.28,15.28,0,0,1-.3-5.59c.43-4.74.06-6.32-2.07-8.51-1.88-1.88-7.78-4.86-8.57-4.31-.3.18-.73,3.52-.91,7.47-.73,13.43-4.19,21-12,26.07-3.28,2.13-25.1,6.44-42.66,8.45a64.62,64.62,0,0,1-15.19.3C56,252.6,47.14,250.23,45.8,247.38a5.85,5.85,0,0,0-2.13-2.25,23.14,23.14,0,0,1-4.44-4.62c-5.47-6.87-9.54-9.6-15.13-10.09-6.68-.61-11.67,2.07-12.88,6.87-.61,2.43-1.09,2.92-5.65,5.77-5.65,3.65-5.89,4-5.41,6,1.34,5.47,7.23,7.47,14.71,5,4-1.28,5.53-.61,7.35,3.16,1.52,3.1,2,6.5,2.07,14.46.06,4.07.24,5.1.73,4.38,1.64-2.19,3.28.12,3.28,4.68,0,1.88.18,2.37.91,2.13.91-.36,3.34,2.19,3.34,3.52,0,.67.36.67,1.88.12,1.7-.67,2-.61,3,.73,2.37,2.86,1.28,11.36-2.49,19.39-3.28,7-5.41,9.84-8.33,11.12-3.22,1.4-3.89,2.8-2.13,4.25s5.47,1.94,8.33,1a5.77,5.77,0,0,0,3.65-3.22c1.09-2.07,1.52-2.43,3.1-2.37,1.76.12,1.88,0,1.82-2.13l-.06-2.19,2.92-.18,2.86-.18V309.3c0-4.38,1.22-5.83,4.56-5.41,2.13.24,2.19.18,1.88-1.28a41.18,41.18,0,0,1-.73-5.23c-.49-4.68.36-5.71,4-4.62,3.1.91,3.1.91,3.1-.85,0-1,.36-1.52.91-1.52s.91.73.91,2.86c0,3.34,2.25,8.69,4.74,11.3s4.92,3.65,9,3.71c4.56.06,6.32-1.15,6.32-4.25,0-2.49-1.64-3.59-4.56-3-1.82.36-2.13.18-3.28-1.64-1.58-2.55-1.58-2.86-.18-2.86,1-.06,1-.06-.06-.67-1.58-.91-2.86-3.83-2.86-6.62,0-1.34.12-2.43.3-2.43,1.34,0,3.89,2.07,4.56,3.59a7.48,7.48,0,0,0,1.7,2.61c.79.67.85.61.49-1-.49-2.07.55-5.59,1.88-6.08s3.16,1.15,4.13,3.52l.73,1.76.43-2.25c.49-2.67,2.13-2.92,3.89-.67,1.52,1.88,1.94,1.88,1.94,0s1.22-1.88,2.73.18c1.4,1.88,1.52,5,.55,13.55-.49,4.19-.91,5.77-2.31,7.72-1.82,2.67-5.59,5.59-7.23,5.59a13.06,13.06,0,0,0-3.16.85c-4.07,1.76-2,5.83,2.92,5.83,3.34,0,5.23-1.22,9.84-6.32,4.25-4.8,5.89-5.77,7.29-4.62.79.67.91.36.91-1.94a8.14,8.14,0,0,1,.91-3.89c.91-1.15.91-1.15,1.82,0s.91,1,.91-1.58c0-3.89.49-5,1.7-4,.79.67.91.61.55-.3-.43-1.15.79-1.4,2.55-.43a76.28,76.28,0,0,0,7.35,2.37c7.47,2.19,9.84,3.65,13.37,8.33,1.46,2,3.46,4.44,4.44,5.53,1.76,1.88,1.82,2,.79,3.52-2.25,3.4,0,5.59,4,4,1.76-.79,6-5,6-6.08a10,10,0,0,0-1.52-2.8c-1.88-2.8-1.88-3,.18-3.59l1.64-.43-1.82-.67c-2.86-.91-4-2.19-6.2-6.93-1.09-2.37-2-4.5-2-4.68a6.23,6.23,0,0,1,2.61-1l2.55-.79-2.61-.36c-3.46-.55-5.29-2-9.05-7.23-3.52-4.86-3.89-6.14-1.88-6.14H130l-1.28-.91c-1.88-1.34-3.1-5.29-3.52-11.55a59.66,59.66,0,0,0-.91-7.78c-.43-2.13-.36-2.25,1-2.25a6.83,6.83,0,0,0,2.55-.55A13.18,13.18,0,0,1,130,258a2.41,2.41,0,0,0,1.46-1.52,2.4,2.4,0,0,1,1.7-1.52,2.67,2.67,0,0,0,1.82-1.58,1.67,1.67,0,0,1,1.4-1.22c1.58,0,3.77-1.76,3.77-3,0-.73.79-1.34,2.43-1.82,2.31-.67,2.73-1.22,2.49-3.71-.06-.67,2-1.58,7.35-3.22,56.76-17.81,105.25-47.28,128.89-78.27,1.76-2.31,2.67-2.92,5.65-3.77a28.61,28.61,0,0,0,6.93-3.22,21.37,21.37,0,0,1,4.07-2.31c1.64-.24,24.13-17.62,36.4-28.2,4.44-3.71,8.14-6.81,8.33-6.81,1.34,0-3.1,24-5.65,30.63-.43,1.15-.36,1.76.24,2.31s.79,1.88.55,5a31.27,31.27,0,0,0,.67,9.05c2.86,13.73-.49,38.22-12.4,91.22-2.61,11.67-5.1,23.34-5.47,25.83-.91,5.41-1.34,6.14-3.71,5.65-1-.18-1.76-.06-1.76.3s.55.49,1.22.3a1.21,1.21,0,0,1,1.58.67c.55,1.46-.24,1.94-1.58,1.09-.73-.43-1.22-.49-1.22-.12s.67.73,1.52,1c1.46.36,1.52.43.55,1.52a5.6,5.6,0,0,1-2.8,1.46c-1,.24-1.64.55-1.46.73a3.35,3.35,0,0,0,2.13-.3c2.67-1,2.49.3-.73,4.25-4.68,5.77-8.33,7.72-21.21,11.18-1.52.43-3.52,3.22-3.52,4.92,0,1.88,1.4,2.37,8.69,3.16,8,.91,11.42.85,15.8-.3l3.77-1,1.64,1.88c1.52,1.7,2.13,1.88,5.47,2.07l3.83.12.73-4.8a38.56,38.56,0,0,1,1.64-7,60.21,60.21,0,0,0,1.88-9.18,124.78,124.78,0,0,1,4.62-18c1.94-6,7.47-24.49,12.4-41s8.93-30.14,9.05-30.2,1.82,2,3.77,4.8a132.39,132.39,0,0,0,17.81,21.21c16.65,16.59,29.9,23.15,61.13,30.45,3.4.79,3.65,1,3.46,2.43-.06.91.06,1.76.36,1.94s.49-.3.49-1a1.32,1.32,0,0,1,1.09-1.52c.91-.18,1.09.06.85,1.34-.18.85-.06,1.4.18,1.22a2,2,0,0,0,.55-1.52c0-1.46.49-1.46,2-.06.67.55,1,.67.79.3-1.4-2.49,5.29,1.22,9.48,5.17a20.3,20.3,0,0,1,4.13,5.77c1.58,3.77,3.4,7.9,4.68,10.57.91,1.94,3.52,3.46,5.41,3.1,1.7-.3,2.25-3.77,1.88-12.94-.24-6.75-.55-9.18-1.58-11.73-1.4-3.46-1.22-4.38,1.09-6.32,1-.85,1.28-1.76,1.28-4a10,10,0,0,0-.55-3.77c-.79-1.22-12.88-2.07-22.55-1.64-8.39.36-9.05.24-19.39-3.46-10.09-3.65-19.14-9.6-30.08-19.81-9.24-8.69-20.6-23.4-24.67-32-2.25-4.74-3.65-11.73-3.65-18.23s.61-9.05,4.07-17.5a60,60,0,0,0,3-9.24,7,7,0,0,1,1.15-3.4c1.22-1,1.15-1.34-1.88-9.05a80.61,80.61,0,0,1-2.73-7.6c0-.36,2.61-2.8,5.77-5.35,8.75-7.17,12.34-12.28,14.58-20.78,1.82-7.11.55-21-2.67-28.44C396.81,75.64,392.13,69.63,388,66c-1.94-1.7-3.59-3.28-3.59-3.59a8.62,8.62,0,0,1,1.82-2.25,5.23,5.23,0,0,0,1.82-4c0-2.07.12-2.19,2-2.19a4.47,4.47,0,0,0,3-1.09c1.22-1.28,1.34-5,.3-6.08-.55-.55-.43-1,.61-2.13,1.88-2,1.76-5-.24-6.26-1-.73-1.34-1.22-.91-1.64,1.58-1.58.18-5.71-2.25-6.56-.43-.18-.43-1.28,0-3.59.79-4.38.18-10.94-1.46-14.65s-5.35-7.17-10.76-9.84A22.69,22.69,0,0,0,361.81,1.08ZM385,88.65c3,6,3,16-.18,23.21-1.4,3.1-6.62,9.6-7.78,9.6-.79,0-1.88-4.8-1.94-8.2,0-2.43,3.77-16.65,7.23-26.92C382.71,85.18,383.69,86,385,88.65Z"/>
                        <path id="box" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M216.27,0C207.75-.11,196.33,5.71,192,12.36c-1,1.52-2.45,7.11-3.15,12.36-2.68,19.82-7.81,27.4-20.87,30.66s-20.87,10.73-29,27.16c-9.91,19.82-14.92,38.71-16.44,61.79-1.52,24.37-5.48,45-9.56,50.25a10.6,10.6,0,0,0-2.1,3.85c0,1.87-3.73,9.44-6.41,13.17-3.15,4.2-6.06,13.06-7,21-1,8.39,2.33,32.76,6.88,49,2.22,7.69,4.55,17.25,5.36,21.1,1.28,6.3,1.87,7.34,5.13,8.74,3,1.4,3.85,2.68,5,7.46,1.87,8.51,1.87,17.14-.23,20.05-1.28,1.75-6.3,4-16.44,7.23-20.52,6.76-18.65,5.6-44.19,26.93-3.85,3.15-7.81,5.83-9,5.83s-3.38,1.28-5.25,2.68c-7.81,6.53-21.57,15-29.5,18.19-5,2.1-9.91,5-11.89,7.23L0,410.61l2.8,4.78c14.92,26.12,19.35,32.76,28.45,42.44,2.56,2.8,5.25,5,5.95,5,2.33,0,5.13-3.85,4.43-6.3-1.75-7.34-3.26-20.52-2.68-25.18a14.72,14.72,0,0,1,4.2-9.21,24.4,24.4,0,0,0,4.2-5.71c1.17-3.26,12.12-11.89,14.92-11.89,3.15,0,5.48-2,5.48-4.66,0-1.28,3.26-3.5,9.56-6.41A196.56,196.56,0,0,0,95.13,384a207.66,207.66,0,0,1,34.63-16.67c17.25-6.76,17.6-7.23,20.52-20.17,1.28-5.95,2.68-13.17,3-16.09s1.52-9.68,2.56-15.16l1.75-10,5.48-2.45c10.26-4.55,12.59-4.43,20.52.82s21.45,17.84,23.9,22.38c1.4,2.8,1.17,4-2.56,12.82-2.33,5.36-5.83,14.69-7.81,20.75-3.38,10.26-3.73,12.47-4,29.15-.23,13.87-.7,18.77-2.1,21-.93,1.63-1.87,5.83-2,9.33-.23,7.69-4.08,24-7.34,32.06-2.33,5.48-3.61,19.24-2,20.87.35.35,4.55,1.28,9.33,2s9.56,1.75,10.61,2.33,15.16,1,31.13,1c24.72,0,29.15-.23,29.73-1.75,1.17-3.15-.47-4.78-8.39-8.51-14.46-7-24.72-13.06-29.26-17.49-2.91-2.91-3.85-29.73-1-32.41,1.28-1.4,1.52-2.91.82-6.65-.7-4-.12-7.46,3.15-18.07a267.63,267.63,0,0,0,6.3-26.23,95.18,95.18,0,0,1,7.69-24.72c5.83-12.47,7.46-19.24,6.18-24.13-.47-1.63-4.43-8.16-8.86-14.57s-9.21-13.52-10.61-16.09-5.36-9.09-8.86-14.46-6.53-10.49-6.53-11.19a56.28,56.28,0,0,0-1.75-7.23c-1.52-5.13-3.26-7.11-14.57-17.25C185.49,228.86,182,225,182,223c0-3.5-3.85-10.61-7-12.82-2.22-1.52-2.33-2.45-1.63-11.78A73.34,73.34,0,0,1,180,171.15l2.45-5.36,3.38,2.8c2.91,2.45,4.31,2.8,11,2.45,7.11-.47,7.93-.7,11-4.43,4.66-5.48,16.67-23,19-27.63a46.24,46.24,0,0,1,6.53-8.51,67.71,67.71,0,0,0,7.81-9.91c2-3.15,4.43-5.48,6.18-5.95,5.48-1.28,21.57-12,24.37-16.21,4.78-6.88,3.38-19.47-2.91-27.75C263,63.07,255.67,59,249.26,59.81c-2.68.35-6.18.82-7.81,1-2.56.35-2.91-.12-3.26-3.61a7.38,7.38,0,0,1,2.1-6.41c1.75-2,2.56-4.78,3-10.73.35-4.43,1.28-9.21,2-10.73,2.68-5.6-8.51-20.52-20.05-26.46A28.37,28.37,0,0,0,216.27,0ZM200.53,76c3-1,3.61-.93,4.2,1,.47,1.17,3,3.61,5.95,5.25,4.9,2.91,5.36,2.91,8,1.17,1.63-1,2.91-3,2.91-4.43s.35-2.22.7-1.87c1.17,1.28,1.17,16.67,0,18.19-.7.82-3,3.5-5.13,5.83-6.41,7-9.91,13.87-9.21,17.6.58,2.68.12,3.73-2.68,5.83a29.87,29.87,0,0,1-3.85,2.45c-.35,0-.82-2.8-1.17-6.18s-1.28-10.26-2-15.39c-2.22-17.6-2.68-22.5-1.87-25.42A6,6,0,0,1,200.53,76Z"/>
                        <path id="horse" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M336.38,1.51a24.91,24.91,0,0,0-5.84,4.36,75,75,0,0,1-5.65,5.28c-2.89,2.46-2.89,2.46-4.55,1.35-1.29-.8-3.07-1-8.17-1.11-6.14-.06-7.13-.31-17.57-3.62C278,2.49,272.61,1.2,265.42.83c-6.08-.31-6.82-.25-12.1,1.54a104,104,0,0,0-10.63,4.42c-4.42,2.21-5.28,2.46-7.93,2.09-3.87-.49-5.16.25-7.43,4.3a28.3,28.3,0,0,1-6.39,7.07l-4.55,3.81L214.49,31c-3.56,12.9-3.19,16.16,2.64,22.12,4.73,4.85,11.37,9,29.25,18.25l16.28,8.48L262.59,84c-.06,2.27-.37,7.5-.61,11.55l-.55,7.37-3.38.49c-4.92.74-14.32.06-20-1.41-2.7-.74-8-2.58-11.92-4.06-7.8-3.07-8.23-3-9.65,1.17-.61,1.78-.92,2-3.69,2.15a55.52,55.52,0,0,1-9.34-.8c-7.31-1.23-9.09-1-13,1.54-2.52,1.6-3.07,1.72-4.92,1.23-1.17-.37-10-.8-19.66-1-16.77-.43-17.69-.37-22.36.92-8.66,2.4-26.11,11.49-37.72,19.72a89.66,89.66,0,0,0-16.1,15C86.63,141.78,86,142.08,67.58,149c-10,3.75-14.19,5.65-19.66,8.85a28.17,28.17,0,0,1-5.22,2.21c-1.66.43-2.52,1-2.7,1.84-.12.68-2,3.07-4.06,5.35-3,3.26-5,6.33-8.91,14.07-5.47,10.69-7.86,13.95-12.23,16.28L12,199.16l2.33-.31a17.52,17.52,0,0,0,5.22-2c4.3-2.58,5-2.76,5-1.54,0,1.66-3.13,6.27-6.08,8.91-6.45,5.78-10.75,7.13-15.85,5C.06,208.13,0,208.13,0,208.87c0,.31,1.47,1.54,3.19,2.76,6.51,4.42,15.67,5.47,22.67,2.52a51.13,51.13,0,0,1,5.28-2c4-.92-1.23,4.92-6.82,7.56-4,1.9-4.12,2-2.52,2.46,4.73,1.17,13.82-5.59,24.82-18.49,7.8-9.09,10.57-13.09,11.43-16.28a31.86,31.86,0,0,1,1.17-3.62c.74-1.17,2.7-.74,4,.92,1.54,2,1.66,4.85.31,9.46-.49,1.84-1.11,4.18-1.29,5.22-.37,1.66-.31,1.78.68,1a14.19,14.19,0,0,0,2.4-3.38l1.29-2.52.37,2.09c.25,1.72.43,2,1,1.23.92-1.17,2-5.71,2-8.72s1-2.95,2.27,0a10.66,10.66,0,0,1,.55,5.53c-.18,1.84-.12,3.26.18,3.26.8,0,1.29-1.66,1.29-4.61,0-3.26,1.47-4.92,2.83-3.07,1.23,1.66,1,5-.43,8.11S72.81,203,64,206.23c-6.27,2.33-6.33,2.4-4.61,3.13,4.12,1.72,8.29.25,18.31-6.51,2.58-1.72,5-3,5.35-2.83a2.73,2.73,0,0,1,.55,1.84c0,1.9-2.46,3.81-6.57,5-3.69,1-4.18,2.52-.74,2.21,4.85-.49,8.6-3.32,12-9.15,1.41-2.46,1.6-3.5,1.66-8.42.06-6.7-.86-9-7.19-18.31-5.1-7.5-5.53-9.4-3.19-13.89,2.21-4.24,5.78-6.76,8-5.78,1.35.61,1.54,1.11,1.54,3.81,0,9.46,2.27,21.44,5.41,28.26,3.32,7.31,6.64,10.94,18.31,19.78,11,8.36,12.35,9.09,27.09,15.11,10.57,4.3,15,11.18,12.17,19.17a16.59,16.59,0,0,0-.92,4.24c.06.86-1.11,5.1-2.58,9.34-2.46,7.37-2.52,7.93-1.78,10.44.55,1.84,2,3.81,4.73,6.57l3.93,3.93-1,2.95c-.86,2.7-.86,3.13.06,5.16,1.35,2.89,3,4.06,16,11.12,24.51,13.39,36.31,21,43.93,28.39,3.93,3.81,6.33,5.59,8.85,6.64,6.64,2.7,9,5.65,9.89,12.1a6.21,6.21,0,0,0,2.52,4.73c2.15,1.9,9.09,4.42,12.72,4.61l2,.06-.06-3.87c-.06-2.15-.37-4.18-.74-4.55a2.9,2.9,0,0,1-.74-1.84c0-1.72-2.21-5.71-5.84-10.57-4.18-5.65-5.41-8.11-5-10,.55-2.21-4-15.36-8.54-24.64l-3.81-7.86-12.84-6.39c-7.07-3.5-16.28-7.86-20.52-9.71-12.41-5.35-13.52-6.45-12.29-13a68.4,68.4,0,0,1,1.54-6.7,67.72,67.72,0,0,0,1.6-10.94c1.23-15.11,4.85-32.69,7.56-36.74,1.72-2.52,3.13-2.76,5.16-.92.92.8,6.39,5,12.23,9.34,11.24,8.29,15.3,10.44,25.68,13.46,11.86,3.44,13.39,3.69,28,3.81,17.26.12,29.49,1.54,34.16,3.81,4.3,2.09,9.52,6.33,21.75,17.57,20.28,18.68,20.71,19.23,19.54,22.67-1.29,3.69-6.27,6.21-19.11,9.77a54.43,54.43,0,0,0-14.5,5.71c-9,5-9.52,5.16-14.25,3.26-6.39-2.58-8.6-2.7-12.47-.8a14.78,14.78,0,0,0-7.37,7.93c-1.41,3.32-1.66,5.59-.74,6.76s1.29,1,6.08.37c3.69-.49,5.78-.55,7-.06,1.41.43,3.38.31,8.23-.61,5.53-1,7.07-1.11,11.49-.49l5.1.68,6.27-3.32c3.44-1.84,10.44-5.9,15.48-9.09a158.63,158.63,0,0,1,14.75-8.23,50.2,50.2,0,0,0,6.7-3.32c2.09-1.84,3.62-5.78,3.93-10.2s.25-4.36-3.69-12c-2.15-4.24-5.84-10.63-8.11-14.32s-4.06-7-3.87-7.43,2.15-.92,6.39-1.17a146.3,146.3,0,0,0,15.73-2.21c8.85-1.72,10.51-1.9,18.43-1.6,9.58.31,10.75.8,12.1,5,.55,1.66.43,2.52-.92,5.71-1.54,3.62-1.54,4-1.54,19.11,0,13,.18,15.73,1,17.33,1.41,2.7,1.35,9-.06,11.37a8.7,8.7,0,0,1-2.76,2.83c-4.12,2.46-2.89,10.57,2.76,19.17,2.15,3.19,5.41,5.78,6,4.73.18-.25,1.17-3.19,2.27-6.57,1.78-5.41,2.09-7.31,2.46-15.67.37-7.56.74-10.2,1.72-12.72a27.89,27.89,0,0,0,1.66-6.76,265,265,0,0,0,.37-31.83c-.8-10.63-.8-10-.49-12.6.31-2.83-.86-5-5-9.34s-6.27-5.1-25.62-9.34c-14.38-3.19-16.9-3.87-16.9-4.73a50,50,0,0,1,2.7-6,43.21,43.21,0,0,0,3.38-9,49.91,49.91,0,0,1,3.81-11.67,47.4,47.4,0,0,0,2.09-6.76c.49-2.4,1.23-5.47,1.54-6.94a19.85,19.85,0,0,0,.61-3.62c0-2.46,4.18-11.8,22.73-50.87,3.62-7.62,6-10.87,8.91-12.23,2.15-1,2.58-1,6.21-.18a103.44,103.44,0,0,1,16.53,6.27c4,1.78,4.49,2.27,6.14,5.41,2.76,5.28,5.16,6.21,11.06,4.36,4.12-1.29,5.59-.92,9.4,2.52l3.07,2.76,5.78-1.41c10.08-2.58,14.44-5.59,15.05-10.38a21.35,21.35,0,0,1,1.78-5.53,14.1,14.1,0,0,0,1.47-4.3c-.06-1-4.12-5.53-13.7-15.3-7.5-7.68-15.54-15.61-17.88-17.63a50.07,50.07,0,0,1-8.6-10.38c-3.13-4.73-4.92-6.88-6.33-7.56-2.21-1-2.52-1.66-1-2,1.84-.37-10.57-10.14-17.08-13.46-5.47-2.7-6.51-3.56-12.9-10.32-3.87-4.12-7.31-7.43-7.68-7.43-.92,0-1.47,2.89-1.47,7.19,0,3.56-.06,3.62-3.13,2.4-1.54-.68-1.78,1-.74,4.55.49,1.72.8,3.32.61,3.44a19.61,19.61,0,0,1-3.93,1.23c-4.92,1.23-6.14,2-7,4.06-.68,1.66-1,1.84-2.89,1.54-3.07-.55-5.78.18-6.14,1.54-.18.74-2.21,2.15-5.1,3.62-2.7,1.29-4.85,2.83-4.85,3.32,0,1.17-2.4,2.76-4.3,2.76a8.78,8.78,0,0,0-3.69,1.35L348.06,55l2,.55c2.83.86,2.46,2-1,3.26-3.13,1.11-3.44,1.6-4,6.39-.12,1.23-.55,1.6-2.09,1.72s-2,.49-2,1.72a2.08,2.08,0,0,1-1.54,2.09c-1,.37-1.41.92-1.17,1.47.49,1.35-4,2.58-5.84,1.6-.74-.37-6.51-1.72-12.78-3-6.82-1.41-11.61-2.7-11.92-3.19-1.35-2.21-.37-6,4.12-15.05,3.56-7.25,5.28-8.85,9.83-8.85,5.16,0,8.54,1.11,11.55,3.75,3.38,2.95,5.53,3.07,10.14.55a14.15,14.15,0,0,1,4.92-1.84c1.29,0,1.9-.61,3.13-2.89a89.85,89.85,0,0,1,5.47-8.11c7.31-9.71,8.66-15.3,5.35-22.3-1.9-4-7.68-9.83-11.55-11.55S340.38-.4,336.38,1.51ZM193.78,286.65a142.79,142.79,0,0,1,18.68,11.67c1.78,1.35,4.24,3.19,5.47,4.06,2.15,1.54,3.62,3.44,3.07,4s-5.16-1.41-10.2-4.06c-6.39-3.32-24.88-16.16-25.13-17.45C185.3,283.15,188.07,283.7,193.78,286.65Z"/>
                        <path id="guitar" style={{visibility: 'hidden'}} xmlns="http://www.w3.org/2000/svg" d="M144.23.19a47.24,47.24,0,0,1-6,1.17c-5.45.91-18.55,12.45-20.76,18.29-2.85,7.78-1,30.1,2.85,35.16.65.78,1,4.15.91,7.52s.52,6.75,1.3,7.52c1.95,1.95-.39,6.23-3.24,6.23-1.3,0-7.26,2.34-13.36,5.32-10.9,5.19-13.88,6.62-24,11-9,4-24.39,14.79-26.72,18.55a10.4,10.4,0,0,1-5.84,4.54c-5.06,1.3-18.81,9.21-23.48,13.49-2.08,1.95-7.39,6-11.68,9.08-8.82,6.36-16,17.77-13.88,22.18,1.17,2.34,6,6.62,18.81,16.35l6,4.54.78,15.18c1.82,38,16.48,67.59,37.49,75.37,12.19,4.54,18.81,4.8,30.36,1.43,9.73-2.85,10.12-2.85,11.42-.52,2.85,4.8,5.71,6.75,10.9,7.65s5.45,1,5.45,5.06c0,2.34-1.17,12.45-2.46,22.44s-3.5,27.63-4.67,39.44-3.5,34-5.32,49.3c-5.32,45.66-7,64.09-5.84,65.25.65.65,3.11.91,5.45.65,4.15-.39,4.41-.78,5.32-6.23.52-3.24,1.3-9.21,1.82-13.23.52-5.06,1.3-7.52,2.46-7.52,2.34,0,2.85-2.21,3.89-15.18l.91-10.77h9.47c10.51,0,11.55.78,14.79,10.64,2.08,6.49,12.71,15.83,21.66,19.07,8.43,3.24,13.23,3.37,17,.78,2.46-1.69,2.72-1.69,3.5,1a57.14,57.14,0,0,1,.78,10c0,9.34,1,10.64,7.26,10.12,4.15-.26,5.06-.78,4.8-3-.26-1.43-.65-10.77-1-20.76s-2.85-34.64-5.71-55l-4.93-36.71,4.41-12.58c2.46-6.88,5.58-13.75,7.14-15.31,3.63-3.89,11.42-19.72,11.42-23.35,0-2.59,1.43-1.95,13.36,7,7.26,5.45,15.18,11.29,17.51,13,4.15,3.11,4.15,3.24,3.5,11.81-.39,4.8-1,24.13-1.43,43.07-.65,29.71-1,35-3.11,38.92-2.34,4.54-5.06,23.35-6.1,41.64-.39,7.39-.13,10.12,1.3,11.29,1,.91,8.3,3,16.22,4.8s16.35,4,18.55,5.19c10.9,5.71,33.86,8.82,40.09,5.58,7.14-3.89,4.28-11.81-6.88-19.07-6.75-4.41-15.18-12.71-15.18-14.92a53.9,53.9,0,0,0-4.8-6c-5.71-6.23-7.14-10.25-4.8-13,2.59-3.24,5.58-13.49,7-24.78,1.3-10.51,1.82-25.69,3.24-81.21l.65-27.37-3.37-4.15a37,37,0,0,0-9.47-7.14,88.75,88.75,0,0,1-11.29-7.39c-2.85-2.34-11.42-9.21-18.94-15.31-15-12.06-26.59-18.81-44.5-25.95-6.36-2.59-11.68-5.45-11.55-6.23s.26-6.23.39-11.94l.13-10.38,5.06,3.37c7.26,4.67,19.07,5.71,25.17,2.21a62,62,0,0,1,10.9-4.8c3.5-1.17,8.17-3.89,10.25-6.1a45.66,45.66,0,0,1,7.91-6.49c3.37-2.21,4.15-3.5,4.54-8l.39-5.45,10.38-2.34c25.43-5.45,36.45-6.88,45.28-5.58,7.65,1.17,8.43,1.56,8.82,4.54.26,1.69,1.17,3.5,2.21,3.76,1.43.52,1.69-.26,1-3.37-.52-2.85-.26-4.15,1.17-4.67,4.28-1.69,5.84-.91,5.45,2.72-.26,2.59.26,3.63,2.08,4,3.89.78,5.84-2.21,2.85-4.41s-2.72-2.46,2.21-3.63c3.11-.78,3.5-.52,3.5,2.46,0,1.82.65,3.24,1.43,3.24s1.17-1.3.91-3.11c-.52-2.85-.13-3.24,5.19-4l5.71-.91-.91-4.67a83.25,83.25,0,0,0-2.85-11.16l-1.95-6.23-5.19.65c-3.89.52-4.8.39-3.76-.91,1.69-1.95.52-3.37-2.72-3.37-3,0-4.67,3.76-2.21,5.32q1.95,1.17-2.34,1.17c-3.37,0-4.28-.52-4.28-2.59,0-2.59-1.43-3.37-3-1.69-.52.39-.26,1.56.52,2.46,1.56,1.95,1.17,2.21-5.06,3.5-2.46.52-2.85.26-2.21-1.82.65-1.82.26-2.46-1.82-2.46-3,0-5.32,2.85-3,3.63.91.26-1.17,1.95-4.54,3.63-8,3.89-47.09,10.12-47.09,7.39,0-2.46-4.41-2.08-7.91.78-2.85,2.34-3.24,2.34-5.45.39-2.59-2.34-10.77-3.37-11.94-1.56-.39.65-.13,2.46.78,4,1.3,2.59,1.17,2.72-2.08,1.95-2.08-.52-4-.39-4.41.39s-6,2.08-12.06,3.11L209.87,169l-1.43-3.76c-.91-2.72-.91-4.41.13-5.58s1-2.85.13-5.32a84.79,84.79,0,0,1-2.85-11.42c-3.5-18-5.45-25.82-7-29.06-3.63-7-14.4-16.48-24.65-21.66-5.71-3-10.51-5.84-10.77-6.62s1.56-4.28,4-7.78c4.93-7.14,8.56-15,8.56-18.42,0-1.17,1.17-4.28,2.59-7a25.83,25.83,0,0,0,2.59-11.29c0-5.32.39-6.49,2.34-6.49,2.46-.13,6.75-3,6.75-4.54,0-7-16.35-23.35-26.72-27.11C158.24,1.1,146.44-.58,144.23.19Zm6.23,292c13.88,6.1,14,6.1,11.29,8.56a18,18,0,0,0-2.59,2.72c0,.13-2.34,5.84-5.06,12.58L149,328.41l-9.21.39c-6.88.26-9.21,0-9.21-1.3,0-.91.91-9.6,1.95-19.2s1.95-18.55,1.95-19.85.39-2.21,1-2.21S142.8,289,150.46,292.21Z"/>
                        </svg>
                    <Typography className="edit-profile__animation-title" align="center" variant="h4">
                        Get in touch with people and events you of your taste!
                    </Typography>
                </aside>
            </div>
        )
    }
};
const mapStateToProps = state => ({
    userProfileData: state.userProfile.userProfileData,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    editUserProfile: state.editProfile.editUserProfile,
    updateInput: state.editProfile.updateInput,
});

const mapDispatchToProps = dispatch => ({
    editUserProfileAction: (data, callback) => dispatch(editUserProfileAction(data, callback)),
    userProfileAction: id => dispatch(userProfileAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)( withSnackbar(EditProfile));
