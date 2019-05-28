import React, {Component} from 'react';

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
import { Editor } from 'react-draft-wysiwyg';
//import { EditorState } from 'draft-js';

import '../../styles/libs/react-draft-wysiwyg.css';

const addPostSwiperParams = {
    containerClass: 'add-post__swiper',
    slidesPerView: 1,
    simulateTouch: true,
    autoHeight: true,
    speed: 800
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
        pinPost: false
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
        alert('Here we will save data');
    }
    // a = (EditorState) => {
    //     console.log( EditorState );
    // }
    render() {
        const { activeStep } = state;

        return (
            <div className="add-post">
            <Button
                className="add-post__submit-btn"
                variant="outlined"
                onClick={this.saveData}
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
                                    className={this.state.details ? 'add-post__step  add-post__step_filled' : 'add-post__step'}
                                    key={1} 
                                    active={true} >
                                    <StepLabel className="add-post__step-label">Add your post details</StepLabel>
                                    <StepContent>
                                        <Editor
                                            toolbar={{
                                                options: ['blockType', 'list', 'link', 'embedded', 'emoji', 'image'],
                                                blockType: {
                                                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'Code'],
                                                },
                                                fontFamily: {
                                                    options: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                                                }
                                            }}
                                            //onEditorStateChange={this.a}
                                            wrapperClassName="add-post__editor"
                                            editorClassName="editor-class"
                                            toolbarClassName="add-post__toolbar"
                                        />
                                    </StepContent>
                                </Step>
                                <Step 
                                    className={this.state.title && this.state.details ? 'add-post__step  add-post__step_filled' : 'add-post__step'}
                                    key={2} 
                                    active={true}>
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
                                                        //error={this.state.errors.permission}
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
            <Fab
                className="add-post__fab"
            >
                <Visibility />
            </Fab>
        </div>
        )
    }
        

        
    
}

export default AddPost;