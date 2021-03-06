import React from 'react';
import {Elements} from 'react-stripe-elements';

import stripeTestKeys from '../stripeTestKeys';
import { StripeProvider } from 'react-stripe-elements';

import InjectedDonationForm from './DonationForm';

class ScoopDonation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stripe: null,
            activated: false
        };
    }
    componentDidMount() {
        if (window.Stripe) {
            console.log('#stripe-js present on load');
            this.setState({stripe: window.Stripe(process.env.STRIPE_PUBLIC_LIVE), activated: true});
        } else {
            if (document.querySelector('#stripe-js') !== null) {
                document.querySelector('#stripe-js').addEventListener('load', () => {
                    // Create Stripe instance once Stripe.js loads
                    console.log('#stripe-js present, load event callback');
                    this.setState({stripe: window.Stripe(process.env.STRIPE_PUBLIC_LIVE), activated: true});
                });
            } else {
                console.log('No #stripe-js');
                this.setState({activated: false});
            }
        }
    }
    render () {
        return (
            <StripeProvider stripe={this.state.stripe}>
                <Elements>
                    <InjectedDonationForm activated={this.state.activated} />
                </Elements>
            </StripeProvider>
        )
    }
}

export default ScoopDonation;
