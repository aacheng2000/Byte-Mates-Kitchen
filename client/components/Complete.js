import React, {Component, Fragment} from 'react'
import { Link } from "react-router-dom";

export default class Complete extends Component {
    render(){
        return(
            <div className='historyCartStyle'>
                <h2>
                    Order complete!
                </h2>
                <h2>
                    We hope our service was as delicious as your business!
                </h2>
                <Link to='/products'><button className='cartBtn'>
                    Continue Shopping
                </button></Link>
                <img src="http://localhost:8080/robo.gif"/>
            </div>
        )
    }
}
