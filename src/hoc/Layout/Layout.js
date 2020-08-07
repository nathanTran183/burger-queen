import React, { Component, Fragment } from "react";

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
      <Fragment>
        <SideDrawer
          clicked={this.toggleBackDropHandler}
          showed={this.state.sideDrawerFlag}
        />
        <Toolbar clicked={this.toggleBackDropHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default layout;
