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
import { Pagination } from 'swiper/dist/js/swiper.esm';
import { Editor } from 'react-draft-wysiwyg';

import '../../styles/libs/react-draft-wysiwyg.css';

const addPostSwiperParams = {
    modules: [Pagination],
    containerClass: 'add-post__swiper',
    slidesPerView: 1,
    simulateTouch: true,
    autoHeight: true,
    pagination: {
        el: ".add-post__pagination",
        type: 'progressbar'
    },
    speed: 800
}

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
        title: ''
    }
    saveData = () => {
        alert('Here we will save data');
    }
    render() {
        const { activeStep } = this.state;

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
                <Stepper nonLinear orientation="vertical" className="add-post__stepper">
                        <Step key={0} active={true} >
                            <StepLabel>Title of your post</StepLabel>
                            <StepContent>
                                <div>
                                    <TextField
                                        required
                                        className="add-room-text-field"
                                        label="Title"
                                        name="title"
                                        placeholder="Min 3 symbols, Max 100 symbols"
                                        //onChange={event => this.handleUpdateData(event)}
                                        value='aaaaa'
                                        fullWidth
                                        autoComplete="off"
                                        inputProps={{ maxLength: 100 }}
                                        //error='aaaaa'
                                    />
                                </div>
                            </StepContent>
                        </Step>
                        <Step key={1} active={true}>
                            <StepLabel>Add your post details</StepLabel>
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
                                    wrapperClassName="add-post__editor"
                                    editorClassName="editor-class"
                                    toolbarClassName="add-post__toolbar"
                                />
                            </StepContent>
                        </Step>
                        <Step key={2} active={true}>
                            <StepLabel>Pin post?</StepLabel>
                            <StepContent>
                                <FormGroup className="add-room-text-field">
                                    <FormControlLabel
                                        label="Private room"
                                        control={
                                            <Switch
                                                name="permission"
                                                //onChange={event => this.handleUpdateData(event)}
                                                checked={true}
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