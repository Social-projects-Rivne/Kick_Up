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
    Switch
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { withSnackbar } from 'notistack';
import WYSWYGeditor from '../WYSWYGeditor/WYSWYGeditor';
import axios from 'axios';

const addPostSwiperParams = {
    containerClass: 'add-post__swiper',
    slidesPerView: 1,
    simulateTouch: true,
    autoHeight: true,
    speed: 800
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

class AddPost extends Component {
    state = {
        activeStep: 0,
        title: '',
        details: '',
        pinPost: false,
        editorData: {
            blocks: []
        }
    }
    setPostPinned = () => {
        this.setState(prevState => {
            return {
                pinPost: !prevState.pinPost
            }
        });
    }
    updateInputValue = (evt) => {
        this.setState({ title: evt.target.value });
    }
    saveData = () => {
        console.log('SAVE');
        axios
            .get('/api/room/new-post', {
                params: {
                    test: 1
                }
            })
            .then(res => {
                console.log(res);
                debugger;
             })
            .catch((err) => {
                console.log(err);
                debugger;
            })
    }
    setEditorData = (data) => {
        if (data.blocks[0].text.length > 0) 
            this.setState({editorData: data});
        else this.resetEditorData();
    }
    resetEditorData = () => {
        this.setState({ editorData: { blocks: [] }});
    }
    checkAllFilled = () => {
        let res = false;

        if (
            this.state.title && 
            this.state.title.length > 3 &&
            this.state.editorData.blocks.length > 0
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
            if (!this.state.title) {
                errMessages.push('Give your post a nice title');
            }
            if (this.state.editorData.blocks.length <= 0) {
                errMessages.push('Give your post a great description');
            }

            // Enque all err messages;
            errMessages.forEach((msg, itr) => {
                window.setTimeout(() => {
                    this.showToast(msg, messageType.ERR);
                }, _delayTime * itr);
            });
            
        } else {
            this.showToast('Saving post...', messageType.INFO);
            this.saveData();
        }
    }
    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
        });
    }
    render() {
        const { activeStep, editorState } = this.state;

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
            <Swiper {...addPostSwiperParams} >
                <section className="add-post__slide  add-post__slide_data-entry">
                    <form className="add-post__form" noValidate autoComplete="off">
                        <label className="add-post__title">To add new post, fill in fields below:</label>
                            <Stepper nonLinear orientation="vertical" className="add-post__stepper">
                                <Step 
                                    className={this.state.title && this.state.title.length > 3 ? 'add-post__step  add-post__step_filled' : 'add-post__step'} 
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
                                                value={this.state.title}
                                                fullWidth
                                                autoComplete="off"
                                                inputProps={{ minLength: 3 }}
                                            />
                                        </div>
                                    </StepContent>
                                </Step>
                                <Step 
                                    className={this.state.editorData.blocks.length > 0 
                                        ? 'add-post__step  add-post__step_filled' 
                                        : 'add-post__step'
                                    }
                                    key={1} 
                                    active={true} >
                                    <StepLabel className="add-post__step-label">Add your post details</StepLabel>
                                    <StepContent>
                                        <WYSWYGeditor editorSettings={{
                                            dataUpdateCallback: this.setEditorData,
                                            toolbar: {
                                                options: ['blockType', 'list', 'link', 'embedded', 'emoji', 'image'],
                                                blockType: {
                                                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'Code'],
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
                                                label={this.state.pinPost
                                                    ? 'Pinned post will be shown in both "Feed" and "Pinned posts" sections'
                                                    : 'Unpinned post will be shown in "Feed" section only'
                                                }
                                                control={
                                                    <Switch
                                                        name="pinPost"
                                                        onChange={this.setPostPinned}
                                                        checked={this.state.pinPost}
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
                    Here we will have data-preview;
                </section>
            </Swiper>
            {
                this.checkAllFilled() &&
                <Fab
                    className="add-post__fab"
                >
                    <Visibility />
                </Fab>
            }
        </div>
        )
    }        
    
}

export default withSnackbar(AddPost);