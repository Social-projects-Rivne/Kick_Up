import React, { Component } from "react";
import axios from "axios";

import roomsDB from "./../../mocks/rooms";
import Toolbar from "./../Toollbar/Toolbar";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RoomCard from "./RoomCard/RoomCard";
import Spinner from "./../UI/Spinner/Spinner";

class Rooms extends Component {
  state = {
    roomsDB: null,
    FilteredRooms: null,
    isLoading: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        roomsDB,
        FilteredRooms: roomsDB,
        isLoading: false
      });
    }, 1500);
    // axios.get('/api/rooms')
    //     .then(res=> console.log(res))
    //     .then(res => this.setState({roomsData: res.data.roomsData, roomsMySQL: res.data.roomsMySQL}))
    //     .catch(err=> {
    // console.log(err);
    // this.setState({isLoading:false});
    // })    
  }

  selectedRoomHandler = (id) => {
    this.props.history.push({pathname: '/rooms/' + id})
  }
  render() {
    const { FilteredRooms, isLoading } = this.state;

    const roomList = isLoading ? (
      <Spinner />
    ) : (
      FilteredRooms.map(room => {
        return (
            <RoomCard
              key={room.id}
              title={room.title}
              category={room.category}
              avatar={room.creator_avatar}
              description={room.description}
              limit={room.members_limit}
              rating={room.rating}
              members={room.members}
              background={room.background}
              clicked={() => this.selectedRoomHandler(room.id)}
            />
        );
      })
    );
    return (
      <>
        <Toolbar />
        <Grid container>{roomList}</Grid>
      </>
    );
  }
}

export default Rooms;

