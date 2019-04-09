import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { withRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Typography, Grid, Avatar, Card, CardActions, CardContent, CardMedia,
    CardActionArea, Button, ListItemText, ListItem, ListItemAvatar } from '@material-ui/core';
import { Comment, Collections, Face, NewReleases, VerifiedUser, EventAvailable } from '@material-ui/icons';
import { Carousel } from 'react-responsive-carousel';
import Gallery from 'react-photo-gallery';
import SwipeableViews from 'react-swipeable-views';

const photoSet = [
    {
        src: "http://lorempixel.com/1600/1100/nature/6/",
        width: 1600,
        height: 1100
    },
    {
        src: "http://lorempixel.com/600/600/nature/5/",
        width: 600,
        height: 600
    },
    {
        src: "http://lorempixel.com/800/700/nature/4/",
        width: 800,
        height: 700
    },
    {
        src: "http://lorempixel.com/700/800/nature/8/",
        width: 700,
        height: 800
    },
    {
        src: "http://lorempixel.com/1000/600/nature/3/",
        width: 4,
        height: 3
    },
    {
        src: "http://lorempixel.com/700/800/nature/8/",
        width: 700,
        height: 800
    },
];
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class RoomPage extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <div className="room-carousel">
                    <span className="room-name-carousel">Room Name</span>
                    <div className="room-join-carousel">
                        2 members&nbsp;&nbsp;
                        <button>Join</button>
                    </div>
                    <Carousel emulateTouch="true">
                        <div className="scale-image">
                            <div className="blur" style={{ backgroundImage: 'url(http://lorempixel.com/1000/600/nature/4/)'}}></div>
                            <img src="http://lorempixel.com/1000/600/nature/4/" />
                        </div>
                        <div className="scale-image">
                            <div className="blur" style={{ backgroundImage: 'url(http://lorempixel.com/1000/600/nature/6/)'}}></div>
                            <img src="http://lorempixel.com/1000/600/nature/6/" />
                        </div>
                        <div className="scale-image">
                            <div className="blur" style={{ backgroundImage: 'url(http://lorempixel.com/1000/600/nature/5/)'}}></div>
                            <img src="http://lorempixel.com/1000/600/nature/5/" />
                        </div>
                        <div className="scale-image">
                            <div className="blur" style={{ backgroundImage: 'url(http://lorempixel.com/1000/600/nature/3/)'}}></div>
                            <img src="http://lorempixel.com/1000/600/nature/3/" />
                        </div>
                    </Carousel>
                </div>

                <AppBar position="static" className="tab-bar">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        className="tab-menu"
                        variant="scrollable"
                        scrollButtons="off"
                    >
                        <Tab label="Feed" icon={<Comment />} />
                        <Tab label="Events" icon={<EventAvailable />} />
                        <Tab label="Gallery" icon={<Collections />} />
                        <Tab label="Posts" icon={<NewReleases />} />
                        <Tab label="Members" icon={<Face />} />
                        <Tab label="About" icon={<VerifiedUser />} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    index={value}
                    onChangeIndex={this.handleChangeIndex}
                    animateHeight={true}
                >
                    <TabContainer>
                        <div className="room-card">
                            <Card className="card">
                                <CardActionArea>
                                    <CardMedia
                                        className="card-media"
                                        image="http://lorempixel.com/1000/600/nature/4/"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        comment
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                        <div className="room-card">
                            <Card className="card">
                                <CardActionArea>
                                    <CardMedia
                                        className="card-media"
                                        image="http://lorempixel.com/1000/600/nature/8/"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        comment
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </TabContainer>

                    <TabContainer>
                        <div className="room-card">
                            <Card className="card">
                                <CardActionArea>
                                    <CardMedia
                                        className="card-media"
                                        image="http://lorempixel.com/1000/600/nature/3/"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Date
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                        <div className="room-card">
                            <Card className="card">
                                <CardActionArea>
                                    <CardMedia
                                        className="card-media"
                                        image="http://lorempixel.com/1000/600/nature/6/"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Date
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </TabContainer>

                    <TabContainer><Gallery photos={photoSet} /></TabContainer>

                    <TabContainer>
                        <div className="room-card">
                            <Card className="card">
                                <CardActionArea>
                                    <CardMedia
                                        className="card-media"
                                        image="http://lorempixel.com/1000/600/nature/8/"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </TabContainer>

                    <TabContainer>
                        <Grid container spacing={24}>
                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <ListItem className="avatar-center">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="" src="http://lorempixel.com/1000/600/nature/3/" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Full Name" className="avatar-flex" />
                                </ListItem>
                            </Grid>

                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <ListItem className="avatar-center">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="" src="http://lorempixel.com/1000/600/nature/5/" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Full Name" className="avatar-flex" />
                                </ListItem>
                            </Grid>

                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <ListItem className="avatar-center">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="" src="http://lorempixel.com/1000/600/nature/5/" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Full Name" className="avatar-flex" />
                                </ListItem>
                            </Grid>

                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <ListItem className="avatar-center">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="" src="http://lorempixel.com/1000/600/nature/5/" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Full Name" className="avatar-flex" />
                                </ListItem>
                            </Grid>

                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <ListItem className="avatar-center">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="" src="http://lorempixel.com/1000/600/nature/6/" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Full Name" className="avatar-flex" />
                                </ListItem>
                            </Grid>

                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <ListItem className="avatar-center">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="" src="http://lorempixel.com/1000/600/nature/7/" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Full Name" className="avatar-flex" />
                                </ListItem>
                            </Grid>
                        </Grid>
                    </TabContainer>

                    <TabContainer>
                        <div className="room-text-about">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

export default withRouter(RoomPage);
