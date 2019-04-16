import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { withRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Typography, Grid, Avatar, Card, CardActions, CardContent, CardMedia,
    CardActionArea, Button, ListItemText, ListItem, ListItemAvatar, Badge, Fab, Paper } from '@material-ui/core';
import { Comment, Collections, Face, NewReleases, EventAvailable, Add, Info } from '@material-ui/icons';
import Gallery from 'react-grid-gallery';
import SwipeableViews from 'react-swipeable-views';

const images = [
    {
        src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: false,
        caption: "286H (gratisography.com)"
    },
    {
        src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "A photo by 贝莉儿 NG. (unsplash.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "Boats (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "286H (gratisography.com)"
    },
    {
        src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
        thumbnailWidth: 212,
        thumbnailHeight: 320,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "A photo by 贝莉儿 NG. (unsplash.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "Boats (Jeshu John - designerspics.com)"
    },
    {
        src: "https://images.fineartamerica.com/images-medium-large-5/great-smoky-mountains-national-park-nc-western-north-carolina-dave-allen.jpg",
        thumbnail: "https://images.fineartamerica.com/images-medium-large-5/great-smoky-mountains-national-park-nc-western-north-carolina-dave-allen.jpg",
        thumbnailWidth: 370,
        thumbnailHeight: 274,
    },
    {
        src: "https://static.boredpanda.com/blog/wp-content/uploads/2015/02/I-am-a-mountain-photographer-and-for-6-years-I-photograph-my-tent-in-the-mountains-20__880.jpg",
        thumbnail: "https://static.boredpanda.com/blog/wp-content/uploads/2015/02/I-am-a-mountain-photographer-and-for-6-years-I-photograph-my-tent-in-the-mountains-20__880.jpg",
        thumbnailWidth: 370,
        thumbnailHeight: 252,
        tags: [{value: "Nature", title: "Nature"}, {value: "Animal", title: "Animal"}],
    },
    {
        src: "https://www.publicdomainpictures.net/download-picture.php?id=204972&check=fa4dc0efb5e6475b949238ede88456e8",
        thumbnail: "https://www.publicdomainpictures.net/download-picture.php?id=204972&check=fa4dc0efb5e6475b949238ede88456e8",
        thumbnailWidth: 412,
        thumbnailHeight: 320,
        tags: [{value: "Nature", title: "Nature"}, {value: "People", title: "People"}],
    },
    {
        src: "https://steemitimages.com/DQmbsy3neKZAtKHCR4z8DR9zU5Ae6m6chjn2HVYMVRc8sxg/pho.jpg",
        thumbnail: "https://steemitimages.com/DQmbsy3neKZAtKHCR4z8DR9zU5Ae6m6chjn2HVYMVRc8sxg/pho.jpg",
        thumbnailWidth: 612,
        thumbnailHeight: 320,
        tags: [{value: "Nature", title: "Nature"}, {value: "People", title: "People"}],
    }
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
                        <Tab className="badge-tab-members" label={
                            <Badge className="badge-room-margin" badgeContent={4} color="primary">
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
                    {value === 0 && <TabContainer className="room-details-page-info-tab">
                        <Grid container spacing={24} className="room-details-page-content">
                            <Grid item md={6} xs={12}>
                                <div className="room-details-page-wrapper">
                                    <Fab variant="extended" className="room-details-page-fab">
                                        <Add />
                                        <span className="room-details-page-join">Join</span>
                                    </Fab>
                                    <Typography className="room-details-page-title">
                                        Room name
                                    </Typography>
                                </div>
                                <Paper className="room-details-page-paper" elevation={1}>
                                    <input type="checkbox" className="read-more-state" id="post-1"/>
                                    <Typography className="read-more-wrap">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero fuga facilis vel consectetur quos sapiente
                                        eleniti eveniet dolores tempore eos deserunt officia quis ab?
                                        Excepturi vero tempore minus beatae voluptatem! Libero fuga facilis vel consectetur quos sapiente deleniti eveniet dolores tempore eos deserunt officia quis ab?
                                        Excepturi vero tempore minus beatae voluptatem!
                                    </Typography>
                                    <label htmlFor="post-1" className="read-more-trigger"></label>
                                </Paper>
                            </Grid>
                            <Grid item md={6} xs={12} className="room-details-page-cover-grid">
                                <img src="https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/11/format-website-builder-photography-3.jpg" className="room-details-page-cover"/>
                            </Grid>
                        </Grid>
                    </TabContainer> }

                    {value === 1 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            <Grid item xs={12} className="room-details-card-grid">
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
                            </Grid>
                            <Grid item xs={12} className="room-details-card-grid">
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
                            </Grid>
                        </Grid>
                    </TabContainer> }

                    {value === 2 && <TabContainer>
                        <Grid container spacing={24} className="room-details-card">
                            <Grid item md={6} xs={12} className="room-details-card-grid">
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
                            </Grid>
                            <Grid item md={6} xs={12} className="room-details-card-grid">
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
                            </Grid>
                            <Grid item md={6} xs={12} className="room-details-card-grid">
                                <Card className="card">
                                    <CardActionArea>
                                        <CardMedia
                                            className="card-media"
                                            image="http://lorempixel.com/1000/600/nature/1/"
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
                            </Grid>
                            <Grid item md={6} xs={12} className="room-details-card-grid">
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
                            </Grid>
                        </Grid>
                    </TabContainer> }

                    {value === 3 && <TabContainer>
                        <Fab variant="extended" className="room-details-page-photo-fab">
                            <Add />
                            <span className="room-details-page-upload-photo">upload photo</span>
                        </Fab>
                        <Gallery images={images} backdropClosesModal={true} />
                    </TabContainer> }

                    {value === 4 && <TabContainer>
                        <div className="room-details-card">
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
                    </TabContainer> }

                    {value === 5 && <TabContainer>
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
                    </TabContainer> }
                </SwipeableViews>
            </div>
        );
    }
}

export default withRouter(RoomPage);
