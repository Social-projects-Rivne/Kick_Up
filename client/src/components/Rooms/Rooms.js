import React, { Component } from "react";
import axios from "axios";

import Toolbar from "./../Toollbar/Toolbar";

import { Grid } from "@material-ui/core";
import RoomCard from "./RoomCard/RoomCard";
import Spinner from "./../UI/Spinner/Spinner";

const API = {
  getRooms: "/api/room",
  sort: "/api/room/sort",
  filter: "/api/room/filter",
  resetFilters: "/api/room/reset-filters"
};

class Rooms extends Component {
  state = {
    roomsDB: null,
    FilteredRooms: null,
    isLoading: true,
    category: "",
    date: null,
    showDate: true
  };
  componentDidMount() {
    this.getSortDataFromDB(API.getRooms);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category, date } = this.state;
    if (prevState.category !== category || prevState.date !== date) {
      this.filterHandle();
    }
  }

  getSortDataFromDB = (api, type) => {
    this.setState({ isLoading: true });
    axios
      .get(api, type)
      .then(res => {
        console.log('res.data.rooms',res.data.rooms)
        this.setState({ roomsDB: res.data.rooms, isLoading: false });
      })
      .catch(err => console.log(err));
  };

  getFilteredDataFromDB = (api, filter) => {
    this.setState({ isLoading: true });
    axios
      .get(api, filter)
      .then(console.log("Data filtered by", api))
      .then(res => {
        this.setState({ roomsDB: res.data.rooms, isLoading: false });
      })
      .catch(err => console.log(err));
  };

  filterHandle = () => {
    const filters = {
      params: {
        category: this.state.category,
        date: this.state.date,
      },
    };
    this.getFilteredDataFromDB(API.filter, filters);
  };

  sortRateHandle = () => {
    const type = {
      params: {
        sort: "rate"
      }
    };
    this.getSortDataFromDB(API.sort, type);
  };
  sortMembersHandle = () => {
    const type = {
      params: {
        sort: "members"
      }
    };
    this.getSortDataFromDB(API.sort, type);
  };
  sortCreatedHandle = () => {
    const type = {
      params: {
        sort: "create"
      }
    };
    this.getSortDataFromDB(API.sort, type);
  };

  resetFiltersHandle = () => {
    this.getSortDataFromDB(API.getRooms);
    this.setState({
      category: "",
      date: null
    });
  };

  changeHandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeDate = date => {
    console.log('date', date)
    this.setState({ date });
  };

  selectedRoomHandler = id => {
    this.props.history.push({ pathname: "/room/" + id });
  };

  render() {
    const { roomsDB, isLoading } = this.state;
    console.log('roomsDB', roomsDB)
    const toolbarButtons = [
      { name: "Top Rate", method: this.sortRateHandle },
      { name: "Top Members", method: this.sortMembersHandle },
      { name: "Newly Create", method: this.sortCreatedHandle },
      { name: "Reset filter", method: this.resetFiltersHandle }
    ];
    let categories = null;
    if (roomsDB) {
      categories = roomsDB
        .map(e => {
          return e.category.title;
        })
        .filter((v, i, a) => a.indexOf(v) === i);
    }
    const toolbarFilters = [
      {
        type: "category",
        itemsArray: categories,
        value: this.state.category,
        labelWidth: 75
      }
    ];
    const roomPage = isLoading ? (
      <Spinner className="rooms-page" />
    ) : (
      <div className="rooms-page">
        <Toolbar
          datafromBase={this.state.roomsDB}
          buttons={toolbarButtons}
          filters={toolbarFilters}
          sortHandle={this.sortHandle}
          changeHandle={this.changeHandle}
          category={this.state.category}
          showDate={true}
          date={this.state.date}
          changeDate={this.changeDate}
          addLink="/room/add"
        />
        <Grid container spacing={8} justify="center" className="rooms-page-cards">
          {roomsDB.map(room => {
            const membersCount = room.members.length;
            return (
              <RoomCard
                key={room.id}
                title={room.title}
                category={room.category.title}
                avatar={room.creator.avatar}
                description={room.description}
                limit={room.members_limit}
                rating={room.roomRating}
                members={membersCount}
                background={room.cover}
                clicked={() => this.selectedRoomHandler(room.id)}
              />
            );
          })} 
        </Grid>
      </div>
    );
    return roomPage;
  }
}

export default Rooms;
