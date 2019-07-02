import React, { Component } from "react";
import { connect } from "react-redux";

import Toolbar from "./../Toollbar/Toolbar";

import { Grid } from "@material-ui/core";
import EventCard from "./EventCard/EventCard";
import Spinner from "./../UI/Spinner/Spinner";
import { loadEvents, addEvents } from "./../../store/actions/events";

const API = {
  getEvents: "/api/event",
  sort: "/api/event/sort",
  filter: "/api/event/filter"
};

class Events extends Component {
  state = {
    eventsDB: null,
    FilteredEvents: null,
    category: "",
    location: "",
    date: null,
    showDate: true,
    params: null,
    url: API.getEvents
  };

  onScroll = () => {
    if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight - 150
      && this.props.eventsDB.length < this.props.eventCount) {
      let url = API.getEvents;
      if (this.state.url !== url) url = this.state.url;
      this.props.addEventsFromDB(
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
    if (this.props.eventsDB.length < 1) {
      this.props.getSortDataFromDB(
        API.getEvents,
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
    const { category, date, location } = this.state;
    if (prevState.category !== category || prevState.date !== date || prevState.date !== date || prevState.location !== location) {
      this.filterHandle();
    }
    if (prevProps.eventsDB.length !== this.props.eventsDB.length &&
      this.props.eventsDB.length === this.props.eventCount) {
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
        location: this.state.location,
      },
    };

    this.setState({ params: { category: this.state.category, date: this.state.date, location: this.state.location }, url: API.filter });
    this.props.getSortDataFromDB(API.filter, filters);
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
  sortStartSoonHandle = () => {
    const type = {
      params: {
        sort: "start",
        page: 1
      }
    };
    this.setState({ params: { sort: "start" }, url: API.sort });
    this.props.getSortDataFromDB(API.sort, type);
  };

  resetFiltersHandle = () => {
    this.props.getSortDataFromDB(
      API.getEvents,
      {
        params: {
          page: 1
        }
      }
    );
    this.setState({
      category: "",
      location: "",
      url: API.getEvents
    });
  };

  changeHandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeDate = date => {
    this.setState({ date });
  };

  selectedEventHandler = id => {
    this.props.history.push({ pathname: "/event/" + id });
  };

  render() {
    const { eventsDB, isLoading } = this.props;
    const toolbarButtons = [
      { name: "Top Members", method: this.sortMembersHandle },
      { name: "Start Soon", method: this.sortStartSoonHandle },
      { name: "Reset filter", method: this.resetFiltersHandle }
    ];
    let categories = null;
    if (eventsDB.length > 0) {
      categories = eventsDB
        .map(e => {
          return e.category.title;
        })
        .filter((v, i, a) => a.indexOf(v) === i);
    }
    let location = null;
    if (eventsDB.length > 0) {
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
        <div className="events-page" ref="iScroll">
          <Toolbar
            isAuthenticated={this.props.isAuthenticated}
            datafromBase={this.props.eventsDB}
            buttons={toolbarButtons}
            filters={toolbarFilters}
            sortHandle={this.sortHandle}
            changeHandle={this.changeHandle}
            category={this.state.category}
            date={this.state.date}
            showDate={true}
            changeDate={this.changeDate}
            addLink="/event/add"
          />
          <Grid container spacing={16} justify="center" className="events-page-cards">
            {eventsDB.length > 0 ? eventsDB.map(event => {
              const membersCount = event.members.length;
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
                  members={membersCount}
                  background={event.cover && event.cover.replace(/\\/g, '/')}
                  clicked={() => this.selectedEventHandler(event.id)}
                />
              );
            }) :
              <h3>Not found!</h3>}
          </Grid>
          {this.props.eventsDB.length < this.props.eventCount && <Spinner className="events-page" />}
        </div>
      );
    return eventsPage;
  }
}

const mapStateToProps = state => ({
  eventsDB: state.events.events,
  page: state.events.pageCount,
  eventCount: state.events.eventCount,
  isLoading: state.events.eventsLoading
});

const mapDispatchToProps = dispatch => ({
  getSortDataFromDB: (uri, filter) => dispatch(loadEvents(uri, filter)),
  addEventsFromDB: (uri, filter) => dispatch(addEvents(uri, filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
