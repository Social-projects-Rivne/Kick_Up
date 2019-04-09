import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import {
    Grid,
    Button,
    Fab,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    TextField
  } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit 
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing.unit,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 156,
    }
  });

class Toolbar extends Component {
    state = {
        roomsDB: null,
        FilteredRooms: null,
        city: "",
        category: "",
        labelWidth: 0,
        roomsDate: null
    }
    componentDidMount() {
        this.getDate();
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
          });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.category !== this.state.category) {
          const filterRoomsByCategory = [...this.state.FilteredRooms].filter(e => e.category === this.state.category);
          this.setState({FilteredRooms: filterRoomsByCategory});
        }
        if(prevState.city !== this.state.city) {
          const filterRoomsBycity = [...this.state.FilteredRooms].filter(e => e.city === this.state.city);
          this.setState({FilteredRooms: filterRoomsBycity});
        }
      }
      
      getDate = () => {
        const currentDate = new Date();
        const roomsDate = this.formatDate(currentDate);
        this.setState({roomsDate})
      }
    
      formatDate = (d) => {
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1;
        const curr_year = d.getFullYear();
        if (curr_month < 10) curr_month = "0" + curr_month;
        if (curr_date < 10) curr_date = "0" + curr_date;
        const date = curr_year + "-" + curr_month + "-" + curr_date;
        return date;
      }
    
      sortRateHandle = () => {
        const roomsAray = [...this.state.FilteredRooms];
        roomsAray.sort((a, b) => b.rating - a.rating);
        this.setState({ FilteredRooms: roomsAray });
      };
      sortMembersHandle = () => {
        const roomsAray = [...this.state.FilteredRooms];
        roomsAray.sort((a, b) => b.members - a.members);
        this.setState({ FilteredRooms: roomsAray });
      };
      sortCreatedHandle = () => {
        const roomsAray = [...this.state.FilteredRooms];
        roomsAray.sort((a, b) => a.created_at - b.created_at);
        this.setState({ FilteredRooms: roomsAray });
        console.log("roomsAray", roomsAray);
      };
      changeHandle = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      changeDateHandle = event => {
        this.setState({ [event.target.name]: event.target.value });
        const roomListByDate = [...this.state.roomsDB].filter(e => {
          return this.formatDate(new Date(e.created_at)) === event.target.value
        })
        this.setState({ FilteredRooms: roomListByDate });
        console.log('roomListByDate', roomListByDate)
      };
      resetFiltersHandle = () => {
        this.setState({FilteredRooms: this.state.roomsDB})
      }
render() {
    const { classes } = this.props;
    let categories = null;
    let cities = null;
    if (!isLoading) {
      categories = FilteredRooms
        .map(e => {
          return e.category;
        })
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(e => {
          return (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          );
        });
      console.log("categories", categories);
      cities = FilteredRooms
        .map(e => {
          return e.city;
        })
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(e => {
          return (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          );
        });
      console.log("cities", cities);
    return (
        <Grid container justify="space-evenly" className="rooms-toolbar">
          <Link to="/add-room">
            <Fab size="small" aria-label="Add">
              <AddIcon />
            </Fab>
          </Link>
          <Button variant="outlined" onClick={this.resetFiltersHandle}>
            Reset filters
          </Button>
          <Button variant="outlined" onClick={this.sortRateHandle}>
            Top Rate
          </Button>
          <Button variant="outlined" onClick={this.sortMembersHandle}>
            Top Members
          </Button>
          <Button variant="outlined" onClick={this.sortCreatedHandle}>
            Newly Created
          </Button>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-category-simple"
            >
              Category
            </InputLabel>
            <Select
              value={this.state.category}
              onChange={this.changeHandle}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="category"
                  id="outlined-category-simple"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              // ref={ref => {
              //   this.InputLabelRef = ref;
              // }}
              htmlFor="outlined-city-simple"
            >
              City
            </InputLabel>
            <Select
              className="rooms-toolbar-select-button"
              value={this.state.city}
              onChange={this.changeHandle}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="city"
                  id="outlined-city-simple"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cities}
            </Select>
          </FormControl>
          <form className={classes.container} noValidate>
            <TextField
              variant="outlined"
              id="date"
              label="date"
              type="date"
              name="roomsDate"
              value={this.state.roomsDate}
              className={classes.textField}
              onChange={this.changeDateHandle}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </Grid>
    )
} 
}

export default withStyles(styles)(Toolbar);
