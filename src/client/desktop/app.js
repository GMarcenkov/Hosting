import React from "react";
import ReactDOM from "react-dom";
import "@babel/polyfill";
import "./common/style/common.styl";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Routes from "./routes";

window.ASSET_CDN = window.PUBLIC_SERVER_CONFIG.RESOURCE_HOST;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
