import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {myCart} from '../store'
/**
 * COMPONENT
 */
class Cart extends Component {
    componentDidMount() {
        this.props.loadInitialData(this.props.username)
      }
    render(){
        const {username} = this.props
        console.log('My carts component props~~~', this.props)
        return (
            <div>
                <h3>Welcome to your cart, {username}</h3>
                <h3>Here is what is in your cart:</h3>
                <div>
                    {this.props.cart[0] ? this.props.cart[0].orders.map((order) => {
                        return(
                            <div key={order.productId}>Product id: {order.productId}</div>
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
    cart: state.cart
  }
}
const mapDispatch = dispatch => {
    return {
      loadInitialData(username) {
        dispatch(myCart(username))
      }
    }
  }

export default connect(mapState, mapDispatch)(Cart)
