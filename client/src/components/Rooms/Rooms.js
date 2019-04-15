import React, { Component } from "react";
import axios from "axios";

// import roomsDB from "./../../mocks/rooms";
import Toolbar from "./../Toollbar/Toolbar";

import { Grid } from "@material-ui/core";
import RoomCard from "./RoomCard/RoomCard";
import Spinner from "./../UI/Spinner/Spinner";

const API = {
  getRooms: '/api/room',
  sortRate: '/api/room/sort-rating',
  sortMember: '/api/room/sort-members',
  sortCreated: '/api/room/sort-created',
  filterByCategory: '/api/room/filter-by-category',
  filterByLocation: '/api/room/filter-by-location',
  resetFilters: '/api/room/reset-filters',
}

class Rooms extends Component {
  state = {
    roomsDB: null,
    FilteredRooms: null,
    isLoading: true,
    city: "",
    category: "",
  };
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     roomsDB,
    //     FilteredRooms: roomsDB,
    //     isLoading: false
    //   });
    // }, 1000);
    this.getDataFromDB(API.getRooms);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category, city } = this.state;
    if (prevState.category !== this.state.category) {
      this.sortHandle(API.filterByCategory, category)
    }
    if (prevState.city !== this.state.city) {
      this.sortHandle(API.filterByLocation, city)
    }
  }

  getDataFromDB = (api) => {
    axios.get(api)
        .then(console.log('Data sorted by', api))
        .then(res => this.setState({roomsDB: res.data.roomsData, isLoading: false}))
        .catch(err => console.log(err))
  }

  postDataFromDB = (api, filter) => {
    axios.post(api, filter)
        .then(console.log('Data filtered by', api))
        // .then(res => this.setState({roomsDB: res.data.roomsData}))
        .catch(err => console.log(err))
  }

  sortHandle = api => {
    this.getDataFromDB(api)
  }

  filterHandle = (api, filter) => {
    this.postDataFromDB(api, filter)
  }

  sortRateHandle = () => {
    const roomsAray = [...this.state.roomsDB];
    roomsAray.sort((a, b) => b.rating - a.rating);
    this.setState({ roomsDB: roomsAray });
  };
  sortMembersHandle = () => {
    const roomsAray = [...this.state.roomsDB];
    roomsAray.sort((a, b) => b.members - a.members);
    this.setState({ roomsDB: roomsAray });
  };
  sortCreatedHandle = () => {
    const roomsAray = [...this.state.roomsDB];
    roomsAray.sort((a, b) => a.created_at - b.created_at);
    this.setState({ roomsDB: roomsAray });
    console.log("roomsAray", roomsAray);
  };
  resetFiltersHandle = () => {
    this.setState({ 
      // roomsDB,
      city: "",
      category: "",
    });
  };
  changeHandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  selectedRoomHandler = (id) => {
    this.props.history.push({pathname: '/rooms/' + id})
  }

  render() {
    const { roomsDB, isLoading } = this.state;
    console.log('roomsDB', roomsDB)
    const toolbarButtons = [
      {name:'Top Rate', method: this.sortRateHandle}, //this.sortHandle()
      {name:'Top Members', method: this.sortMembersHandle},
      {name:'Newly Create', method: this.sortCreatedHandle},
      {name:'Reset filter', method: this.resetFiltersHandle},
    ];
    const roomPage = isLoading ? 
        <Spinner /> :
        <>
          <Toolbar 
            datafromBase={this.state.roomsDB}
            buttons={toolbarButtons}
            sortHandle={this.sortHandle}
            changeHandle={this.changeHandle}
            category={this.state.category}
            city={this.state.city}
          />
          <Grid container>
            {roomsDB.map(room => {
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
            })}
          </Grid>
        </>;
    return roomPage;
  }
}

export default Rooms;

