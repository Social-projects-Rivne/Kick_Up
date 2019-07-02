import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { LocationOn, People } from "@material-ui/icons";
import defaultAvatar from "../../../assets/images/face.png";

const eventCard = props => {
  const [isToggle, ToggleHandler] = useState(false);
  const backgroundImage = {
    backgroundImage: `url(${props.background})`
  };
  if(!isToggle) setTimeout(() => ToggleHandler(!isToggle), 500);
  const time = new Date(props.startDate);
  const menuContent = 
    <ul className={`menu-content ${isToggle}`}>
      <li>
        <People className="menu-content-icons" />
        <span>{props.members}</span>
      </li>
      <li>
        <img src={props.avatar ? props.avatar : defaultAvatar} alt={props.avatar}/>
      </li>
    </ul>;
  return (
    <Grid item xs={12} sm={6} md={4} className="events-card" onClick={props.clicked}>
      <div className="wrapper" style={backgroundImage}>
        <div className="wrapper-header">
          <div className="date">
            <div className="day"><span>{("0" + (time.getDate())).slice(-2)}</span>.{("0" + (time.getMonth() + 1)).slice(-2)}.{time.getFullYear()}</div>
            <div className="time">{("0" + (time.getHours())).slice(-2) + ":" + ("0" + (time.getMinutes())).slice(-2)}</div>
          </div>
          <div className="location">
            <LocationOn />
            <span>{(props.location).split(',')[0]}</span>
          </div>
        </div>
        <div className="data">
          <div className="content">
            <span className="category">{props.category}</span>
            <h1 className="title">{props.title}</h1>
            <p className="text">{props.description}</p>
          </div>
          {menuContent}
        </div>
      </div>
    </Grid>
  );
};

export default eventCard;
