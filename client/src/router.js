import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Register from './components/Register/Register';
import Rooms from './components/Rooms/Rooms';
import EventPage from './components/EventPage/EventPage';
import EditEvent from './components/EditEvent/EditEvent';
import AddRoom from './components/AddRoom/AddRoom';
import SignIn from './components/SignIn/SignIn';
import AppliedRoute from './hoc/AppliedRoute/AppliedRoute';
import RoomPage from './components/RoomPage/RoomPage';
import EditRoom from './components/EditRoom/EditRoom';
import EditProfile from './components/EditProfile/EditProfile';
import AddEvent from "./components/AddEvent/AddEvent";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import UserProfile from './components/UserProfile/UserProfile';
import AddPost from './components/AddPost/AddPost';
import AdminPanel from './components/AdminPanel/AdminPanel'

const router = ({ childProps }) => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <AppliedRoute path="/sign-up" component={Register} props={childProps} />
            <Route path="/sign-in" exact component={SignIn} />
            <AppliedRoute path="/events" exact component={Events} props={childProps} />
            <AppliedRoute path="/event/add" exact component={AddEvent} props={childProps} />
            <AppliedRoute path="/event/:id" exact component={EventPage} props={childProps}/>
            <AppliedRoute path="/event/:id/edit" exact component={EditEvent} props={childProps} />
            <AppliedRoute path="/rooms" exact component={Rooms} props={childProps}/>
            <AppliedRoute path="/room/add" exact component={AddRoom} props={childProps}/>
            <AppliedRoute path="/room/:id/add-event" component={AddEvent} props={childProps} />
            <AppliedRoute path="/room/:id" exact component={RoomPage} props={childProps} />
            <AppliedRoute path="/room/:id/edit" exact component={EditRoom} props={childProps} />
            <AppliedRoute path="/room/:id/new-post" component={AddPost} props={childProps} />
            <AppliedRoute path="/profile/:id" exact component={UserProfile} props={childProps} />
            <Route path="/profile/:id/edit" component={EditProfile} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/admin-panel" component={AdminPanel} />
            <Route render={() => (<div style={{color: "red", textAlign: "center", fontSize: "2rem"}}>Page not found </div>)} />
        </Switch>
    );
};

export default router;
