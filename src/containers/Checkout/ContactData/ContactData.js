import React, { Component } from "react";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    inputForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street Address",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Postal Code",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
        },
        value: "",
      },
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
          name: this.state.orderForm.name.value,
          address: {
            street: this.state.orderForm.street.value,
            zipCode: this.state.orderForm.zipCode.value,
          },
          email: this.state.orderForm.email.value,
        },
        deliveryMethod: this.state.orderForm.deliveryMethod.value,
      };
      await axios.post("/orders.json", order);
      //   this.props.setDefaultState();
      this.props.history.push("/");
    } catch (error) {
      this.setState({ loading: false });
      //   this.props.purchaseCancelHandler();
    }
  };

  onChangeHandler = (event, element) => {
    let updatedInputForm = { ...this.state.inputForm };
    let updatedElement = {...updatedInputForm[element]}
    updatedElement.value = event.target.value;
    updatedInputForm[element] = updatedElement;
    this.setState({
      inputForm: updatedInputForm,
    });
  };

  render() {
    let form = (
      <div>
        {Object.keys(this.state.inputForm).map((element) => {
          return (
            <Input
              key={element}
              elementType={this.state.inputForm[element].elementType}
              elementConfig={this.state.inputForm[element].elementConfig}
              value={this.state.inputForm[element].value}
              changed={(event) => this.onChangeHandler(event, element)}
            />
          );
        })}
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
