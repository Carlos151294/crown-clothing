const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const PROD_MODE = 'production';

if (process.env.NODE_ENV !== PROD_MODE) require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === PROD_MODE) {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port', port)
});

app.post('/payment', (req, res) => {
    const { token, amount } = req.body;
    const { id } = token;

    const body = {
        source: id,
        amount,
        currency: 'mxn'
    };

    stripe.charges.create(body, (error, success) => {
        if (error) {
            return res.status(500).send({ error });
        } 
        res.status(200).send({ success })
    });
});