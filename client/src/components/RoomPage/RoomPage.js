import React from 'react';

import '../../styles/index.scss';


import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Grid, Avatar } from '@material-ui/core';
import { Comment, Collections, Face, NewReleases, VerifiedUser } from '@material-ui/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Gallery from 'react-photo-gallery';
import event from '../../assets/images/gl-ph-3.jpg';

import { withRouter } from 'react-router-dom';

const PHOTO_SET = [
    {
        src: event,
        width: 4,
        height: 3
    },
    {
        src: event ,
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
                <Carousel>
                    <div>
                        <img src="http://lorempixel.com/1000/600/nature/1/" />
                    </div>
                    <div>
                        <img src="http://lorempixel.com/1000/600/nature/1/" />
                    </div>
                    <div>
                        <img src="http://lorempixel.com/1000/600/nature/1/" />

                    </div>
                </Carousel>

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

                {value === 0 && <TabContainer>Item One</TabContainer>}
                {value === 1 && <TabContainer><Gallery photos={PHOTO_SET} /></TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
                {value === 3 && <TabContainer>
                    <Grid>
                        <Avatar alt="ava" src={event} className="avatar" />
                        <div>Full Name</div>

                        <Avatar alt="ava" src={event} className="avatar" />
                        <div>Full Name</div>

                        <Avatar alt="ava" src={event} className="avatar" />
                        <div>Full Name</div>

                        <Avatar alt="ava" src={event} className="avatar" />
                        <div>Full Name</div>

                        <Avatar alt="ava" src={event} className="avatar" />
                        <div>Full Name</div>

                        <Avatar alt="ava" src={event} className="avatar" />
                        <div>Full Name</div>
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
