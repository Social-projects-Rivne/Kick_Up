import React from 'react';

import Grid from "@material-ui/core/Grid";

const roomCard = props => {

    const backgroundImage = {
        backgroundImage: `url(${props.background})`
    };

    return (
        <Grid xs={12} sm={6} sm={4} className="room-card" style={backgroundImage}>
            <div className="cardInfo">
                <div>{props.category}</div>
                <div>{props.members} / {props.limit}</div>
            </div>
            <h2>{props.title}</h2>
            <div className="cardInfo">
                <div>
                    <img src={props.avatar} /> {props.rating}
                </div>
                <div>
                    Date
                </div>
            </div>
        </Grid>
    );
}

export default roomCard;