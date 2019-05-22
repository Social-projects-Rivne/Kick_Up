import React, {Component} from 'react';

import {
    Button,
    Fab
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
        title: ''
    }
    saveData = () => {
        alert('Here we will save data');
    }
    render = () => (
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
                <Editor
                    toolbar={{
                        options: ['blockType', 'list', 'link', 'embedded', 'emoji', 'image'],
                    }}
                    wrapperClassName="add-post__editor"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
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

export default AddPost;