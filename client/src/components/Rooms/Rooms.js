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
  filterByDate: '/api/room/filter-by-date',
  resetFilters: '/api/room/reset-filters',
}

class Rooms extends Component {
  state = {
    roomsDB: null,
    FilteredRooms: null,
    isLoading: true,
    category: "",
    date: null
  };
  componentDidMount() {
    this.getDataFromDB(API.getRooms);
    this.getDate();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category } = this.state;
    if (prevState.category !== this.state.category) {
      this.filterHandle(API.filterByCategory, category)
    }
  }

  getDataFromDB = (api) => {
    this.setState({isLoading: true});
    axios.get(api)
        .then(console.log('Data sorted by', api))
        .then(res => {
          console.log('res===>', res)
          this.setState({roomsDB: res.data, isLoading: false})
        })
        .catch(err => console.log(err));
  }

  postDataFromDB = (api, filter) => {
    this.setState({isLoading: true});
    axios.post(api, {filter: filter})
        .then(console.log('Data filtered by', api))
        .then(res => {
          console.log('res===>', res)
          this.setState({roomsDB: res.data, isLoading: false})
        })
        .catch(err => console.log(err));
  }

  sortHandle = api => {
    this.getDataFromDB(api)
  }

  filterHandle = (api, filter) => {
    filter ? this.postDataFromDB(api, filter) : this.getDataFromDB(API.getRooms);
  }

  sortRateHandle = () => {
    this.sortHandle(API.sortRate)
  };
  sortMembersHandle = () => {
    this.sortHandle(API.sortMember)
  };
  sortCreatedHandle = () => {
    this.sortHandle(API.sortCreated)
  };
  resetFiltersHandle = () => {
    this.getDataFromDB(API.getRooms);
    this.setState({
      category: "",
    });
  };

  changeHandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getDate = () => {
    const currentDate = new Date();
    const date = this.formatDate(currentDate);
    this.setState({ date });
  };

  formatDate = d => {
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    const curr_year = d.getFullYear();
    if (curr_month < 10) curr_month = "0" + curr_month;
    if (curr_date < 10) curr_date = "0" + curr_date;
    const date = curr_year + "-" + curr_month + "-" + curr_date;
    return date;
  };

  changeDateHandle = event => {
    console.log('event', event.target.value, this.state.date)
    this.changeHandle(event);
    const { date } = this.state;
    this.filterHandle(API.filterByDate, date)

    // const dataListByDate = [...this.state.datafromBase].filter(e => {
    //   return this.formatDate(new Date(e.created_at)) === event.target.value;
    // });
  };

  selectedRoomHandler = (id) => {
    this.props.history.push({pathname: '/rooms/' + id})
  }

  render() {
    const { roomsDB, isLoading } = this.state;
    console.log('roomsDB', roomsDB)
    const toolbarButtons = [
      {name:'Top Rate', method: this.sortRateHandle},
      {name:'Top Members', method: this.sortMembersHandle},
      {name:'Newly Create', method: this.sortCreatedHandle},
      {name:'Reset filter', method: this.resetFiltersHandle},
    ];
    let categories = null;
    if (roomsDB) {
      categories = roomsDB.map(e => {
        return e.category.title;
      })
        .filter((v, i, a) => a.indexOf(v) === i)
      console.log("categories", categories);
    }
    const toolbarFilters = [
      {type: 'Category', itemsArray: categories, value: this.state.category, labelWidth: 75},
    ];
    const roomPage = isLoading ? 
        <Spinner /> :
        <>
          <Toolbar 
            datafromBase={this.state.roomsDB}
            buttons={toolbarButtons}
            filters={toolbarFilters}
            sortHandle={this.sortHandle}
            changeHandle={this.changeHandle}
            category={this.state.category}
            showDate={this.state.date}
            changeDateHandle={this.changeDateHandle}
          />
          <Grid container>
            {roomsDB.map(room => {
              return (
                <RoomCard
                  key={room.id}
                  title={room.title}
                  category={room.category.title}
                  avatar={room.creator.avatar}
                  description={room.description}
                  limit={room.members_limit}
                  rating={room.rating}
                  members={room.members}
                  background={room.cover}
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

