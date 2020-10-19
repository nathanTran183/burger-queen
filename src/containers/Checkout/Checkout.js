import React, { Component, Fragment } from "react";
import { withRouter, Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
    totalPrice: 0,
  };

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const params of queryParams.entries()) {
      if (params[0] === "price") {
        price = +params[1];
      } else {
        ingredients[params[0]] = +params[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
    });
  }

  onCheckoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
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
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (
            <ContactData
              totalPrice={this.state.totalPrice}
              ingredients={this.state.ingredients}
              {...props}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(Checkout);
