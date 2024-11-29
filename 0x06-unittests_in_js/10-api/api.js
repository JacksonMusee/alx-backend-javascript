const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the payment system');
});

app.get('/cart/:id', (req, res) => {
  const { id } = req.params;
  // Check if the id is a valid number
  if (!/^\d+$/.test(id)) {
    return res.status(404).send('Not Found');
  }
  // If valid, return a response with cart id
  res.status(200).send(`Payment methods for cart ${id}`);
});

// New endpoint to return available payment methods
app.get('/available_payments', (req, res) => {
  res.status(200).json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

// New endpoint to handle login with a username
app.post('/login', (req, res) => {
  const { userName } = req.body;
  if (userName) {
    res.status(200).send(`Welcome ${userName}`);
  } else {
    res.status(400).send('Username is required');
  }
});

app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});
