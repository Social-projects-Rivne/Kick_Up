import React from 'react';

import '../../styles/index.scss';
import event from '../../assets/images/event.jpg';

import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

const Home = props => {
    console.log('home props', props)
    return (
        <div className="main-content" >
        <Grid container spacing={24}>
            <Grid item md={4} xs={12}>
                <Card className="card">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="event"
                            className="media"
                            height="140"
                            image={event}
                            title="event"
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
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item md={4} xs={12}>
                <Card className="card">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="event"
                            className="media"
                            height="140"
                            image={event}
                            title="event"
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
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item md={4} xs={12}>
                <Card className="card">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="event"
                            className="media"
                            height="140"
                            image={event}
                            title="event"
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
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item md={6} xs={12}>
                <Card className="card">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="event"
                            className="media"
                            height="140"
                            image={event}
                            title="event"
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
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item md={6} xs={12}>
                <Card className="card">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="event"
                            className="media"
                            height="140"
                            image={event}
                            title="event"
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
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        </div>
    );
};

export default Home;
