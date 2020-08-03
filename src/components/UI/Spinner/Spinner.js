import React from "react";

import classes from './Spinner.module.css';
import LoadingGIF from "../../../assets/images/loading.gif";

const spinner = (props) => (
  <div className={classes.Spinner}>
    <img src={LoadingGIF} alt="Loading" />
  </div>
);

export default spinner;
