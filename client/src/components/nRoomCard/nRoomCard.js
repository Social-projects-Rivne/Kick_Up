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

import defaultAvatar from '../../assets/images/face.png';

// Helper functions. 
const convertTime = (str) => {
    // Define manually date;
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    };

    if (str && typeof str === 'string') {
        try{
            let [, month, date] = [...str.split('-')];
            let [hour, min] = [...date.split('T').pop().split(':')];
            
            date = date.slice(0, 2);

            return {
                date: `${date[0] === '0' ? date.slice(1) : date} ${months[month]}`,
                time: `${hour}:${min}` 
            }
        } catch(err) {
            console.log('ERR', err);
            return {
                date: '',
                time: ''
            }
        }
    }
};

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
            <Link 
                component={RouterLink} 
                to={`/rooms/${this.props.id}`} 
                title="Click to view room details"
                data-wrapper-link
            >
                <CardHeader
                    className="roomcard__header"
                    title={this.props.title}
                    subheader={
                        <div className="roomcard__header-info">
                            <Link component={RouterLink} to={`/profile/${this.props.id}`} className="roomcard__user-link" >
                                <div className="roomcard__avatar-wrapper">
                                    <Avatar
                                        className="roomcard__avatar"
                                        src={this.props.authorAvatar ? this.props.authorAvatar : defaultAvatar}
                                    >
                                    </Avatar>
                                    <span>{`${this.props.authorName} ${this.props.authorLastName}`}</span>
                                </div>
                            </Link>
                            <StarRating rating={this.props.eventRating} />
                        </div>
                    }
                >
            </CardHeader>
            </Link>
            <CardMedia
                className="roomcard__img-wrapper"
                image={this.props.cover}
            >
                <div className="roomcard__label">
                    <Loyalty />
                    <b>{this.props.category}</b>
                </div>
            </CardMedia>
            <CardContent className="roomcard__description">
                <Typography component="p">
                    {this.props.description}
                </Typography>
            </CardContent>
            <CardActions 
                disableActionSpacing
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
                    {this.props.events.length}
                    {` ${this.props.events.length > 1 ? 'events' : 'event'}`}
                </Fab>
                <IconButton className="roomcard__group-members">
                    <Group />
                    <span className="roomcard__members-amount">
                        {`${this.props.members} members of ${this.props.membersLimit} allowed`}
                    </span>
                </IconButton>
            </CardActions>
            <Collapse 
                className="roomcard__collpse-content" 
                in={window.innerWidth >= 768 ? true : this.state.expanded}
                timeout="auto" 
                unmountOnExit
            >
                <CardContent className="roomcard__events-wrapper">
                    {
                        this.props.events.map(event => {
                            return <NeventCard 
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                rating={event.eventRating}
                                authorId={event.creator.id}
                                authorName={event.creator.first_name}
                                authorLastName={event.creator.last_name}
                                authorAvatar={event.creator.avatar}
                                cover={event.cover}
                                description={event.description}
                                eventLocation={event.location}
                                eventDate={convertTime(event.start_date).date}
                                eventTime={convertTime(event.start_date).time}
                                members={event.members}
                                membersLimit={event.members_limit}
                            />
                        })
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default withRouter(NroomCard);