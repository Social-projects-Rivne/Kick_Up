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
    Link,
    Fab
} from '@material-ui/core';
import { LocationOn, Lock } from '@material-ui/icons';
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
                        {(props.permission && (
                            <Fab variant="extended" className="user-profile-page-lock">
                                <Lock />
                            </Fab>
                        )) || ""}

                        <Link component={RouterLink} to={`/profile/${props.authorId}`} className="event-card__creator-link">
                            <div className="event-card__avatar-wrapper">
                                <Avatar
                                    className="event-card__avatar"
                                    src={props.authorAvatar ? props.authorAvatar : defaultAvatar}>
                                </Avatar>
                                <span>{`${props.authorName || "Shy"} ${props.authorLastName || "Unicorn"}`}</span>
                            </div>
                        </Link>
                        <StarRating rating={props.eventRating} />
                    </div>
                }
            >
            </CardHeader>
            <CardMedia
                className="event-card__img-wrapper"
                image={`${props.cover}` && `${props.cover}`.replace(/\\/g, '/')}
                title="Street drinkers in Rivne"
            >
                <div className="event-card__date">
                    <b>{props.eventDate}</b>
                    <span>{props.eventTime}</span>
                </div>
                <div className="event-card__location">
                    <LocationOn />
                    <b>{`${(props.eventLocation).split(',')[0]}`}</b>
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