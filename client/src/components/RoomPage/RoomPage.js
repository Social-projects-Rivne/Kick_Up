import React from 'react';
import axios from 'axios';

import {Link as RouterLink, Link} from "react-router-dom";

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { AppBar, Tabs, Tab, Typography, Grid, Avatar, Card, CardActions, CardContent, CardMedia,
    CardActionArea, Button, ListItemText, ListItem, ListItemAvatar, Badge, Fab, Paper } from '@material-ui/core';
import { Comment, Collections, Face, NewReleases, EventAvailable, Add, Info } from '@material-ui/icons';
import Gallery from 'react-grid-gallery';
import SwipeableViews from 'react-swipeable-views';
import Spinner from './../UI/Spinner/Spinner';
import NeventCard from '../nEventCard/nEventCard';

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

function TabContainer(props) {
    return (
        <Typography component="div" className="room-details-page-typography-padding">
            {props.children}
        </Typography>
    );
}

class RoomPage extends React.Component {

    state = {
        value: 0,
        roomPageDB: null
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("/api/room/" + id)
            .then(res => {
                this.setState({ roomPageDB: res.data });
            })
            .catch(err => console.log(err));
    };

    refReadMore = (element) => {
        if (!element)
            return;

        // 5px padding bottom, 48px == 3rem
        if (element.clientHeight - 5 < 48) {
            document.getElementById("read-more-button").style.display = "none";
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { value, roomPageDB } = this.state;
        const { isAuthenticated } = this.props;

        if (!roomPageDB) {
            return (<Spinner className="rooms-page"/>);
        }

        return (
            <div className="room-page-details">
                <AppBar position="static" className="tab-bar">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        className="tab-menu"
                        variant="scrollable"
                        scrollButtons="off"
                    >
                        <Tab label="Info" icon={<Info />} />
                        <Tab label="Feed" icon={<Comment />} />
                        <Tab label="Events" icon={<EventAvailable />} />
                        <Tab label="Gallery" icon={<Collections />} />
                        <Tab label="Posts" icon={<NewReleases />} />
                        <Tab label={
                            <Badge className="badge-room-margin" badgeContent={roomPageDB.members.length}>
                                <Face /> <p className="badge-members">Members</p>
                            </Badge>
                        }
                        />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    index={value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    { (value === 0 && <TabContainer>
                        <Grid container spacing={24} className="room-details-page-content">
                            <Grid item md={6} xs={12}>
                                <div className="room-details-page-wrapper">
                                    <Fab variant="extended" className="room-details-page-fab">
                                        <Add />
                                        <span className="room-details-page-join">Join</span>
                                    </Fab>
                                    <Typography className="room-details-page-title">
                                        {roomPageDB.title}
                                    </Typography>
                                </div>
                                <Paper className="room-details-page-paper" elevation={1}>
                                    <input type="checkbox" className="read-more-state" id="post-1"/>
                                    <div ref={this.refReadMore} className="read-more-wrap">
                                        {roomPageDB.description}
                                    </div>
                                    <label htmlFor="post-1" className="read-more-trigger" id="read-more-button"></label>
                                </Paper>
                            </Grid>
                            <Grid item md={6} xs={12} className="room-details-page-cover-grid">
                                <img src={roomPageDB.cover} alt={roomPageDB.title} className="room-details-page-cover"/>
                            </Grid>
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 1 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            {roomPageDB.feeds.map((feed) =>
                                <Grid item xs={12} className="room-details-card-grid">
                                    <Card className="feed-card">
                                        <CardActionArea>
                                            <CardMedia
                                                className="card-media"
                                                image={feed.cover}
                                                title={feed.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {feed.title}
                                                </Typography>
                                                <Typography component="p">
                                                    {feed.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button>
                                                comment
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 2 && <TabContainer>
                        <Grid container className="room-details-add-event-button">
                            {isAuthenticated && (<Grid item>
                                <Link to={this.props.location.pathname + "/add-event"} className="room-details-add-event-link">
                                    <Fab variant="extended" className="room-details-add-event">
                                        <Add />
                                    </Fab>
                                </Link>
                            </Grid>)}
                        </Grid>
                        <Grid container spacing={24}>
                            {roomPageDB.event.map((event) =>
                                <Grid item lg={4} md={6} xs={12} className="room-details-card-grid">
                                    <NeventCard
                                        id={event.id}
                                        room_id={event.room_id}
                                        title={event.title}
                                        rating={event.eventRating}
                                        authorId={event.creator_id}
                                        authorName={this.state.roomPageDB.creator.first_name}
                                        authorLastName={this.state.roomPageDB.creator.last_name}
                                        authorAvatar={this.state.roomPageDB.creator.avatar}
                                        cover={event.cover}
                                        description={event.description}
                                        eventLocation={(event.location).split(',')[0]}
                                        eventDate={convertTime(event.start_date).date}
                                        eventTime={convertTime(event.start_date).time}
                                        members={event.members}
                                        membersLimit={event.members_limit}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 3 && <TabContainer>
                        <Fab variant="extended" className="room-details-page-photo-fab">
                            <Add />
                            <span>upload photo</span>
                        </Fab>
                        <Gallery images={roomPageDB.gallery} backdropClosesModal={true} />
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 4 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            {roomPageDB.posts.map((post) =>
                                <Grid item xs={12} className="room-details-card-grid">
                                    <Card className="post-card">
                                        <CardActionArea>
                                            <CardMedia
                                                className="card-media"
                                                image={post.cover}
                                                title={post.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {post.title}
                                                </Typography>
                                                <Typography component="p">
                                                    {post.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button>
                                                comment
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 5 && <TabContainer>
                        <Grid container spacing={24}>
                            {roomPageDB.members.map((member) =>
                                <Grid item lg={3} md={4} sm={6} xs={12}>
                                    <Link component={RouterLink} to={`/profile/` + member.id} className="room-page-member-link">
                                        <ListItem className="avatar-center">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Avatar alt="" src={member.avatar} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={member.first_name + " " + member.last_name} className="avatar-flex" />
                                        </ListItem>
                                    </Link>
                                </Grid>
                            )}
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }
                </SwipeableViews>
            </div>
        );
    }
}

export default RoomPage;
