import React from 'react';
import axios from 'axios';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { AppBar, Tabs, Tab, Typography, Grid, Avatar, Card, CardActions, CardContent, CardMedia,
    CardActionArea, Button, ListItemText, ListItem, ListItemAvatar, Badge, Fab, Paper } from '@material-ui/core';
import { Comment, Collections, Face, NewReleases, EventAvailable, Add, Info } from '@material-ui/icons';
import Gallery from 'react-grid-gallery';
import SwipeableViews from 'react-swipeable-views';
import Spinner from './../UI/Spinner/Spinner';

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

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { value, roomPageDB } = this.state;

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
                            <Badge className="badge-room-margin" badgeContent={this.state.roomPageDB.members.length}>
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
                    {value === 0 && <TabContainer>
                        <Grid container spacing={24} className="room-details-page-content">
                            <Grid item md={6} xs={12}>
                                <div className="room-details-page-wrapper">
                                    <Fab variant="extended" className="room-details-page-fab">
                                        <Add />
                                        <span className="room-details-page-join">Join</span>
                                    </Fab>
                                    <Typography className="room-details-page-title">
                                        {this.state.roomPageDB.title}
                                    </Typography>
                                </div>
                                <Paper className="room-details-page-paper" elevation={1}>
                                    <input type="checkbox" className="read-more-state" id="post-1"/>
                                    <Typography className="read-more-wrap">
                                        {this.state.roomPageDB.description}
                                    </Typography>
                                    <label htmlFor="post-1" className="read-more-trigger"></label>
                                </Paper>
                            </Grid>
                            <Grid item md={6} xs={12} className="room-details-page-cover-grid">
                                <img src={this.state.roomPageDB.cover} className="room-details-page-cover"/>
                            </Grid>
                        </Grid>
                    </TabContainer> }

                    {value === 1 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            {this.state.roomPageDB.feeds.map((feed) =>
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
                    </TabContainer> }

                    {value === 2 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            {this.state.roomPageDB.events.map((event) =>
                                <Grid item md={6} xs={12} className="room-details-card-grid">
                                    <Card>
                                        <CardActionArea>
                                            <CardMedia
                                                className="card-media"
                                                image={event.cover}
                                                title={event.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {event.title}
                                                </Typography>
                                                <Typography component="p">
                                                    {event.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button>
                                                {event.date + "/" + event.location}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </TabContainer> }

                    {value === 3 && <TabContainer>
                        <Fab variant="extended" className="room-details-page-photo-fab">
                            <Add />
                            <span>upload photo</span>
                        </Fab>
                        <Gallery images={this.state.roomPageDB.gallery} backdropClosesModal={true} />
                    </TabContainer> }

                    {value === 4 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            {this.state.roomPageDB.posts.map((post) =>
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
                    </TabContainer> }

                    {value === 5 && <TabContainer>
                        <Grid container spacing={24}>
                            {this.state.roomPageDB.members.map((member) =>
                                <Grid item lg={3} md={4} sm={6} xs={12}>
                                    <ListItem className="avatar-center">
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Avatar alt="" src={member.avatar} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={member.first_name + " " + member.last_name} className="avatar-flex" />
                                    </ListItem>
                                </Grid>
                            )}
                        </Grid>
                    </TabContainer> }
                </SwipeableViews>
            </div>
        );
    }
}

export default RoomPage;
