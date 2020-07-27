import React from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  bacon: 1.2,
  meat: 1.3,
  cheese: 0.7,
  salad: 0.5,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      bacon: 2,
      meat: 1,
      cheese: 0,
      salad: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    let oldQuantity = this.state.ingredients[type];
    let updatedQuantity = oldQuantity + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedQuantity;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
  };

  removeIngredientHandler = (type) => {
    let oldQuantity = this.state.ingredients[type];
    if (oldQuantity > 0) {
      let updatedQuantity = oldQuantity - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedQuantity;
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - INGREDIENT_PRICES[type];

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
      });
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
