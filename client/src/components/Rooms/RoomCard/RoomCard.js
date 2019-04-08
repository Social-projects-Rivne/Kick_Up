import React from "react";

import {Grid} from "@material-ui/core";
import './RoomCard.scss';
import StarRating from './../../UI/StarRating/StarRating';

const roomCard = props => {
  const backgroundImage = {
    backgroundImage: `url(${props.background})`
  };

  return (
    <Grid item xs={12} sm={6} md={4} 
      className="room-card" 
      style={backgroundImage}
      onClick={props.clicked}>
      <Grid className="room-card-desc">
        <Grid className="cardInfo">
          <div>{props.category}</div>
          <div>
            {props.members} / {props.limit}
          </div>
        </Grid>
          <h2>{props.title}</h2>
        <Grid className="cardInfo">
          <img src={props.avatar} alt={props.avatar}/> 
          <StarRating rating={props.rating}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default roomCard;
