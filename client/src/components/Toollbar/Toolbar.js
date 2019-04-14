import React, { Component } from "react";
import ReactDOM from "react-dom";
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
import AddIcon from "@material-ui/icons/Add";

//TODO create for mobile
class Toolbar extends Component {
  state = {
    datafromBase: null,
    labelWidth: 0,
    date: null
  };
  componentDidMount() {
    this.getDate();
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      datafromBase:this.props.datafromBase,
    });
  }

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
    this.setState({ [event.target.name]: event.target.value });
    const dataListByDate = [...this.state.datafromBase].filter(e => {
      return this.formatDate(new Date(e.created_at)) === event.target.value;
    });
    this.setState({ datafromBase: dataListByDate });
    console.log("roomListByDate", dataListByDate);
  };

  render() {
    const { datafromBase } = this.state;

    let categories = null;
    let cities = null;
    if (datafromBase) {
      categories = datafromBase.map(e => {
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
      cities = datafromBase.map(e => {
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
    }
    return (
      <Grid container justify="space-evenly" className="toolbar">
        <div className="toolbar-sort">
          <Link to="/add-room">
            <Fab size="small" aria-label="Add">
              <AddIcon />
            </Fab>
          </Link>
          <Button variant="outlined" onClick={this.props.sortRateHandle}>
            {this.props.buttons[0]}
          </Button>
          <Button variant="outlined" onClick={this.props.sortMembersHandle}>
            {this.props.buttons[1]}
          </Button>
          <Button variant="outlined" onClick={this.props.sortCreatedHandle}>
            {this.props.buttons[2]}
          </Button>
        </div>
        <div className="toolbar-filter">
          <Button variant="outlined" onClick={this.props.resetFiltersHandle}>
            {this.props.buttons[3]}
          </Button>
          <FormControl
            variant="outlined"
            className="toolbar-filter-formControl"
          >
            <InputLabel
              className="toolbar-filter-inputLabel"
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-category-simple"
            >
              Category
            </InputLabel>
            <Select
              className="toolbar-filter-select"
              labelWidth={this.state.labelWidth}
              value={this.props.category}
              onChange={this.props.changeHandle}
              input={
                <OutlinedInput
                  className="toolbar-filter-outlinedinput"
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
          <FormControl
            variant="outlined"
            className="toolbar-filter-formControl"
          >
            <InputLabel
              className="toolbar-filter-inputLabel"
              // ref={ref => {
              //   this.InputLabelRef = ref;
              // }}
              htmlFor="outlined-city-simple"
            >
              City
            </InputLabel>
            <Select
              className="toolbar-filter-select"
              labelWidth={this.state.labelWidth}
              value={this.props.city}
              onChange={this.props.changeHandle}
              input={
                <OutlinedInput
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
          <div className="toolbar-filter-date">
            <TextField
              variant="outlined"
              id="date"
              label="date"
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.changeDateHandle}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </div>
      </Grid>
    );
  }
}

export default Toolbar;
