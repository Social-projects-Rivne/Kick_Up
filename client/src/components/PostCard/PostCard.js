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
    Link,
    Fab,
    Collapse
} from '@material-ui/core';
import { Group, Loyalty, ExpandMore } from '@material-ui/icons';

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

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    }
    render = () => (
<Card className="roomcard">
        <Link data-wrapper-link>
            <CardHeader
                className="roomcard__header"
                title={this.props.data.title}
                subheader={
                    <div className="roomcard__header-info">
                        <div className="roomcard__avatar-wrapper">
                            <Avatar 
                                className="roomcard__avatar" 
                                src={
                                    this.props.data.author_details.avatar 
                                    ? this.props.data.author_details.avatar 
                                    : defaultAvatar
                                }
                            >
                            </Avatar>
                            <span>{`${
                                this.props.data.author_details.firstName
                                ? this.props.data.author_details.firstName
                                : ''
                            } ${
                                this.props.data.author_details.lastName
                                ? this.props.data.author_details.lastName
                                : ''
                                }`}</span>
                        </div>
                    </div>
                }
            >
        </CardHeader>
        </Link>
        {/* @temp We may need it to add covers done by Igor */}
        {/* <CardMedia
            className="roomcard__img-wrapper"
            image={this.props.cover}
        >
            <div className="roomcard__label">
                <Loyalty />
                <b>{this.props.category}</b>
            </div>
        </CardMedia> */}
        <CardContent className="roomcard__description">
            <Typography component="p">
                Yay
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
                <h1>Here will go comments</h1>
            </CardContent>
        </Collapse>
    </Card>
);
            }

export default PostCard;