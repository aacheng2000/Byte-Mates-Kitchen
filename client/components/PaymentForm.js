import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import Complete from './Complete'
import { connect } from "react-redux";
import { myCart, placeOrder } from "../store";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#87BBFD',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    },
  };

function PaymentForm(props) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const placeOrder = async () => {
        const cart = props.orders[0].cart.id
        const username = props.state.auth.username
        await props.placeOrderThunk(cart, username)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post('/api/stripe/payment', {
                amount: 1000,
                id
            })

            if (response.data.success) {
                placeOrder()
                console.log('Successful payment')
                setSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log(error.message)
    }
    }
    console.log('stripes props~~~', props)
    return (
        <>
            <div className='stripe-box'>
            {!success?
            <form onSubmit = {handleSubmit}>
                <fieldset className='FormGroup'>
                    <div className = 'FormRow'>
                        <CardElement options = {CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <button className='stripe-button'>Pay</button>
            </form>
            :
            <div>
                <Complete/>
            </div>
            }
            </div>
        </>
    )
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
    placeOrderThunk(cartId, username) {
        dispatch(placeOrder(cartId, username))
    }
}
}

export default connect(mapState, mapDispatch)(PaymentForm)