import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {myOrders} from '../store'
/**
 * COMPONENT
 */
class Cart extends Component {
    componentDidMount() {
      const curCart = (this.props.cart.filter((_cart) =>
          _cart.statusId === 1
          ))[0].id
        this.props.loadOrderData(curCart)
      }

    render(){
        console.log('My carts component props~~~', this.props)
        const {username} = this.props
        const allOrders = this.props.orders
        return (
            <div>
                <h3>Welcome to your cart, {username}</h3>
                <h3>Here is what is in your cart:</h3>
                <div>
                    {allOrders[0] ? allOrders.map((order) => {
                        return(
                            <div key={order.id}>Product id: {order.id}</div>
                        )
                    }): ''}
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
