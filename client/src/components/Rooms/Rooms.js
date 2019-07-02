import React, { Component } from "react";
import { connect } from "react-redux";

import { loadRooms, addRooms } from '../../store/actions/rooms';

import Toolbar from "./../Toollbar/Toolbar";

import { Grid } from "@material-ui/core";
import RoomCard from "./RoomCard/RoomCard";
import Spinner from "./../UI/Spinner/Spinner";

const API = {
  getRooms: "/api/room",
  sort: "/api/room/sort",
  filter: "/api/room/filter"
};

class Rooms extends Component {
  state = {
    category: "",
    date: null,
    showDate: true,
    params: null,
    url: API.getRooms
  };

  nextPage = {
    params: {
      page: this.props.page
    }
  }

  onScroll = () => {
    if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight - 150
      && this.props.roomsDB.length < this.props.roomCount) {
      let url = API.getRooms;
      if (this.state.url !== url) url = this.state.url;
      this.props.addRoomsFromDB(
        url,
        {
          params: {
            ...this.state.params,
            page: this.props.page
          }
        }
      );
    }
  }

  componentDidMount() {
    if (this.props.roomsDB.length < 1) {
      this.props.getSortDataFromDB(
        API.getRooms,
        {
          params: {
            page: this.props.page
          }
        }
      );
    }
    this.refs.iScroll.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    this.refs.iScroll.removeEventListener("scroll", this.onScroll);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category, date } = this.state;
    if (prevState.category !== category || prevState.date !== date) {
      this.filterHandle();
    }
    if (prevProps.roomsDB.length !== this.props.roomsDB.length &&
      this.props.roomsDB.length === this.props.roomCount) {
      this.refs.iScroll.removeEventListener("scroll", this.onScroll);
    } else {
      this.refs.iScroll.addEventListener("scroll", this.onScroll);
    }
  }
  filterHandle = () => {
    const filters = {
      params: {
        category: this.state.category,
        date: this.state.date,
        page: 1
      },
    };
    this.setState({ params: { category: this.state.category, date: this.state.date, }, url: API.filter });
    this.props.getSortDataFromDB(API.filter, filters);
  };
  sortRateHandle = () => {
    const type = {
      params: {
        sort: "rate",
        page: 1
      }
    };
    this.setState({ params: { sort: "rate" }, url: API.sort });
    this.props.getSortDataFromDB(API.sort, type);
  };
  sortMembersHandle = () => {
    const type = {
      params: {
        sort: "members",
        page: 1
      }
    };
    this.setState({ params: { sort: "members" }, url: API.sort });
    this.props.getSortDataFromDB(API.sort, type);
  };
  sortCreatedHandle = () => {
    const type = {
      params: {
        sort: "create",
        page: 1
      }
    };
    this.setState({ params: { sort: "create" }, url: API.sort });
    this.props.getSortDataFromDB(API.sort, type);
  };
  resetFiltersHandle = () => {
    this.props.getSortDataFromDB(
      API.getRooms,
      {
        params: {
          page: 1
        }
      }
    );
    this.setState({
      category: "",
      date: null,
      url: API.getRooms
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
    console.log('categories', categories)
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
        <div className="rooms-page" ref="iScroll">
          <Toolbar
            isAuthenticated={this.props.isAuthenticated}
            datafromBase={this.props.roomsDB}
            buttons={toolbarButtons}
            filters={toolbarFilters}
            changeHandle={this.changeHandle}
            category={this.state.category}
            showDate={true}
            date={this.state.date}
            changeDate={this.changeDate}
            addLink="/room/add"
          />
          <Grid container spacing={8} justify="center" className="rooms-page-cards">
            {roomsDB.length > 0 ? roomsDB.map(room => {
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
            }) :
              <h3>Not found!</h3>}
          </Grid>
          {this.props.roomsDB.length < this.props.roomCount && <Spinner className="rooms-page" />}
        </div>
      );
    return roomPage;
  }
}

const mapStateToProps = state => ({
  roomsDB: state.rooms.rooms,
  page: state.rooms.pageCount,
  roomCount: state.rooms.roomCount,
  isLoading: state.rooms.roomsLoading
});

const mapDispatchToProps = dispatch => ({
  getSortDataFromDB: (uri, filter) => dispatch(loadRooms(uri, filter)),
  addRoomsFromDB: (uri, filter) => dispatch(addRooms(uri, filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);