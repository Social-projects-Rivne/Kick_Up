import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Register from './components/Register/Register';
import Rooms from './components/Rooms/Rooms';
import EventPage from './components/EventPage/EventPage';
import AddRoom from './components/AddRoom/AddRoom';
import RoomDetails from './components/RoomDetails/RoomDetails';
import SignIn from './components/SignIn/SignIn';
import AppliedRoute from './hoc/AppliedRoute/AppliedRoute';

const router = ({ childProps }) => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" component={Register} />
            <AppliedRoute path="/sign-in" exact component={SignIn} props={childProps} />
            <Route path="/events" component={Events} />
            <Route path="/event/:id" component={EventPage} />
            <Route path="/rooms" exact component={Rooms} />
            <Route path={'/rooms/:id'} component={RoomDetails} />
            <Route path="/add-room" component={AddRoom} />
            <Route render={() => (<div style={{color: "red", textAlign: "center", fontSize: "2rem"}}>Page not found </div>)} />
        </Switch>
    );
};

export default router;
