import React from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  bacon: 1.2,
  meat: 1.3,
  cheese: 0.7,
  salad: 0.5,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/ingredients");
      this.setState({ ingredients: response.data });
    } catch (error) {
      this.setState({error: true})
    }
  }

  setDefaultState = () => {
    this.setState({
      ingredients: {
        bacon: 0,
        meat: 0,
        cheese: 0,
        salad: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
    });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({
      purchasable: sum === 0 ? false : true,
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = async () => {
    try {
      this.setState({ loading: true });
      const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice.toFixed(2),
        customer: {
          name: "Nathan",
          address: {
            street: "13 Randall Street",
            zipCode: "6029",
          },
          email: "taylorhoran94@gmail.com",
        },
        deliveryMethod: "fastest",
      };
      await axios.post("/orders.json", order);
      this.setDefaultState();
    } catch (error) {
      this.setState({ loading: false });
      this.purchaseCancelHandler();
    }
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
    this.updatePurchaseState(updatedIngredients);
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
      this.updatePurchaseState(updatedIngredients);
    }
  };

  render() {
    let content = null;
    let burger = this.state.error ? <p>Cannot fetch ingredients</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      content = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );
    }
    if (this.state.loading) {
      content = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          showed={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {content}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
