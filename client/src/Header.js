import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Switch, Route } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <Link
          to={{
            pathname: `/`
          }}
          className="btn btn-primary"
        >
          Home
        </Link>
        <Link
          to={{
            pathname: `/artists`
          }}
          className="btn btn-primary"
        >
          Artists
        </Link>
      </header>
    );
  }
}

export default Header;
