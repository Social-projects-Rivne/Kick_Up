import React, { Component } from 'react';

import {
    Button,
    Fab,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    TextField,
    FormControlLabel,
    FormGroup,
    Switch,
    Paper,
    Typography
} from '@material-ui/core';
import { Visibility, Close, Home } from '@material-ui/icons';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { withSnackbar } from 'notistack';
import WYSWYGeditor from '../WYSWYGeditor/WYSWYGeditor';
import { convertFromRaw } from 'draft-js';
import PostCard from '../PostCard/PostCard';
import axios from 'axios';

const addPostSwiperParams = {
    containerClass: 'add-post__swiper',
    slidesPerView: 1,
    simulateTouch: true,
    autoHeight: true,
    speed: 800,
    noSwiping: true
};
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};

/**
 * post title;
 * post inner HTML;
 * post author;
 * post date;
 * option to mark post as pinned one;
 */

 let swiperInstance;

class AddPost extends Component {
    state = {
        authorId: this.props.user ? this.props.user.id : null,
        roomId: this.props.match.params.id,
        activeSlide: 0,
        title: {
            data: '',
            wasChanged: false
        },
        pinPost: {
            data: false,
            wasChanged: false
        },
        editorData: {
            data: null,
            wasChanged: false
        },
        editModeLoad: false,
        isEdit: false
    }
    setSwiper = instance => {
        if (instance) swiperInstance =  instance;
    }
    setPostPinned = () => {
        this.setState(prevState => {
            return {
                pinPost: {
                    data: !prevState.pinPost.data,
                    wasChanged: true
                }
            }
        });
    }
    togglePreview = () => {
        const slideTo =  swiperInstance.activeIndex === 0 ? 1 : 0;

        try {
            swiperInstance.slideTo(slideTo);
            this.setState({activeSlide: slideTo});
        } catch(err) {}
    }
    updateInputValue = (evt) => {
        this.setState({ title: { 
            data: evt.target.value,
            wasChanged: true
        }});
    }
    generatePostData = () => {
        let {authorId, roomId, editorData: text, title, pinPost: isPinned} = this.state;

        title = title.data;
        isPinned = isPinned.data;
        text = text.data;
        authorId = authorId ? authorId : this.props.user.id;
        text = JSON.stringify(text, undefined, 2);

        return {authorId, roomId, text, title, isPinned};
    }
    sendData = () => {
        const routes = {
            new: `/api/room/new-post`,
            update: `/api/room/${
                this.state.roomId 
                ? this.state.roomId 
                : this.props.match.params.id
            }/updatePost`
        };

        // Prepare data;
        let method = this.state.isEdit ? 'put' : 'post';
        let route = this.state.isEdit ? routes.update : routes.new;
        let data = {};

        if (this.state.isEdit) {
            if (this.state.title.wasChanged) 
            data.title = this.state.title.data;

            if (this.state.pinPost.wasChanged) 
            data.isPinned = this.state.pinPost.data;

            if (this.state.editorData.wasChanged) 
            data.text = this.state.editorData.data;
        } else {
            data = this.generatePostData();
        }
        
        axios[method](route, data)
        .then((res) => {
            // Redirect user to room page;
            this.props.history.push({ pathname: `/room/${this.state.roomId}` });

            // Show message;
            this.showToast('Your new post was successfully created', messageType.SUCCESS);
         })
        .catch((err) => {
            this.showToast('Something went wrong, please reload your page', messageType.ERR);
        });
    }
    setEditorData = (data) => {
        if (
            data.blocks.length > 1 ||
            data.blocks[0].text.length > 0
        ) {
            this.setState({editorData: {
                data,
                wasChanged: true
            }});

            if (this.state.editModeLoad) this.setState({editModeLoad: false});

            // After data saved, we need update swiper;
            swiperInstance.updateAutoHeight();
        } else {
            this.resetEditorData();
        }
    }
    resetEditorData = () => {
        this.setState({editorData: { data: null }});
    }
    checkAllFilled = () => {
        let res = false;

        if (
            this.state.title.data && 
            this.state.title.data.length > 3 &&
            (this.state.editModeLoad || this.state.editorData.data && this.state.editorData.data.blocks.length > 0)
        ) {
            res = true;
        }

        return res;
    }
    handleSubmitBtnClick = () => {
        let errMessages = [];
        const _delayTime = 200;

        // In case not all data are filled, show ERR messages to user;
        if (!this.checkAllFilled()) {
            // Define messages to be shown;
            if (!this.state.title.data) {
                errMessages.push('Give your post a nice title');
            }
            if (
                this.state.editorData.data &&
                (this.state.editModeLoad || this.state.editorData.data.blocks.length <= 0)
            ) {
                errMessages.push('Give your post a great description');
            }

            // Enque all err messages;
            errMessages.forEach((msg, itr) => {
                window.setTimeout(() => {
                    this.showToast(msg, messageType.ERR);
                }, _delayTime * itr);
            });
            
        } else {
            this.showToast('Working', messageType.INFO);
            this.sendData();
        }
    }
    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
        });
    }
    loadEditorData = (data) => {
        let { authorId, text:editorData, title, isPinned:pinPost } = data;

        try {
            editorData = convertFromRaw(JSON.parse(editorData));
            this.setState({ 
                authorId, 
                editorData: {data: editorData}, 
                title: {data: title}, 
                pinPost: {data: pinPost}
             });
            
        } catch(err) {}
    }
    componentWillMount = () => {
        console.log('PROPS ADD POST', this.props);

        // Fill editor with data;
        if (this.props.location.state && this.props.location.state.data) {
            this.setState({
                editModeLoad: true,
                isEdit: true
            });
            this.loadEditorData(this.props.location.state.data);
        }
    }
    render() {
        const { activeSlide, editorState } = this.state;

        return (
            <div className="add-post">
            <Button
                className={!this.checkAllFilled() 
                    ? 'add-post__submit-btn add-post__submit-btn_disabled' 
                    : 'add-post__submit-btn'}
                variant="outlined"
                onClick={this.handleSubmitBtnClick}
            >
                Add new post
            </Button>
            <Swiper {...addPostSwiperParams} getSwiper={this.setSwiper} >
                <section className="add-post__slide  add-post__slide_data-entry">
                    <form className="add-post__form" noValidate autoComplete="off">
                        <label className="add-post__title">To add new post, fill in fields below:</label>
                            <Stepper nonLinear orientation="vertical" className="add-post__stepper">
                                <Step 
                                    className={this.state.title.data && this.state.title.data.length > 3 ? 'add-post__step  add-post__step_filled' : 'add-post__step'} 
                                    key={0} 
                                    active={true}
                                >
                                    <StepLabel className="add-post__step-label">Title of your post</StepLabel>
                                    <StepContent>
                                        <div>
                                            <TextField
                                                required
                                                className="add-post__text-field"
                                                name="title"
                                                placeholder="Min 3 symbols, Max 100 symbols"
                                                onChange={this.updateInputValue}
                                                value={this.state.title.data}
                                                fullWidth
                                                autoComplete="off"
                                                inputProps={{ minLength: 3 }}
                                            />
                                        </div>
                                    </StepContent>
                                </Step>
                                <Step 
                                    className={
                                        this.state.editorData.data &&
                                        (this.state.editModeLoad || this.state.editorData.data.blocks.length > 0)
                                            ? 'add-post__step  add-post__step_filled' 
                                            : 'add-post__step'
                                    }
                                    key={1} 
                                    active={true} >
                                    <StepLabel className="add-post__step-label">Add your post details</StepLabel>
                                    <StepContent>
                                        <WYSWYGeditor editorSettings={{
                                            data: this.state.editorData.data ? this.state.editorData.data : null,
                                            dataUpdateCallback: this.setEditorData,
                                            toolbar: {
                                                //@todo add 'embedded';
                                                options: ['blockType', 'list', 'link', 'emoji', 'image'],
                                                blockType: {
                                                    options: ['Normal', 'H1', 'H2', 'H3', 'H4'],
                                                },
                                                fontFamily: {
                                                    options: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                                                }
                                            },
                                            wrapperClassName:"add-post__editor",
                                            editorClassName:"editor-class",
                                            toolbarClassName:"add-post__toolbar"
                                        }}/>
                                    </StepContent>
                                </Step>
                                <Step 
                                    key={2} 
                                    active={true}
                                    className={
                                        this.checkAllFilled()
                                        ? 'add-post__step  add-post__step_filled' 
                                        : 'add-post__step'}
                                    >
                                    <StepLabel className="add-post__step-label">Pin post?</StepLabel>
                                    <StepContent>
                                        <FormGroup className="add-post__text-field">
                                            <FormControlLabel
                                                label={this.state.pinPost.data
                                                    ? 'Pinned post will be shown in both "Feed" and "Pinned posts" sections'
                                                    : 'Unpinned post will be shown in "Feed" section only'
                                                }
                                                control={
                                                    <Switch
                                                        name="pinPost"
                                                        onChange={this.setPostPinned}
                                                        checked={this.state.pinPost.data}
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </StepContent>
                                </Step>
                        </Stepper>
                    </form>
                </section>
                <section className="add-post__slide  add-post__slide_data-preview">
                    {
                        this.state.editorData.data &&
                        !this.state.editModeLoad &&
                        <div>
                            <Paper className="add-post__preview-info" >
                                <div className="add-post__preview-info-wrapper">
                                    <Home />
                                    <div>
                                        <Typography variant="h5" component="h3">
                                            Post preview
                                        </Typography>
                                        <Typography component="p">
                                            Your post will look exactly same as is shown below
                                        </Typography>
                                    </div>
                                </div>
                                
                            </Paper>
                            <PostCard data={(() => {
                                let res = this.generatePostData();

                                // Add user data;
                                if (this.props.user) {
                                    let { avatar, first_name : firstName, last_name : lastName } = this.props.user;
                                    res.author_details = { avatar, firstName, lastName };
                                }

                                return res;
                            })()} />
                        </div>
                    }
                </section>
            </Swiper>
            {
                this.checkAllFilled() &&
                !this.state.editModeLoad &&
                <Fab
                    className="add-post__fab"
                    onClick={ this.togglePreview }
                >
                    {
                        this.state.activeSlide === 0 
                        ? <Visibility /> 
                        : <Close />
                    }
                    
                </Fab>
            }
        </div>
        )
    }
}

export default withSnackbar(AddPost);