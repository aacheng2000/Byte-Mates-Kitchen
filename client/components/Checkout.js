import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {myCart, myOrders, placeOrder} from '../store'
import { Link } from "react-router-dom";

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
        const username = this.props.match.params.id
        const allOrders = this.props.orders
        console.log('checkout props!', this.props)
        return (
            <div>
                <div className='cartBar'>
                    <div>
                        <h2>Checkout</h2>
                    </div>
                    <div>
                        <div>
                            Order total: ({allOrders[0] ? allOrders.length:'0' } items): $ 
                            {
                            allOrders.reduce((acc, cur) => {
                                return acc + (cur.product.price * 1) * cur.quantity
                            }, 0).toLocaleString('en-US')
                            }
                        </div>
                            <button onClick={this.placeOrder} className='cartBtn'>
                                <Link to='/complete'>
                                    Place your order
                                </Link>
                            </button>
                    </div>
                </div>
            </div>
            )
        }
    }
    const mapState = state => {
        return {
          state,
          cart: state.cart,
          orders: state.order
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
        }
    }
    }
      export default connect(mapState, mapDispatch)(Checkout)