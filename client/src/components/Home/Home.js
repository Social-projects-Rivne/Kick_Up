import React, {Component} from 'react';

import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import axios from "axios";
//import RoomCard from '../Rooms/RoomCard/RoomCard';
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
    Fab
} from '@material-ui/core';
import { Group, ExpandMore } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import StarRating from '../UI/StarRating/StarRating';

const API = {
    getRooms: '/api/room/',
    getEvents: '/api/event/'
};
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};
const mainSliderParams = {
    modules: [Pagination, Navigation],
    containerClass: 'home__main-swiper',
    direction: 'vertical',
    slidesPerView: 1,
    simulateTouch: true,
    pagination: {
        el: ".home__main-swiper-pagination",
        type: 'bullets',
        clickable: true,
        hideOnClick: true
    },
    speed: 800,
    navigation: {
        prevEl: '.edit-profile__form-prev',
        nextEl: '.edit-profile__form-next',
    },
};

class Home extends Component {
    state = {
        events: [],
        rooms: []
    };
    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
    }
    selectedRoomHandler = id => {
        this.props.history.push({ pathname: "/rooms/" + id });
    };
    loadData = (callback) => {
        async function getUser() {
            try {
                const rooms = await axios.get(API.getRooms);
                const events = await axios.get(API.getEvents);
                
                return {
                    events: events.data,
                    rooms: rooms.data
                }
            } catch (err) {
                this.handleServerErrors(err.response.data.error.errors);
            }
        };

        getUser().then(res => {
            if (typeof callback === 'function') return callback(res);
        }).catch(() => {
            this.showToast('Something went wrong, please reload your page.', messageType.ERR);
            return callback(false);
        });
    }
    handleServerErrors = (err) => {
        let res = [];

        // Retrieve all errors;
        Object.values(err).forEach((el) => {
            res.push(el[0]);
        });

        // Show all messages;
        try {
            res.forEach(msg => {
                this.showToast(msg, messageType.ERR);
            });
        } catch(err) {
            this.showToast('Something went wrong :( Try reload your page', messageType.ERR);
        }
    }
    componentDidMount = () => {
        // Retrieve items;
        this.loadData(res => {
            if (res) {
                this.setState({
                    events: res.events,
                    rooms: res.rooms
                });
            }
        });
    }
    render = () => (
        <div className="main-content  home" >
            <Swiper {...mainSliderParams} getSwiper={ this.setSwiper } >
                <div key={1} className="swiper-slide  home__main-swiper-slide">
                    <h1>Here we have slide 1</h1>
                </div>
                <div key={2} className="swiper-slide  home__main-swiper-slide">
                <div className="home__rooms-wrapper">
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe">
                                R
                                </Avatar>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader={<StarRating rating="10" />}
                        >
                        </CardHeader>
                        <CardMedia
                            className="home__img-wrapper"
                            image="https://material-ui.com/static/images/cards/paella.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableActionSpacing>
                            <Fab
                                variant="extended"
                                size="small"
                                color="primary"
                                aria-label="Extend"
                            >
                                <ExpandMore />
                                3 events
                            </Fab>
                            <IconButton className="home__group-members" aria-label="Add to favorites">
                                <Group />
                                <span>13/55</span>
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                minutes.
                                </Typography>
                                <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don’t open.)
                                </Typography>
                                <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            </div>
                <div key={3} className="swiper-slide  home__main-swiper-slide">
                    <h1>Here we have slide 3</h1>
                </div>
            </Swiper>
        </div>
    );
};

export default withSnackbar(Home);
