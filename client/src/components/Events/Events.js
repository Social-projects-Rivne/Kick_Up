import React, { Component } from "react";
import axios from "axios";

import Toolbar from "./../Toollbar/Toolbar";

import { Grid } from "@material-ui/core";
import EventCard from "./EventCard/EventCard";
import Spinner from "./../UI/Spinner/Spinner";

const API = {
  getRooms: "/api/room",
  sort: "/api/room/sort",
  filter: "/api/room/filter",
  resetFilters: "/api/room/reset-filters"
};

class Events extends Component {
  state = {
    eventsDB: null,
    FilteredEvents: null,
    isLoading: true,
    filters: {
      category: "",
      date: null
    },
    category: "",
    date: null,
    showDate: true
  };
  componentDidMount() {
    this.getDataFromDB(API.getRooms);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category, date } = this.state;
    if (prevState.category !== category || prevState.date !== date) {
      this.filterHandle();
    }
  }

  getDataFromDB = (api, type) => {
    this.setState({ isLoading: true });
    axios
      .get(api, type)
      .then(res => {
        this.setState({ eventsDB: res.data, isLoading: false });
      })
      .catch(err => console.log(err));
  };

  postDataFromDB = (api, filter) => {
    this.setState({ isLoading: true });
    axios
      .post(api, filter)
      .then(console.log("Data filtered by", api))
      .then(res => {
        this.setState({ eventsDB: res.data, isLoading: false });
      })
      .catch(err => console.log(err));
  };

  filterHandle = () => {
    const filters = {
      category: this.state.category,
      date: this.state.date
    };
    filters
      ? this.postDataFromDB(API.filter, filters)
      : this.getDataFromDB(API.getRooms);
  };

  sortRateHandle = () => {
    const type = {
      params: {
        sort: "rate"
      }
    };
    this.getDataFromDB(API.sort, type);
  };
  sortMembersHandle = () => {
    const type = {
      params: {
        sort: "members"
      }
    };
    this.getDataFromDB(API.sort, type);
  };
  sortCreatedHandle = () => {
    const type = {
      params: {
        sort: "create"
      }
    };
    this.getDataFromDB(API.sort, type);
  };

  resetFiltersHandle = () => {
    this.getDataFromDB(API.getRooms);
    this.setState({
      category: ""
    });
  };

  changeHandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeDate = date => {
    this.setState({ date });
  };

  selectedRoomHandler = id => {
    this.props.history.push({ pathname: "/rooms/" + id });
  };

  render() {
    const { eventsDB, isLoading } = this.state;
    const toolbarButtons = [
      { name: "Top Rate", method: this.sortRateHandle },
      { name: "Top Members", method: this.sortMembersHandle },
      { name: "Newly Create", method: this.sortCreatedHandle },
      { name: "Reset filter", method: this.resetFiltersHandle }
    ];
    let categories = null;
    if (eventsDB) {
      categories = eventsDB
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
    const eventsPage = isLoading ? (
      <Spinner className="rooms-page" />
    ) : (
      <div className="rooms-page">
        <Toolbar
          datafromBase={this.state.eventsDB}
          buttons={toolbarButtons}
          filters={toolbarFilters}
          sortHandle={this.sortHandle}
          changeHandle={this.changeHandle}
          category={this.state.category}
          showDate={true}
          changeDate={this.changeDate}
        />
        <Grid container spacing={8} justify="center" className="rooms-page-cards">
          {eventsDB.map(event => {
            return (
              <EventCard
                key={event.id}
                title={event.title}
                category={event.category.title}
                avatar={event.creator.avatar}
                description={event.description}
                limit={event.members_limit}
                rating={event.rating}
                members={event.members}
                background={event.cover}
                clicked={() => this.selectedRoomHandler(event.id)}
              />
            );
          })} 
        </Grid>
      </div>
    );
    return eventsPage;
  }
}

export default Events;
