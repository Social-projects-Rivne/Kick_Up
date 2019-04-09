/* eslint func-names: 0, no-console: 0 */
import React from "react";
import ReactDOM from "react-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class App extends React.Component {
  state = {
    current: 1
  };
  onChange = page => {
    this.setState({
      current: page
    });
  };
  render() {
    return (
      <Pagination
        onChange={this.onChange}
        current={this.state.current}
        total={50}
      />
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
