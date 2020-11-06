import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const stripePrice = price * 100;
    const publishableKey = 'pk_test_BLf8cfYo2r8PUcp1AEON1dO600aTvgtRJG';

    const onToken = async token => {
        try {
            const response = await axios({
                url: 'payment',
                method: 'POST',
                data: {
                    amount: stripePrice,
                    token
                }
            });
            console.log(response);
            alert('Payment Successful');
        } catch (error) {
            console.log(error);
            alert('There was an issue with your payment. Please use the provided credit card.');
        }
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Crown Clothing CF'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={stripePrice}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;