import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { Tabs, Tab, AppBar, Typography, Avatar, Grid, Paper, List, ListItem, Card, InputLabel,
    CardActionArea, CardContent, CardMedia, Fab } from '@material-ui/core';
import { Group, AssignmentTurnedIn, PhotoLibrary, Edit, Lock } from '@material-ui/icons';
import SwipeableViews from "react-swipeable-views";
import Spinner from "../UI/Spinner/Spinner";
import defaultAvatar from "../../assets/images/face.png";
import NeventCard from '../nEventCard/nEventCard';
import Gallery from "react-grid-gallery";
import { userProfileAction } from "../../store/actions/userProfileAction";

const convertTime = (str) => {
    // Define manually date;
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const time = new Date(str);
    return {
        date: time.getDate() + " " + months[time.getMonth()],
        time: ("0" + (time.getHours())).slice(-2) + ":" + ("0" + (time.getMinutes())).slice(-2)
    };
};

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

class UserProfile extends React.Component {
    state = {
        value: 0,
        loading: true,
        selfProfile: false
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.userProfileAction(id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {id} = nextProps.match.params;
        this.setState({
            loading: !this.props.userProfileData || +id !== this.props.userProfileData.id,
            selfProfile: this.props.user && +id === this.props.user.id,
        });

        if (!this.props.userProfileData || +id !== this.props.userProfileData.id) {
            this.props.userProfileAction(id);
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { value, selfProfile  } = this.state;
        const { userProfileData  } = this.props;

        if (this.state.loading) {
            return (<Spinner className="user-profile-page"/>);
        }

        return (
            <div className="user-profile-page">
                <Grid container className="user-profile-page-container">
                    <Grid item md={4} xs={12} className="user-profile-page-avatar-align">
                        <Grid container>
                            <Grid item md={12} className="user-profile-page-avatar-grid">
                                <Avatar className="user-profile-page-avatar" alt="Remy" src={userProfileData.avatar ? userProfileData.avatar : defaultAvatar} />
                            </Grid>
                            <Grid item md={12} className="user-profile-page-info-grid" >
                                <Paper elevation={1} className="user-profile-page-paper-user-info">
                                    <Typography variant="h5" component="h3">
                                        { selfProfile && (
                                            <Link to={this.props.location.pathname + "/edit"} className="user-profile-page-edit-profile-link">
                                                <Fab variant="extended" className="user-profile-page-edit-profile">
                                                    <Edit />
                                                </Fab>
                                            </Link>
                                        )}
                                        <div className="user-profile-page-info">User information</div>
                                    </Typography>
                                    <Typography>
                                        <List>
                                            <ListItem >
                                                <InputLabel>
                                                  Nick:&nbsp;{userProfileData.first_name || "ShyUnicorn"}
                                                </InputLabel>
                                            </ListItem>

                                            <ListItem >
                                                <InputLabel>
                                                    Name:&nbsp;{(userProfileData.first_name || "Shy") + " " + (userProfileData.last_name || "Unicorn")}
                                                </InputLabel>
                                            </ListItem>

                                            { selfProfile && (
                                                <ListItem >
                                                    <InputLabel>
                                                        E-mail:&nbsp;{userProfileData.email}
                                                    </InputLabel>
                                                </ListItem>
                                            )}

                                            <ListItem >
                                                <InputLabel>
                                                    Gender:&nbsp;{userProfileData.gender}
                                                </InputLabel>
                                            </ListItem>

                                            { selfProfile && (
                                                <ListItem>
                                                    <InputLabel>
                                                        B-day:&nbsp;{userProfileData.birth_date.getFullYear() + "."
                                                        + ("0" + (userProfileData.birth_date.getMonth() + 1)).slice(-2) +
                                                        "." + ("0" + (userProfileData.birth_date.getDate())).slice(-2)}
                                                    </InputLabel>
                                                </ListItem>
                                            )}

                                        </List>
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={8} xs={12}>
                        <AppBar position="static" className="user-profile-tabs">
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                variant="scrollable"
                                scrollButtons="off"
                                className="user-profile-tabs-menu"
                            >
                                <Tab label="User rooms" icon={<Group />} />
                                <Tab label="User events" icon={<AssignmentTurnedIn />} />
                                <Tab label="Media" icon={<PhotoLibrary />} />
                                />
                            </Tabs>
                        </AppBar>

                        <SwipeableViews
                            index={value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            { (value === 0 && <TabContainer>
                                <Grid container spacing={24}>
                                    {userProfileData.rooms.map((room) =>
                                        <Grid item md={6} xs={12} className="user-profile-room-card-align">
                                            <Card className="user-profile-room-card">
                                                <Link to={'/room/' + room.id} className="user-profile-room-card-link">
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2" className="user-profile-room-card-title">
                                                            {(room.permission &&(
                                                                <Fab variant="extended" className="user-profile-page-lock">
                                                                    <Lock />
                                                                </Fab>
                                                            )) || ""}
                                                            {room.title}
                                                        </Typography>
                                                        <Typography component="p">
                                                            {room.description}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className="user-profile-room-card-media"
                                                            image={room.cover && room.cover.replace(/\\/g, '/')}
                                                            title="Contemplative Reptile"
                                                        />
                                                    </CardActionArea>
                                                </Link>
                                                <Link to={'/profile/' + room.creator_id} className="user-profile-room-card-link">
                                                    <div className="user-profile-room-card-header">
                                                        <Avatar
                                                            src={room.avatar ? room.avatar : defaultAvatar}
                                                        >
                                                        </Avatar>
                                                        <span className="user-profile-room-card-header-creator">
                                                            {`by ${room.first_name || "Shy"} ${room.last_name || "Unicorn"}`}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </Card>
                                        </Grid>
                                    )}
                                </Grid>
                            </TabContainer>) || <TabContainer></TabContainer> }

                            { (value === 1 && <TabContainer>
                                <Grid container spacing={24}>
                                    { userProfileData.events.map((event) =>
                                        <Grid item md={6} xs={12}>
                                            <NeventCard
                                                id={event.id}
                                                permission={event.permission}
                                                room_id={event.room_id}
                                                title={event.title}
                                                rating={event.eventRating}
                                                authorId={event.creator_id}
                                                authorName={event.first_name}
                                                authorLastName={event.last_name}
                                                authorAvatar={event.avatar}
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

                            { (value === 2 && <TabContainer>
                                <div className="user-profile-page-gallery">
                                    <Gallery images={userProfileData.media} backdropClosesModal={true} />
                                </div>
                            </TabContainer>) || <TabContainer></TabContainer> }
                        </SwipeableViews>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userProfileData: state.userProfile.userProfileData,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    userProfileAction: id => dispatch(userProfileAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
