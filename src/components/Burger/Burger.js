import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  let mainIngredient = Object.keys(props.ingredients).map((ingredient) => {
    return [...Array(props.ingredients[ingredient])].map((ingre, idx) => {
      return <BurgerIngredient key={ingredient + idx} type={ingredient} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {mainIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
