import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Register from './components/Register/Register';
import Rooms from './components/Rooms/Rooms';
import EventPage from './components/EventPage/EventPage';
import AddRoom from './components/AddRoom/AddRoom';
import SignIn from './components/SignIn/SignIn';
import AppliedRoute from './hoc/AppliedRoute/AppliedRoute';
import RoomPage from './components/RoomPage/RoomPage';
import EditRoom from './components/EditRoom/EditRoom';
import EditProfile from './components/EditProfile/EditProfile';
import AddEvent from "./components/AddEvent/AddEvent";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import UserProfile from './components/UserProfile/UserProfile';

const router = ({ childProps }) => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" component={Register} />
            <AppliedRoute path="/sign-in" exact component={SignIn} props={childProps} />
            <AppliedRoute path="/events" exact component={Events} props={childProps} />
            <Route path="/event/add" exact component={AddEvent} />
            <AppliedRoute path="/event/:id" component={EventPage} props={childProps}/>
            <AppliedRoute path="/rooms" exact component={Rooms} props={childProps}/>
            <Route path="/room/add" exact component={AddRoom} />
            <Route path="/room/:id/add-event" component={AddEvent} />
            <AppliedRoute path="/room/:id" exact component={RoomPage} props={childProps} />
            <Route path="/room/:id/edit" component={EditRoom} />
            <Route path="/profile/:id" exact component={UserProfile} />
            <Route path="/profile/:id/edit" component={EditProfile} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route render={() => (<div style={{color: "red", textAlign: "center", fontSize: "2rem"}}>Page not found </div>)} />
        </Switch>
    );
};

export default router;
