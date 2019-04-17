import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  Button,
  Fab,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {CalendarToday, Close} from "@material-ui/icons";
import Calendar from "react-calendar";

//TODO create for mobile
class Toolbar extends Component {
  state = {
    isToggleOn: false,
    date: new Date()
  };

  calendarToggleHandle = () => {
    this.setState({ isToggleOn: !this.state.isToggleOn });
  };

  onChange = date => {
    console.log("date", date);
    this.setState({ date, isToggleOn: false });
    this.props.changeDate(date);
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({isToggleOn: false});
    }
  };

  render() {
    const { filters } = this.props;
    let filter = null;
    if (filters) {
      filter = this.props.filters.map(e => {
        return (
          <FormControl
            key={e.type}
            variant="outlined"
            className="toolbar-filter-formControl"
          >
            <InputLabel className="toolbar-filter-inputLabel" htmlFor={e.type}>
              {e.type}
            </InputLabel>
            <Select
              className="toolbar-filter-select"
              labelWidth={e.labelWidth}
              value={e.value}
              onChange={this.props.changeHandle}
              input={
                <OutlinedInput
                  className="toolbar-filter-outlinedinput"
                  name="category"
                  id={e.type}
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {e.itemsArray.map(e => {
                return (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      });
    }

    const date =
      this.props.showDate && !this.state.isToggleOn ? (
        <CalendarToday cursor="pointer" onClick={this.calendarToggleHandle} />
      ) : null;

    const calendar = this.state.isToggleOn ? (
      <Grid className="toolbar-filter-calendar">
        <Close
          cursor="pointer"
          className="toolbar-filter-calendar-close"
          onClick={this.calendarToggleHandle}  
        />
        <Calendar
          name="date"
          onChange={this.onChange}
          value={this.props.date}
        />
      </Grid>
      
    ) : null;

    return (
      <div ref={this.setWrapperRef}>
        <Grid container justify="space-evenly" className="toolbar">
          <Grid item xs={12} sm={9} md={6} className="toolbar-sort">
            <Link to="/add-room">
              <Fab size="small" aria-label="Add">
                <AddIcon />
              </Fab>
            </Link>
            {this.props.buttons.map(e => {
              return (
                <Button key={e.name} variant="outlined" onClick={e.method}>
                  {e.name}
                </Button>
              );
            })}
          </Grid>
          <Grid item xs={12} sm={3} md={6} className="toolbar-filter">
            {filter}
            <div className="toolbar-filter-date">
              {date}
            </div>
            {calendar}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Toolbar;
