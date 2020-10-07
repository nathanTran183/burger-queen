import React, { Component } from "react";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  submitOrder = async () => {
    try {
      this.setState({ loading: true });
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice.toFixed(2),
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
      //   this.props.setDefaultState();
      this.props.history.push("/");
    } catch (error) {
      this.setState({ loading: false });
      //   this.props.purchaseCancelHandler();
    }
  };

  render() {
    let form = (
      <div>
        <Input inputtype="input" type="text" placeholder="Your name" name="name" />
        <Input inputtype="input" type="text" placeholder="Your email" name="email" />
        <Input inputtype="input" type="text" placeholder="Your street address" name="street" />
        <Input inputtype="input" type="text" placeholder="Your postal code" name="postalCode" />
        <Button cssClass="Success" clicked={this.submitOrder}>
          ORDER
        </Button>
      </div>
    );
    if (this.state.loading === true) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact data</h3>
        <hr />
        {form}
      </div>
    );
  }
}

export default ContactData;
