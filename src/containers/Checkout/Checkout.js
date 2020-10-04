import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (const params of queryParams.entries()) {
      ingredients[params[0]] = +params[1];
    }
    this.setState({
      ingredients: ingredients
    });
  }

  onCheckoutContinued = () => {
    this.props.history.push("/user-data");
  };

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Fragment>
        <CheckoutSummary
          checkoutContinued={this.onCheckoutContinued}
          checkoutCancelled={this.onCheckoutCancelled}
          ingredients={this.state.ingredients}
        />
      </Fragment>
    );
  }
}

export default withRouter(Checkout);
