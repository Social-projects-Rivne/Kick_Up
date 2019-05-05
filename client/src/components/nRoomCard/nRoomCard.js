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
    Collapse,
    Fab
} from '@material-ui/core';
import { Group, ExpandMore } from '@material-ui/icons';
import StarRating from "../UI/StarRating/StarRating";

class NroomCard extends Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render = () => (
        <Card className="roomcard">
            <CardHeader
                className="roomcard__header"
                avatar={
                    <Avatar aria-label="Recipe">
                    R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader={<StarRating rating="10" />}
            >
            </CardHeader>
            <CardMedia
                data-swiper-parallax="-100"
                className="roomcard__img-wrapper"
                image="https://material-ui.com/static/images/cards/paella.jpg"
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
                data-swiper-parallax="-500" >
                <Fab
                    className={this.state.expanded ? 'roomcard__events-btn  roomcard__events-btn_expanded' : 'roomcard__events-btn'}
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Extend"
                    onClick={ this.handleExpandClick }
                >
                    <ExpandMore />
                    3 events
                </Fab>
                <IconButton className="roomcard__group-members" aria-label="Add to favorites">
                    <Group />
                    <span className="roomcard__members-amount">13 of 55 allowed</span>
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

export default NroomCard;