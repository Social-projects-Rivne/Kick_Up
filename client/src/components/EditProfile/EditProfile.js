import React, { Component } from "react";

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination } from 'swiper/dist/js/swiper.esm';
import "react-id-swiper/src/styles/scss/swiper.scss";

import { 
    Typography,
    TextField
} from '@material-ui/core';

// Global constants;
const tabletWidth = 768;
const swiperParams = {
    //direction: 'vertical',
    modules: [ Pagination ],
    slidesPerView: '1',
    loop: false,
    pagination: {
      el: ".edit-profile__form-pagination",
      type: 'progressbar',
      clickable: true
    },
    centeredSlides: true,
    autoHeight: true,
    spaceBetween: 30,
    rebuildOnUpdate: true,
    shouldSwiperUpdate: true,
    containerClass: '.edit-profile__form',
    // Event listeners;
    on: {}
};



class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
        
        //this.handleResize = this.handleResize.bind(this);
    }
    render() {
        return (
            <div className="edit-profile">
                <form action="#" className="edit-profile__form-wrapper">
                    <Swiper {...swiperParams} >
                        <div key={1} className="swiper-slide">

                        <TextField
                            select
                            variant="outlined"
                            label="With Select"
                            //value={this.state.weightRange}
                            //onChange={this.handleChange('weightRange')}
                            >
                            </TextField>

                        </div>  
                        <div key={2} className="swiper-slide">
                            <h1>222</h1>
                        </div>                        
                    </Swiper>
                </form>
            </div>
        )
    }
}

export default EditProfile;