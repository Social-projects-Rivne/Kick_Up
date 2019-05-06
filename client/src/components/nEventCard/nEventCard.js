import React, {Component} from "react";

import {
    Card, 
    CardHeader,
    CardMedia,
    CardActions,
    CardContent, 
    Avatar,
    Typography,
    IconButton,
    Collapse
} from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import { Group, ExpandMore } from '@material-ui/icons';
import StarRating from "../UI/StarRating/StarRating";


class NeventCard extends Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render = () => (
        <Card className="roomcard">
            <div className="date">
                <span>29</span>
                <span>April</span>
                <span>2019</span>
            </div>
            <div className="location">
                <LocationOn />
                <span>Rivne</span>
            </div>
            <CardHeader
                className="roomcard__header"
                avatar={
                    <Avatar aria-label="Recipe">
                    R
                    </Avatar>
                }
                title="Street drinkers in Rivne!"
                subheader={<StarRating rating="10" />}
            >
            </CardHeader>
            <CardMedia
                data-swiper-parallax="-100"
                className="roomcard__img-wrapper"
                image="https://c8.alamy.com/comp/FWXDB4/street-drinkers-in-glasgow-shortly-before-it-was-made-illegal-FWXDB4.jpg"
                title="Paella dish"
            />
            <CardContent data-swiper-parallax="-300" className="roomcard__description">
                <Typography component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit. Duis lacinia efficitur ligula, vitae vehicula 
                    nunc viverra et. Praesent erat tellus, dictum ac eleifend 
                    a, egestas nec nisl. Donec id tempor nulla. Fusce pretium 
                    urna non odio ullamcorper lacinia.
                </Typography>
            </CardContent>
            <CardActions 
                disableActionSpacing 
                data-swiper-parallax="-500" 
            >
                <IconButton className="roomcard__group-members">
                    <Group />
                    <span className="roomcard__members-amount">13 will attend</span>
                </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <h1>Here will go event</h1>
                    <h1>Here will go event</h1>
                    <h1>Here will go event</h1>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default NeventCard;