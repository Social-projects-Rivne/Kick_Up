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
import Drawer from '@material-ui/core/Drawer';

//TODO create for mobile
class Toolbar extends Component {
  state = {
    isToggleOn: false,
    date: new Date(),
    mobileToolbarIsOpen: false
  };

  calendarToggleHandle = () => {
    this.setState({ isToggleOn: !this.state.isToggleOn });
  };

  onChange = date => {
    console.log("date", date);
    this.setState({ date, isToggleOn: false });
    this.props.changeDate(date);
  };

  toggleFiltersHandler = () => {
    this.setState({mobileToolbarIsOpen: !this.state.mobileToolbarIsOpen})
  }

  toggleDrawer = () => {
    this.setState({mobileToolbarIsOpen: false})
  }

  render() {
    const { filters, buttons } = this.props;

    let ToolbarButtons = null;
    if (buttons) {
      ToolbarButtons = this.props.buttons.map(e => {
        return (
          <Grid item key={e.name}>
            <Button variant="outlined" onClick={e.method}>
              {e.name}
            </Button>
          </Grid>
        );
      })
    }

    let ToolbarFilters = null;
    if (filters) {
      ToolbarFilters = this.props.filters.map(e => {
        return (
          <Grid item key={e.type}>
            <FormControl
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
          </Grid>  
        );
      });
    }

    const date =
      this.props.showDate && !this.state.isToggleOn ? (
        <CalendarToday 
          cursor="pointer" 
          onClick={this.calendarToggleHandle} 
          className="toolbar-filter-date"
          fontSize="large"
        />
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
      <Grid container justify="center">
        <Grid container justify="center" alignItems="center" spacing={8} className="toolbar">
            <Grid item>
              <Link to="/add-room">
                <Fab size="small" aria-label="Add">
                  <AddIcon />
                </Fab>
              </Link>
            </Grid>
            {ToolbarButtons}
            {ToolbarFilters}
            <Grid item>
              {date}
              {calendar}
            </Grid>
        </Grid>
        <Button onClick={this.ToggleFiltersHandler} className="mobile-button">filters</Button>
        <Drawer
          anchor="bottom"
          open={this.state.mobileToolbarIsOpen}
          onClose={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
          <Grid container justify="center" alignItems="center" spacing={8} className="toolbar">
            <Grid item>
              <Link to="/add-room">
                <Fab size="small" aria-label="Add">
                  <AddIcon />
                </Fab>
              </Link>
            </Grid>
            {ToolbarButtons}
            {ToolbarFilters}
            <Grid item>
              {date}
              {calendar}
            </Grid>
          </Grid>
          </div>
        </Drawer>
      </Grid>
    );
  }
}

export default Toolbar;
