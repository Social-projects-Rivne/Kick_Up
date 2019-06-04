import React, {useState} from "react";

import { Grid, Button } from "@material-ui/core";
import StarRating from "./../../UI/StarRating/StarRating";
import defaultAvatar from "../../../assets/images/face.png";

const roomCard = props => {
  const backgroundImage = {
    backgroundImage: `url(${props.background})`
  };
  const [isHovered, toggle] = useState(false);
  return (
    <Grid item xs={12} sm={6} md={4} className={`col ${isHovered && 'hover'}`} onClick={() => toggle(!isHovered)}>
      <div className="room-card" onClick={props.clicked}>
        <div
          className="front"
          style={backgroundImage}
        >
          <div className="inner">
          <img src={props.avatar ? props.avatar : defaultAvatar}
          alt={props.avatar}
          />
            <p>{props.title}</p>
            <span>{props.category}</span>
            <Grid className="cardInfo">
              <StarRating rating={props.rating}/>
            </Grid>
          </div>
        </div>
        <div className="back">
          <div className="inner">
            <p>{props.description}</p>
            <Grid container justify="space-evenly" className="back-btn-wrapper">
              <span>Members: {props.members} / {props.limit}</span>
              <Button>view more</Button>
            </Grid>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default roomCard;