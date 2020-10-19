import React, { Component } from "react";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then((res) => {
        const orders = [];
        for (const orderId in res.data) {
          if (res.data.hasOwnProperty(orderId)) {
            orders.push({ ...res.data[orderId], id: orderId });
          }
        }
        this.setState({
          orders: orders,
        });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = this.state.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          totalPrice={order.price}
        />
      );
    });
    return <div>{orders}</div>;
  }
}

export default Orders;
