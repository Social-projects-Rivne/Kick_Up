import React from 'react';
import { connect } from "react-redux";

import axios from 'axios';

import {Link as RouterLink, Link} from "react-router-dom";

import { loadRoomDetails } from '../../store/actions/rooms';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { AppBar, Tabs, Tab, Typography, Grid, Avatar, Card, CardActions, CardContent, CardMedia,
    CardActionArea, Button, ListItemText, ListItem, ListItemAvatar, Badge, Fab, Paper } from '@material-ui/core';
import { Comment, Collections, Face, NewReleases, EventAvailable, Add, Info, Edit } from '@material-ui/icons';
import Gallery from 'react-grid-gallery';
import SwipeableViews from 'react-swipeable-views';
import Spinner from './../UI/Spinner/Spinner';
import NeventCard from '../nEventCard/nEventCard';
import PostCard from '../PostCard/PostCard';

import defaultAvatar from "../../assets/images/face.png";
import ImageUploader from "./../ImageUploader/ImageUploader";

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
        <Typography component="div" className="room-details-page-typography-padding">
            {props.children}
        </Typography>
    );
}

class RoomPage extends React.Component {

    state = {
        value: 0,
        roomPagePosts: [],
        authUser: false,
        userCount: 0,
        members: '',
        disabledBtn: false,
        showUpload: false,
        roomPageDB: null,
        gallery: []
    };

    getFilteredRoomData = () => {
        const id = this.props.match.params.id;
        const res = this.props.roomPageDB.filter(data => data.id === parseInt(id));
        return res.length > 0 ? res : null;
    };
    componentDidUpdate() {
        if (this.getFilteredRoomData() &&  !this.state.roomPageDB) {   
            const res = this.getFilteredRoomData()[0];
            let gallery = res.media ? res.media : [];
            
            gallery = gallery.map(el => ({ 
                src: el.key.slice(6), 
                thumbnail: el.key.slice(6)
            }));

            this.setState({
                roomPageDB: res,
                gallery
            });
        }        
    };
    componentDidMount() {
        const { id } = this.props.match.params;
        
        // If no room data or gallery, force room update;
        if (
            id && !this.getFilteredRoomData() ||
            this.getFilteredRoomData() && !this.getFilteredRoomData()[0].media
        ) {
            this.props.loadRoomData(id);
        }
        
        // Retrieve MondoDB posts with comments;
        axios
            .get(`/api/room/${id}/posts`)
            .then(res => {
                if (Array.isArray(res.data)) {
                    this.setState({roomPagePosts: res.data.reverse()});
                }
            })
            // In case of error, we are OK;
            .catch(err => {});
        
        this.checkMembersLimit();
        this.invitedMembers();
        this.roomMembers();
    };
    refReadMore = (element) => {
        if (!element)
            return;

        // 5px padding bottom, 48px == 3rem
        if (element.clientHeight - 5 < 48) {
            document.getElementById("read-more-button").style.display = "none";
        }
    };
    checkMembersLimit = () => {
        const { id } = this.props.match.params;
        axios
        .get(`/api/member/room/${id}/members_limit`)
        .then((res) => {
            this.setState({disabledBtn:false})
        }).catch(()=>{
            this.setState({disabledBtn:true})
        });
    }
    invitedMembers = () => {
        const { id } = this.props.match.params;
        axios
        .get(`/api/member/room/${id}`)
        .then((res) => {
            if(res.data.invite){
              this.setState({authUser:  true})
            }
            this.setState({userCount: res.data.count})
        }).catch(()=>{
            this.setState({authUser:  false, userCount: 0})
        })
    }
    roomMembers = () => {
        const { id } = this.props.match.params;
        axios
        .get(`/api/member/room/${id}/members`)
        .then((res) => {
            
            const users = res.data.map( i => i.users[0])
            this.setState( {members: users})
        })
    }
    handleChange = (event, value) => {
        this.setState({ value });
    }
    handleChangeIndex = index => {
        this.setState({ value: index });
    }
    join = () => {
        const eventId = this.props.match.params.id;
        axios.post(`http://localhost:3001/api/member/room/join`, { entity_id:eventId })
        .then((res) => {
            this.roomMembers();
            this.setState({ authUser :!this.state.authUser, userCount: res.data });
          })
          .catch(err => {
           console.log(err);
          });
    }
    leave = () => {
        const eventId = this.props.match.params.id;
        axios.delete(`http://localhost:3001/api/member/room/${eventId}`)
        .then((res) => {
            this.roomMembers();
            this.setState({ authUser :!this.state.authUser, userCount: res.data });
          })
          .catch(err => {
           console.log(err);
          });
    }
    handleAddPostBtnClick = (clickEvt) => {
        clickEvt.stopPropagation();
        const { isAuthenticated } = this.props;

        this.props.history.push(
            { pathname: isAuthenticated 
                ? this.checkUserBelongsToRoom()
                    ? `/room/${this.props.match.params.id}/new-post` 
                    : ''
                : '/sign-in' }
        );

        if (isAuthenticated && !this.checkUserBelongsToRoom()) {
            this.setState({value: 0});
        }
    }
    checkUserBelongsToRoom = () => {
        let res = false;
        const userId = this.props.user.id;
        let foundUser;

        // Check if we have match;
        if (userId && this.state.members.length > 0) foundUser = this.state.members.find(user => user.id === userId);
        if (foundUser) res = true;

        return res;
    }
    showUploadComponent = () => {
        this.setState({showUpload: true})
    }
    closeUploadComponent = () => {
        this.setState({showUpload: false})
    }
    getImagesSRC = (data) => {
        const {src, thumbnail} = data;

        this.setState(prevState => {
            return {
                gallery: prevState.gallery.concat({
                    src,
                    thumbnail
                })
            }
        });
    }
    render() {
        const { value, roomPagePosts, gallery, roomPageDB } = this.state;
        const { isAuthenticated, user } = this.props;

        if (!roomPageDB) {
            return (<Spinner className="rooms-page"/>);
        }

        const joinBtn = (
        <Fab variant="extended" className="room-details-page-fab" onClick={this.join}>
            <span className="room-details-page-join">Join now</span>
        </Fab>
        )
        const leaveBtn = (
        <Fab variant="extended" className="room-details-page-fab" onClick={this.leave}>
            <span className="room-details-page-join">Leave now</span>
        </Fab>
        )
        const renderBtn = this.state.authUser ? leaveBtn : joinBtn;
        const renderMemberTab = (
            <Badge className="badge-room-margin" badgeContent={this.state.userCount}>
                                <Face /> <p className="badge-members">Members</p>
                            </Badge>
        )
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
                        <Tab label={renderMemberTab}
                        />
                    </Tabs>
                </AppBar>
                <ImageUploader 
                    show={this.state.showUpload}
                    closeUploadComponent={this.closeUploadComponent} 
                    entityURL={this.props.match.url}
                    authUser={this.state.authUser}
                    isAuthenticated={isAuthenticated}
                    getImagesSRC={this.getImagesSRC}
                />

                <SwipeableViews
                    index={value}
                    onChangeIndex={this.handleChangeIndex}
                    className="room__tabs-wrapper"
                >
                    { (value === 0 && <TabContainer>
                        <Grid container spacing={24} className="room-details-page-content">
                            <Grid item md={6} xs={12}>
                                <div className="room-details-page-wrapper">
                                    {renderBtn}
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
                            <Fab variant="extended" className="room__add-post-btn" onClick={this.handleAddPostBtnClick}>
                                {isAuthenticated && <Add />}
                                <span> 
                                    {
                                        isAuthenticated
                                        ? this.checkUserBelongsToRoom() 
                                            ? 'Create post' : 'Join room to create a post'
                                        : 'Login to create a new post'
                                    }
                                </span>
                            </Fab>
                            {
                                roomPagePosts.map((post, itr) => 
                                    <Grid key={itr} item xs={12} className="room-details-card-grid">
                                        <PostCard data={post} currentUser={this.props.user ? this.props.user.id : null} roomId={this.props.match.params.id} />
                                    </Grid>
                            )}
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 2 && <TabContainer>
                        <Grid container spacing={24}>
                            {roomPageDB.event.map((event) =>
                                <Grid key={event.id} item lg={4} md={6} xs={12} className="room-details-card-grid">
                                    <NeventCard
                                        id={event.id}
                                        room_id={event.room_id}
                                        title={event.title}
                                        rating={event.eventRating}
                                        authorId={event.creator_id}
                                        authorName={roomPageDB.creator.first_name}
                                        authorLastName={roomPageDB.creator.last_name}
                                        authorAvatar={roomPageDB.creator.avatar}
                                        cover={event.cover}
                                        description={event.description}
                                        eventLocation={event.location}
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
                            <span onClick={this.showUploadComponent}>upload photo</span>
                        </Fab>
                        {
                            gallery && 
                            gallery.length > 0 &&
                            <Gallery images={gallery} backdropClosesModal={true} />
                        }
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 4 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            <Fab variant="extended" className="room__add-post-btn" onClick={this.handleAddPostBtnClick}>
                                {isAuthenticated && <Add />}
                                <span>
                                    {
                                        isAuthenticated
                                        ? this.checkUserBelongsToRoom() 
                                            ? 'Create post' : 'Join room to create a post'
                                        : 'Login to create a new post'
                                    }
                                </span>
                            </Fab>
                            {   roomPagePosts
                                .filter(el => el.isPinned)
                                .map((post, itr) => 
                                    <Grid key={itr} item xs={12} className="room-details-card-grid">
                                        <PostCard data={post} currentUser={this.props.user ? this.props.user.id : null} roomId={this.props.match.params.id} />
                                    </Grid>
                            )}
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }

                    { (value === 5 && <TabContainer>
                        <Grid container spacing={24}>
                            {this.state.members.map((member) =>
                                <Grid key={member.id} item lg={3} md={4} sm={6} xs={12}>
                                    <Link to={`/profile/` + member.id} className="room-page-member-link">
                                        <ListItem className="avatar-center">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Avatar alt="" src={member.avatar ? member.avatar : defaultAvatar} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={(member.first_name || "Shy") + " " + (member.last_name || "Unicorn")} className="avatar-flex" />
                                        </ListItem>
                                    </Link>
                                </Grid>
                            )}
                        </Grid>
                    </TabContainer>) || <TabContainer></TabContainer> }
                </SwipeableViews>

                {value === 0 && isAuthenticated && roomPageDB && (user && roomPageDB.creator_id === user.id) &&(
                    <Link to={this.props.location.pathname + "/edit"} className="room-details-add-event-link">
                        <Fab variant="extended" className="room-details-add-event">
                            <Edit />
                        </Fab>
                    </Link>
                )}

                {value === 2 && isAuthenticated && (
                    <Link to={this.props.location.pathname + "/add-event"} className="room-details-add-event-link">
                        <Fab variant="extended" className="room-details-add-event">
                            <Add />
                        </Fab>
                    </Link>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    roomPageDB: state.rooms.rooms,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});
  
const mapDispatchToProps = dispatch => ({
    loadRoomData: id => dispatch(loadRoomDetails(id))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);