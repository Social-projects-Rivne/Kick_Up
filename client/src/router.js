import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Register from './components/Register/Register';
import Rooms from './components/Rooms/Rooms';
import AddRoom from './components/AddRoom/AddRoom';
import RoomDetails from './components/RoomDetails/RoomDetails';

const router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/events" component={Events} />
            <Route path="/rooms" component={Rooms} />
            <Route path={"/rooms" + '/:id'} exact component={RoomDetails} />
            <Route path="/add-room" component={AddRoom} />
            <Route render={() => (<div style={{color: "red", textAlign: "center", fontSize: "2rem"}}>Page not found </div>)} />
        </Switch>
    );
};

export default router;
