import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        try {
            axios.fetch("/order.json").then(res => {

            }).catch(err => {

            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let orders = this.state.orders.map(order => {
            return <Order ingredients={order.ingredients} totalPrice={order.totalPrice} />
        })
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;