import React, { Component } from 'react';
import {updateQuantity, myOrders} from '../store'
import {connect} from 'react-redux'

class QuantityCounter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 0
        }
    }

    componentDidMount(){
        this.setState({quantity: this.props.quantity})
    }

    componentDidUpdate(prevProps){
        if(prevProps.quantity !== this.props.quantity){
            this.setState({quantity: this.props.quantity})
        }
    }

    handleChange = (event) => {
        this.setState({
            quantity: event.target.value
        })
    } 

    handleQuantity = async(event) => {
        event.preventDefault()
        await this.props.changeQuantity(this.props.orderId, this.state.quantity)
        alert('Quantity updated!')
        await this.props.loadOrderData(this.props.username)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleQuantity}>
                    <label>Quantity: </label>
                    <input 
                    type='number' 
                    style= {{ flex: '10', padding: '5px' }}
                    placeholder={`${this.state.quantity}`}
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    min='1'
                    />
                    <input 
                        type='submit' 
                        value= 'Submit'
                        className= 'btn'
                        style={{flex: '1'}}
                        />
                </form> 
            </div>
        )
    }
}

  const mapDispatch = dispatch => {
      return {
        changeQuantity(orderId, num) {
        dispatch(updateQuantity(orderId, num))
        },
        loadOrderData(cartId) {
            dispatch(myOrders(cartId))
          }
    }
}
  
  export default connect(null, mapDispatch)(QuantityCounter)