import React, { memo, Fragment } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <Fragment>
    <Backdrop showed={props.showed} clicked={props.modelClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.showed ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.showed ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </Fragment>
);

const areEqual = (prevProps, nextProps) => {
  return (
    nextProps.showed === prevProps.showed &&
    nextProps.children === prevProps.children
  );
};

export default memo(modal, areEqual);
