import React, { Component } from "react";
import axios from "axios";

import Toolbar from "./../Toollbar/Toolbar";

import { Grid } from "@material-ui/core";
import EventCard from "./EventCard/EventCard";
import Spinner from "./../UI/Spinner/Spinner";

const API = {
  getEvents: "/api/event",
  sort: "/api/event/sort",
  filter: "/api/event/filter",
  resetFilters: "/api/event/reset-filters"
};

class Events extends Component {
  state = {
    eventsDB: null,
    FilteredEvents: null,
    isLoading: true,
    category: "",
    location: "",
    date: null,
    showDate: true
  };
  componentDidMount() {
    this.getDataFromDB(API.getEvents);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category, date, location } = this.state;
    if (prevState.category !== category || prevState.date !== date || prevState.date !== date) {
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
      .then(res => {
        this.setState({ eventsDB: res.data, isLoading: false });
      })
      .catch(err => console.log(err));
  };

  filterHandle = () => {
    const filters = {
      category: this.state.category,
      date: this.state.date,
      location: this.state.location,
    };
    filters
      ? this.postDataFromDB(API.filter, filters)
      : this.getDataFromDB(API.getRooms);
  };

  sortMembersHandle = () => {
    const type = {
      params: {
        sort: "members"
      }
    };
    this.getDataFromDB(API.sort, type);
  };
  sortStartSoonHandle = () => {
    const type = {
      params: {
        sort: "start"
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
    this.props.history.push({ pathname: "/event/" + id });
  };

  render() {
    {console.log('events==>', this.state.eventsDB)}
    const { eventsDB, isLoading } = this.state;
    const toolbarButtons = [
      { name: "Top Members", method: this.sortMembersHandle },
      { name: "Start Soon", method: this.sortStartSoonHandle },
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
    let location = null;
    if (eventsDB) {
      location = eventsDB
        .map(e => {
          return e.location;
        })
        .filter((v, i, a) => a.indexOf(v) === i);
    }
    const toolbarFilters = [
      {
        type: "category",
        itemsArray: categories,
        value: this.state.category,
        labelWidth: 75
      },
      {
        type: "location",
        itemsArray: location,
        value: this.state.location,
        labelWidth: 75
      }
    ];
    const eventsPage = isLoading ? (
      <Spinner className="events-page" />
    ) : (
      <div className="events-page">
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
        <Grid container spacing={16} justify="center" className="events-page-cards">
          {eventsDB.map(event => {
            return (
              <EventCard
                key={event.id}
                title={event.title}
                category={event.category.title}
                location={event.location}
                startDate={event.start_date}
                avatar={event.creator.avatar}
                description={event.description}
                limit={event.members_limit}
                // rating={event.rating}
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
