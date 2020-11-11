import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Calculator/Main";
import TemperatureCalc from "./Temperature/TemperatureCalc";
import Header from "./Header";
import changeicon from "./changeicon.png";
import "./App.css";

const dark = "#2e398a";
const light = "#ffffff";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: dark };
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor() {
    const newColor = this.state.color === dark ? light : dark;
    this.setState({ color: newColor });
  }
  render() {
    return (
      <Router>
        <div>
          <div className="header-wrapper">
            <Header />
            <button
              type="button"
              onClick={this.changeColor}
              className="themecolor"
            >
              <img src={changeicon} alt="" />
            </button>
          </div>
          <div className="calculator" style={{ background: this.state.color }}>
            <Route exact path="/" component={Main} />
            <Route path="/TemperatureCalc" component={TemperatureCalc} />
          </div>
        </div>
      </Router>
    );
  }
}
