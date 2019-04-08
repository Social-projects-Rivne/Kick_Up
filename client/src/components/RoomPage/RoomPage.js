import React from 'react';

import '../../styles/index.scss';


import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Grid, Avatar, Card, CardActions, CardContent, CardMedia,
    CardActionArea, Button, ListItemText, ListItem, ListItemAvatar } from '@material-ui/core';
import { Comment, Collections, Face, NewReleases, VerifiedUser } from '@material-ui/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Gallery from 'react-photo-gallery';
import event from '../../assets/images/event.jpg';

import { withRouter } from 'react-router-dom';

const PHOTO_SET = [
    {
        src: event,
        width: 4,
        height: 3
    },
    {
        src: event,
        width: 1,
        height: 1
    },
    {
        src: event,
        width: 2,
        height: 3
    },
    {
        src: event,
        width: 5,
        height: 3
    },
    {
        src: event,
        width: 4,
        height: 3
    },
];
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class RoomPage extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <div className="room-carousel">
                    <span className="room-name-carousel">Room Name</span>
                    <span className="room-members-carousel">2 members</span>
                    <button className="room-join-carousel">Join</button>
                    <Carousel>
                        <div>
                            <img src="http://lorempixel.com/1000/600/nature/2/" />
                        </div>
                        <div>
                            <img src="http://lorempixel.com/1000/600/nature/6/" />
                        </div>
                        <div>
                            <img src="http://lorempixel.com/1000/600/nature/3/" />
                        </div>
                    </Carousel>
                </div>

                <AppBar position="static" className="tab-bar">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}


                        indicatorColor="primary"
                        textColor="primary"
                        className="tab-menu"
                    >
                        <Tab label="Feed" icon={<Comment />} />
                        <Tab label="Gallery" icon={<Collections />} />
                        <Tab label="Posts" icon={<NewReleases />} />
                        <Tab label="Members" icon={<Face />} />
                        <Tab label="About" icon={<VerifiedUser />} />
                    </Tabs>
                </AppBar>

                {value === 0 && <TabContainer>
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
                </TabContainer>}

                {value === 1 && <TabContainer><Gallery photos={PHOTO_SET} /></TabContainer>}

                {value === 2 && <TabContainer>
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
                </TabContainer>}

                {value === 3 && <TabContainer>
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
                </TabContainer>}
                {value === 4 && <TabContainer>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </TabContainer>}
            </div>
        );
    }
}

export default withRouter(RoomPage);
