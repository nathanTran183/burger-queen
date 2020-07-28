import React, { Component } from "react";

import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class layout extends Component {
  state = {
    sideDrawerFlag: false,
  };

  toggleBackDropHandler = () => {
    this.setState({
      sideDrawerFlag: !this.state.sideDrawerFlag,
    });
  };

  render() {
    return (
      <Aux>
        <SideDrawer
          clicked={this.toggleBackDropHandler}
          showed={this.state.sideDrawerFlag}
        />
        <Toolbar clicked={this.toggleBackDropHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default layout;
