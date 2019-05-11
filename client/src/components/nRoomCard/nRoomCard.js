import React, {Component} from "react";
import { Link as RouterLink, withRouter } from 'react-router-dom';

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
    Fab,
    Link
} from '@material-ui/core';
import { Group, ExpandMore, Loyalty } from '@material-ui/icons';
import StarRating from "../UI/StarRating/StarRating";

import NeventCard from '../nEventCard/nEventCard';

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
            title="Food lovers in Rivne"
            subheader={
                <div className="roomcard__header-info">
                    <Link component={RouterLink} to="/" className="roomcard__avatar-wrapper">
                        <Avatar 
                            className="roomcard__avatar" 
                            src="https://material-ui.com/static/images/avatar/1.jpg" 
                            aria-label="Recipe">
                            W
                        </Avatar>
                        <span>@daniel</span>
                    </Link>
                    <StarRating rating="10" />
                </div>
            }
        >
        </CardHeader>
            <CardMedia
                data-swiper-parallax="-100"
                className="roomcard__img-wrapper"
                image="https://material-ui.com/static/images/cards/paella.jpg"
                title="Paella dish"
            >
                <div className="roomcard__label">
                    <Loyalty />
                    <b>Food</b>
                </div>
            </CardMedia>
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
                className="roomcard__members"
            >
                <Fab
                    className={this.state.expanded ? 'roomcard__events-btn  roomcard__events-btn_expanded' : 'roomcard__events-btn'}
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Extend"
                    onClick={() => {
                        const doUpd = this.props.btnClickHandler;
                        this.handleExpandClick();
                        
                        // We need delay while collapse opens;
                        if (doUpd) window.setTimeout(doUpd, 400);
                    }}
                >
                    <ExpandMore />
                    3 events
                </Fab>
                <IconButton className="roomcard__group-members">
                    <Group />
                    <span className="roomcard__members-amount">13 of 55 allowed</span>
                </IconButton>
            </CardActions>
            <Collapse 
                className="roomcard__collpse-content" 
                in={ window.innerWidth >= 768 && window.innerWidth < window.innerHeight ? true : this.state.expanded } 
                timeout="auto" 
                unmountOnExit
            >
                <CardContent className="roomcard__events-wrapper">
                    <NeventCard />
                    <NeventCard />
                    <NeventCard />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default withRouter(NroomCard);