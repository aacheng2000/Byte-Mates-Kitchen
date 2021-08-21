import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {myCart, myOrders, placeOrder, fetchSingleUser} from '../store'
import { Link } from "react-router-dom";
import StripeContainer from './StripeContainer';

class Checkout extends Component {
    constructor(props){
      super(props)
    }
    async componentDidMount() {
        const myName =  this.props.match.params.id
        await this.props.loadOrderData(myName)
    }

    placeOrder = async () => {
        const cart = this.props.orders[0].cart.id
        const username = this.props.match.params.id
        await this.props.placeOrderThunk(cart, username)
    }
    

    render(){
        const allOrders = this.props.orders
        const address = this.props.state.auth.address
        return (
            <div>
                <div className='cartBar'>
                    <div>
                        <h2>Checkout</h2>
                        <h3>Review your address:</h3>
                        <h3>{ address }
                            <span>
                                <Link to={`/users/edit/address/${this.props.state.auth.id}`}>
                                    <button className='edit-btn'>Edit</button>
                                </Link>
                            </span>
                        </h3>
                    </div>

                </div>   
                <div className='stripeBox'>
                    <div>
                        <h2>Order total: ({allOrders[0] ? allOrders.length:'0' } items): $ 
                        {
                        allOrders.reduce((acc, cur) => {
                            return acc + (cur.product.price * 1) * cur.quantity
                        }, 0).toLocaleString('en-US')
                        }</h2>
                    </div>
                    <StripeContainer/>
                </div>
                
                <div><h2>Review Your Order</h2></div>
                <div className="cartStyle">
                    {allOrders[0] ? (
                    allOrders.map((order) => {
                    return (
                        <div key={order.id} className="cartItemStyle">
                            <div> <img src={order.product.picture} /> </div>
                            <div className="cartItemDetails">
                                <div>{order.product.name}</div>
                                <div>${order.product.price}</div>
                                <div>Quantity: {order.quantity}</div>
                            </div>
                        </div>
                                    );
                                })
                            ) : (
                        <div>Your cart is empty</div>
                    )}
                </div>
            </div>
            )
        }
    }
    const mapState = state => {
        return {
          state,
          cart: state.cart,
          orders: state.order,
          user: state.user
        }
      }
    const mapDispatch = dispatch => {
    return {
        loadCartData(username) {
            dispatch(myCart(username))
        },
        loadOrderData(username) {
        dispatch(myOrders(username))
        },
        placeOrderThunk(cartId, username) {
            dispatch(placeOrder(cartId, username))
        },
        loadUserData: (username) => {
            dispatch(fetchSingleUser(username))
        }
    }
    }
      export default connect(mapState, mapDispatch)(Checkout)