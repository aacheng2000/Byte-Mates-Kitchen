import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {myOrders} from '../store'
/**
 * COMPONENT
 */
class Cart extends Component {
    constructor(props){
      super(props)
      this.state = { orders: [] };
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
      if(this.props.cart[0]){
      const curCart = (this.props.cart.filter((_cart) =>
          _cart.isPending === true
          ))[0].id
        this.props.loadOrderData(curCart)
      }
    }
    

    render(){
        console.log('My carts component props~~~', this.props)
        const {username} = this.props
        const allOrders = this.props.orders
        return (
            <div>
                <h3>Welcome to your cart, {username}</h3>
                <h3>Contents of your cart:</h3>
                <div style = {this.cartStyle}>
                    {allOrders[0] ? allOrders.map((order) => {
                        return(
                          <div key={order.id} style = {this.itemsStyle}>
                            <img src = {order.product.picture} />
                            <div>
                              <div>{order.product.name}</div>
                              <div>${order.product.price}</div>
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
    username: state.auth.username,
    cart: state.cart,
    orders: state.order
  }
}
const mapDispatch = dispatch => {
    return {
      loadOrderData(cartId) {
        dispatch(myOrders(cartId))
      }
    }
  }

export default connect(mapState, mapDispatch)(Cart)
