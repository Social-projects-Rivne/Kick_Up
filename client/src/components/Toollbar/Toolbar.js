import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Grid,
  Button,
  Fab,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {CalendarToday, Cancel, KeyboardArrowDownRounded, FilterList} from "@material-ui/icons";
import Calendar from "react-calendar";
import Drawer from '@material-ui/core/Drawer';
import moment from 'moment';

class Toolbar extends Component {
  state = {
    isToggleOn: false,
    mobileToolbarIsOpen: false
  };

  calendarToggleHandle = () => {
    this.setState({ isToggleOn: !this.state.isToggleOn });
  };

  onChange = date => {
    this.setState({ isToggleOn: false });
    const parseDate = moment(date).format();
    this.props.changeDate(parseDate);
  };

  toggleFiltersHandler = () => {
    this.setState({mobileToolbarIsOpen: !this.state.mobileToolbarIsOpen})
  }

  toggleDrawer = () => {
    this.setState({mobileToolbarIsOpen: false})
  }

  render() {
    const { filters, buttons, addLink, isAuthenticated } = this.props;

    let ToolbarButtons = null;
    if (buttons) {
      ToolbarButtons = (
        <>
          {isAuthenticated && (<Grid item>
            <Link to={addLink}>
              <Fab size="small" aria-label="Add" className="toolbar-add">
                <AddIcon />
              </Fab>
            </Link>
          </Grid>)}
          {this.props.buttons.map(e => {
            return (
              <Grid item key={e.name}>
                <Button variant="outlined" onClick={e.method} className="toolbar-sort">
                  {e.name}
                </Button>
              </Grid>
            )})
          }
        </>
      )
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
                    name={e.type}
                    id={e.type}
                  />
                }
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {e.itemsArray !== null && e.itemsArray.map(e => {
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
    
    const today = this.props.date ? this.props.date : moment().format();
    const calendar = this.state.isToggleOn ? (
      <Grid className="toolbar-filter-calendar">
        <Cancel
          cursor="pointer"
          className="toolbar-filter-calendar-close"
          onClick={this.calendarToggleHandle}  
        />
        <Calendar
          name="date"
          onChange={this.onChange}
          value={new Date(today)}
          />
      </Grid>
      
    ) : null;

    return (
      <>
        <Grid container justify="center" alignItems="center" spacing={8} className="toolbar toolbar-desktop">
            {ToolbarButtons}
            {ToolbarFilters}
            <Grid item>
              {date}
              {calendar}
            </Grid>
        </Grid>
        <FilterList 
          onClick={this.toggleFiltersHandler} 
          fontSize="large"
          className="mobile-button" 
        />
        <Drawer
          anchor="bottom"
          open={this.state.mobileToolbarIsOpen}
          onClose={this.toggleDrawer}
        >
          <IconButton onClick={this.toggleDrawer} className="mobile-button-close-filters">
            <KeyboardArrowDownRounded/>
          </IconButton>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleDrawer}
          >
            <Grid container justify="center" alignItems="center" spacing={8} className="toolbar toolbar-mobile">
              {ToolbarButtons}
              {ToolbarFilters}
              <Grid item>
                {date}
                {calendar}
              </Grid>
            </Grid>
          </div>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Toolbar);
