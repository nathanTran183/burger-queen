import React, { Fragment } from "react";

import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  return (
    <Fragment>
      <Backdrop clicked={props.clicked} showed={props.showed} />
      <div
        className={[
          classes.SideDrawer,
          props.showed ? classes.Open : classes.Close,
        ].join(" ")}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
