import React, {Component, Fragment} from 'react'
import { Link } from "react-router-dom";

export default class Complete extends Component {
    render(){
        console.log('im here!!!!')
        return(
            <div>
                <h2>
                    Your Order is complete!
                </h2>
                <Link to='/products'><button>
                    Continue Shopping
                </button></Link>
            </div>
        )
    }
}
