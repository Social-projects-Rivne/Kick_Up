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
import RoomPage from './components/RoomPage/RoomPage';
import EditRoom from './components/EditRoom/EditRoom';
import EditProfile from './components/EditProfile/EditProfile';
import AddEvent from "./components/AddEvent/AddEvent";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import UserProfile from './components/UserProfile/UserProfile';
import AddPost from './components/AddPost/AddPost';
import AddComplaint from './components/AddComplaint/AddComplaint';
import AdminPanel from './components/AdminPanel/AdminPanel'

const router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" component={Register} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/events" exact component={Events} />
            <Route path="/event/add" exact component={AddEvent} />
            <Route path="/event/:id" exact component={EventPage}/>
            <Route path="/event/:id/edit" exact component={EditEvent} />
            <Route path="/rooms" exact component={Rooms}/>
            <Route path="/room/add" exact component={AddRoom}/>
            <Route path="/room/:id/add-event" component={AddEvent} />
            <Route path="/room/:id" exact component={RoomPage} />
            <Route path="/room/:id/edit" exact component={EditRoom} />
            <Route path="/room/:id/new-post" component={AddPost} />
            <Route path="/profile/:id" exact component={UserProfile} />
            <Route path="/profile/:id/edit" component={EditProfile} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/complaint" component={AddComplaint} />
            <Route path="/admin-panel" component={AdminPanel} />
            <Route render={() => (<div style={{color: "red", textAlign: "center", fontSize: "2rem"}}>Page not found </div>)} />
        </Switch>
    );
};

export default router;
