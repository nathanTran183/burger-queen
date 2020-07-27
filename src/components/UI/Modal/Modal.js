import React from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <Aux>
    <Backdrop showed={props.showed} clicked={props.modelClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.showed ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.showed ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;
