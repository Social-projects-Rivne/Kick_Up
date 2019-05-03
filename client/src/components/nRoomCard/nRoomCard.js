import React from "react";

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
import StarRating from "../UI/StarRating/StarRating";

const NroomCard = props => {
  return (
    <Card className="roomcard">
        <CardHeader
            className="roomcard__header"
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
            className="roomcard__img-wrapper"
            image="https://material-ui.com/static/images/cards/paella.jpg"
            title="Paella dish"
        />
        <CardContent>
            <Typography component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing 
                elit. Duis lacinia efficitur ligula, vitae vehicula 
                nunc viverra et. Praesent erat tellus, dictum ac eleifend 
                a, egestas nec nisl. Donec id tempor nulla. Fusce pretium 
                urna non odio ullamcorper lacinia.
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
            <IconButton className="roomcard__group-members" aria-label="Add to favorites">
                <Group />
                <span>13/55</span>
            </IconButton>
        </CardActions>
        <Collapse timeout="auto" unmountOnExit>
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
  );
};

export default NroomCard;