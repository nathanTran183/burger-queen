import React from "react";

import classes from "./Backdrop.module.css";

const backdrop = (props) =>
  props.showed ? <div onClick={props.clicked} className={classes.Backdrop}></div> : null;

export default backdrop;
