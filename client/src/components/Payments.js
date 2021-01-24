import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends React.Component {

    render() {
        return (
            <StripeCheckout 
                amount={500}
                name="Emaily"
                description="Buy 5 credits for 5€"
                currency="EUR"
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_PUB_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments)