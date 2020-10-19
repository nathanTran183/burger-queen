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
        validation: {
          required: true,
          minLength: 6,
          maxLength: 20
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Postal Code",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
        touched: false
      },
    },
    validForm: false,
    loading: false,
  };

  submitOrder = async (event) => {
    try {
      event.preventDefault();
      this.setState({ loading: true });

      const formData = {};
      for (const element in this.state.inputForm) {
        const value = this.state.inputForm[element].value;
        formData[element] = value;
      }

      const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice.toFixed(2),
        userinfo: formData,
      };
      await axios.post("/orders.json", order);
      //   this.props.setDefaultState();
      this.props.history.push("/");
    } catch (error) {
      this.setState({ loading: false });
      //   this.props.purchaseCancelHandler();
    }
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = "" !== value.trim() && isValid;
    }

    if(!!rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(!!rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid
  };

  onChangeHandler = (event, element) => {
    let updatedInputForm = { ...this.state.inputForm };
    let updatedElement = { ...updatedInputForm[element] };
    updatedElement.value = event.target.value;
    updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;
    updatedInputForm[element] = updatedElement;

    let formValid = true;
    for (const element in updatedInputForm) {
      if (updatedInputForm.hasOwnProperty(element)) {
        const valid = updatedInputForm[element].valid;
        formValid = valid && formValid;
      }
    }

    this.setState({
      inputForm: updatedInputForm,
      validForm: formValid
    });
  };

  render() {
    let form = (
      <form onSubmit={this.submitOrder}>
        {Object.keys(this.state.inputForm).map((element) => {
          return (
            <Input
              key={element}
              elementType={this.state.inputForm[element].elementType}
              elementConfig={this.state.inputForm[element].elementConfig}
              value={this.state.inputForm[element].value}
              changed={(event) => this.onChangeHandler(event, element)}
              invalid={!this.state.inputForm[element].valid}
              shouldValidate={this.state.inputForm[element].validation}
              touched={this.state.inputForm[element].touched}
            />
          );
        })}
        <Button cssClass="Success" disabled={!this.state.validForm}>ORDER</Button>
      </form>
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
