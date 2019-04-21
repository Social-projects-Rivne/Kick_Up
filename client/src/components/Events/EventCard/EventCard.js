import React, { useState } from "react";

import { Grid, Button } from "@material-ui/core";
import {LocationOn, People, ToggleOff} from "@material-ui/icons";

const eventCard = props => {
  const [isToggle, ToggleHandler] = useState(false);
  const backgroundImage = {
    backgroundImage: `url(${props.background})`
  };
  const dateToArr = props.startDate.slice(0, 10).split("-");
  const menuContent = <ul className={`menu-content ${isToggle}`}>
                        <li>
                          <LocationOn className="menu-content-icons" />
                          <span>{props.location}</span>
                        </li>
                        <li>
                          <People className="menu-content-icons" />
                          <span>{props.members}</span>
                        </li>
                        <li>
                          <img src={props.avatar} alt={props.avatar}/>
                        </li>
                      </ul>
  return (
    <Grid item xs={12} sm={6} md={4} className="events-card">
      <div className="wrapper" style={backgroundImage}>
        <div className="date">
          <span className="day">{dateToArr[2]}</span>
          <span className="month">{dateToArr[1]}</span>
          <span className="year">{dateToArr[0]}</span>
        </div>
        <div className="data">
          <div className="content">
            <span className="category">{props.category}</span>
            <h1 className="title">{props.title}</h1>
            <p className="text">{props.description}</p>
            <label 
            onClick={() => ToggleHandler(!isToggle)}
            className="menu-button"
            >
              <span />
            </label>
          </div>
          {menuContent}
        </div>
      </div>
    </Grid>
  );
};

export default eventCard;
