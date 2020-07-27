import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <label>Total price: {props.totalPrice}</label>
      {Object.keys(props.ingredients).map((ingredient) => {
        return (
          <BuildControl
            key={ingredient}
            added={() => props.ingredientAdded(ingredient)}
            removed={() => props.ingredientRemoved(ingredient)}
            label={ingredient}
            disabled={props.ingredients[ingredient] === 0 ? true : false}
          />
        );
      })}
    </div>
  );
};

export default buildControls;
