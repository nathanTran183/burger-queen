import React from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      bacon: 1,
      meat: 3,
      cheese: 0,
      salad: 1,
    },
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Control</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
