import React from "react";

import { Grid } from "@material-ui/core";
import StarRating from "./../../UI/StarRating/StarRating";

const roomCard = props => {
  const backgroundImage = {
    backgroundImage: `url(${props.background})`
  };

  return (
    <Grid item xs={12} sm={6} md={4} className="col" ontouchstart="this.classList.toggle('hover');">
      <div className="room-card" onClick={props.clicked}>
        <div
          className="front"
          style={backgroundImage}
        >
          <img src={props.avatar} alt={props.avatar}/>
          <div className="inner">
            <p>{props.title}</p>
            <span>{props.category}</span>
          </div>
        <Grid className="cardInfo">
          <StarRating rating={props.rating}/>
        </Grid>
        </div>
        <div className="back">
          <div className="inner">
            <p>{props.description}</p>
          <span>Members: {props.members} / {props.limit}</span>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default roomCard;
