import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  let ingredients = [];
  for (const ingre in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingre)) {
      const quantity = props.ingredients[ingre];
      ingredients.push({
        name: ingre,
        quantity: quantity,
      });
    }
  }
  ingredients = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        {ingredient.name} ({ingredient.quantity})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price:{" "}
        <strong>AUD {Number.parseFloat(props.totalPrice).toFixed(2)}$</strong>
      </p>
    </div>
  );
};

export default order;
