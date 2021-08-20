import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class PastCart extends Component {
    constructor(props) {
      super(props);
      this.state = {
          orders: []
      }
    }

    async componentDidMount() {
        const {data} = await axios.get(`/api/orders/${this.props.cartId}`)
        this.setState({orders: data})
    }

    render() {
        const date = (this.props.updated).slice(0,10)
        const total = this.state.orders.reduce((acc, cur) => {
            return acc + cur.quantity * (cur.product.price * 1)
        }, 0)
        return(
            <div>
                <div className='dateHeader'>
                    <h3 >Order placed: {date}</h3>
                    <h3>Total: ${total.toLocaleString("en-US")}</h3>
                </div>
                {this.state.orders.map((order) => {
                    return(
                        <div key={order.id} className="pastCartStyle">
                            <div>
                                <img src={order.product.picture} />
                            </div>
                            <div className="cartItemDetails">
                                <div>
                                    <Link to={`/products/singleproduct/${order.product.id}`}>
                                        {order.product.name}
                                    </Link>
                                </div>
                                <div>${order.product.price}</div>
                                <div>Quantity: {order.quantity}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}