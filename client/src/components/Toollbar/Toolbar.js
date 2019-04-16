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
  MenuItem,
  TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//TODO create for mobile
class Toolbar extends Component {
  
  render() {
    const { filters } = this.props;
    let filter = null;
    if (filters) {
      filter = this.props.filters.map(e => {
        return (
          <FormControl key={e.type}
            variant="outlined"
            className="toolbar-filter-formControl"
          >
            <InputLabel
              className="toolbar-filter-inputLabel"
              htmlFor={e.type}
            >
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
      })
    }

    const date = this.props.showDate ?
                  <div className="toolbar-filter-date">
                    <TextField
                      variant="outlined"
                      id="date"
                      label="date"
                      type="date"
                      name="date"
                      value={this.props.showDate}
                      onChange={this.props.changeDateHandle}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                </div> :
                null;

    return (
      <Grid container justify="center" className="toolbar">
        <Grid justify="space-around" className="toolbar-sort">
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
        <Grid className="toolbar-filter">
          {filter}
          {date}
        </Grid>
      </Grid>
    );
  }
}

export default Toolbar;
