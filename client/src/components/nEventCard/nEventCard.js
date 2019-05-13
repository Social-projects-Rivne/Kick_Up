import React from "react";
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
    Link
} from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import { Group } from '@material-ui/icons';
import StarRating from "../UI/StarRating/StarRating";

const NeventCard = () => (
    <Card className="event-card">
        <CardHeader
            className="event-card__header"
            title="Street drinkers in Rivne!"
            subheader={
                <div className="event-card__header-info">
                    <Link component={RouterLink} to="/" className="event-card__avatar-wrapper">
                        <Avatar 
                            className="event-card__avatar" 
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
            className="event-card__img-wrapper"
            image="https://c8.alamy.com/comp/FWXDB4/street-drinkers-in-glasgow-shortly-before-it-was-made-illegal-FWXDB4.jpg"
            title="Street drinkers in Rivne"
        >
            <div className="event-card__date">
                <b>29 April</b>
                <span>13:45</span>
            </div>
            <div className="event-card__location">
                <LocationOn />
                <b>Rivne</b>
            </div>
        </CardMedia>
        <CardContent className="event-card__description">
            <Typography component="p" className="event-card__main-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing 
                elit. Duis lacinia efficitur ligula, vitae vehicula 
                nunc viverra et. Praesent erat tellus, dictum ac eleifend 
                a, egestas nec nisl. Donec id tempor nulla. Fusce pretium 
                urna non odio ullamcorper lacinia.
            </Typography>
        </CardContent>
        <CardActions 
            disableActionSpacing 
            className="event-card__members"
        >
            <IconButton className="event-card__group-members">
                <Group />
                <span className="event-card__members-amount">13 people will attend</span>
            </IconButton>
        </CardActions>
    </Card>
);

export default withRouter(NeventCard);