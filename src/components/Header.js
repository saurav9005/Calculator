import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export default (props) => {
  return (
    <Menu isOpen={false}>
      <Link className="menu-item" to="/">
        Calculator
      </Link>

      <Link className="menu-item" to="/TemperatureCalc">
        Temperature
      </Link>
    </Menu>
  );
};
