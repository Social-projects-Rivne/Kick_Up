import React, { Component } from "react";
import { connect } from "react-redux";

import { loadRooms } from '../../store/actions/rooms';

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
    category: "",
    date: null,
    showDate: true
  };
  componentDidMount() {
    // @todo add logic for pagination;
    if (this.props.roomsDB.length <= 1) {
      this.props.getSortDataFromDB(API.getRooms);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category, date } = this.state;
    if (prevState.category !== category || prevState.date !== date) {
      this.filterHandle();
    }
  }
  filterHandle = () => {
    const filters = {
      params: {
        category: this.state.category,
        date: this.state.date,
      },
    };
    this.props.getSortDataFromDB(API.filter, filters);
  };
  sortRateHandle = () => {
    const type = {
      params: {
        sort: "rate"
      }
    };
    this.props.getSortDataFromDB(API.sort, type);
  };
  sortMembersHandle = () => {
    const type = {
      params: {
        sort: "members"
      }
    };
    this.props.getSortDataFromDB(API.sort, type);
  };
  sortCreatedHandle = () => {
    const type = {
      params: {
        sort: "create"
      }
    };
    this.props.getSortDataFromDB(API.sort, type);
  };
  resetFiltersHandle = () => {
    this.props.getSortDataFromDB(API.getRooms);
    this.setState({
      category: "",
      date: null
    });
  };
  changeHandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  changeDate = date => {
    this.setState({ date });
  };
  selectedRoomHandler = id => {
    this.props.history.push({ pathname: "/room/" + id });
  };
  render() {
    const { roomsDB, isLoading } = this.props;
    const toolbarButtons = [
      { name: "Top Rate", method: this.sortRateHandle },
      { name: "Top Members", method: this.sortMembersHandle },
      { name: "Newly Create", method: this.sortCreatedHandle },
      { name: "Reset filter", method: this.resetFiltersHandle }
    ];
    let categories = null;
    if (roomsDB.length > 0) {
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
        {
          this.props.roomsDB.length > 0 &&
            <Toolbar
            isAuthenticated={this.props.isAuthenticated}
            datafromBase={this.props.roomsDB}
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
        }
        <Grid container spacing={8} justify="center" className="rooms-page-cards">
          {roomsDB.length > 0 && roomsDB.map(room => {
            return (
              <RoomCard
                key={room.id}
                title={room.title}
                category={room.category.title}
                avatar={room.creator.avatar}
                description={room.description}
                limit={room.members_limit}
                rating={room.roomRating}
                members={room.members.length}
                background={room.cover && room.cover.replace(/\\/g, '/')}
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

const mapStateToProps = state => ({
  roomsDB: state.rooms.rooms,
  isLoading: state.rooms.roomsLoading
});

const mapDispatchToProps = dispatch => ({
  getSortDataFromDB: (uri, filter) => dispatch(loadRooms(uri, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);