import React from 'react';

import Swiper from 'react-id-swiper';
import { Pagination, Autoplay } from 'swiper/dist/js/swiper.esm';
import "react-id-swiper/src/styles/scss/swiper.scss";

const SwiperInstance = (props) => {
    

    const params = {
    modules: [Pagination, Autoplay],
    slidesPerView: 'auto',
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    spaceBetween: 30,
    autoplay: true,
   
    }

    

    return (
        <div>
            <Swiper {...params} >
            {props.slides.map((slide, idx) => 
                <div key={idx}>
                    <img src={slide} alt="" />
                </div>
            )}
            </Swiper>
        </div>
    );
}

export default SwiperInstance;
