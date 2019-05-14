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

import defaultAvatar from '../../assets/images/face.png';

const NeventCard = props => (
    <Link 
        component={RouterLink} 
        to={`/event/${props.id}`} 
        title="Click to view event details"
        data-wrapper-link>
        <Card className="event-card">
            <CardHeader
                className="event-card__header"
                title={props.title}
                subheader={
                    <div className="event-card__header-info">
                        <div className="event-card__avatar-wrapper">
                            <Avatar 
                                className="event-card__avatar" 
                                src={props.authorAvatar ? props.authorAvatar : defaultAvatar}>
                            </Avatar>
                            <span>{`${props.authorName} ${props.authorLastName}`}</span>
                        </div>
                        <StarRating rating={props.eventRating} />
                    </div>
                }
            >
            </CardHeader>
            <CardMedia
                className="event-card__img-wrapper"
                image={`${props.cover}`}
                title="Street drinkers in Rivne"
            >
                <div className="event-card__date">
                    <b>{props.eventDate}</b>
                    <span>{props.eventTime}</span>
                </div>
                <div className="event-card__location">
                    <LocationOn />
                    <b>{`${props.eventLocation}`}</b>
                </div>
            </CardMedia>
            <CardContent className="event-card__description">
                <Typography component="p" className="event-card__main-content">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions 
                disableActionSpacing 
                className="event-card__members"
            >
                <IconButton className="event-card__group-members">
                    <Group />
                    <span className="event-card__members-amount">{`${props.members} people of ${props.membersLimit} allowed will attend`}</span>
                </IconButton>
            </CardActions>
        </Card>
    </Link>
);

export default withRouter(NeventCard);