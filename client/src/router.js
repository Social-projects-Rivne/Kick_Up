import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Register from './components/Register/Register';
import Rooms from './components/Rooms/Rooms';
import SignIn from './components/SignIn/SignIn';
import AppliedRoute from './hoc/AppliedRoute/AppliedRoute';
import RoomPage from './components/RoomPage/RoomPage';

const router = ({ childProps }) => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" component={Register} />
            <AppliedRoute path="/sign-in" exact component={SignIn} props={childProps} />
            <Route path="/events" component={Events} />
            <Route path="/rooms" component={Rooms} />
            <Route path="/room/:id" component={RoomPage} />
            <Route render={() => (<div style={{color: "red", textAlign: "center", fontSize: "2rem"}}>Page not found </div>)} />
        </Switch>
    );
};

export default router;
