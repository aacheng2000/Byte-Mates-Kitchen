import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {myCart, myOrders, deleteOrder} from '../store'
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */
class Cart extends Component {
    constructor(props){
      super(props)
      this.cartStyle = {
        display: 'flex',
        flexDirection: 'column',
        borderStyle: 'solid',
        padding: '10px'
      }
      this.itemsStyle = {
        display: 'flex',
        padding: '10px',
        justifyContent: 'space-around'
      }
    }
    componentDidMount() {
        const myName =  this.props.match.params.id
        this.props.loadOrderData(myName)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.orders.length !== this.props.orders.length){
        const myName =  this.props.match.params.id
        this.props.loadOrderData(myName)
      }
    }
    
    deleteFunc(orderId) {
      this.props.deleteOrderThunk(orderId)
    }

    render(){
        console.log('My carts component props~~~', this.props)
        const username = this.props.match.params.id
        const allOrders = this.props.orders
        return (
            <div>
                <h3>Welcome to your cart, {username}</h3>
                <h3>Contents of your cart:{allOrders.length}</h3>
                
                <div style = {this.cartStyle}>
                    {allOrders[0] ? allOrders.map((order) => {
                        return(
                          <div key={order.id} style = {this.itemsStyle}>
                            <img src = {order.product.picture} />
                            <div>
                              <div><Link to={`/products/${order.product.id}`}>{order.product.name}</Link></div>
                              <div>${order.product.price}</div>
                              <button onClick={() => this.deleteFunc(order.id)}>
                                Delete
                                </button>
                            </div>
                          </div>
                        )
                    }):       
                    <div>Your cart is empty</div>
                    }
                </div>
            </div>
        )  
    }

}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart,
    orders: state.order
  }
}
const mapDispatch = dispatch => {
    return {
      loadCartData(username) {
      dispatch(myCart(username))
      },
      loadOrderData(cartId) {
        dispatch(myOrders(cartId))
      },
      deleteOrderThunk(orderId) {
        dispatch(deleteOrder(orderId))
      }
    }
  }

export default connect(mapState, mapDispatch)(Cart)
