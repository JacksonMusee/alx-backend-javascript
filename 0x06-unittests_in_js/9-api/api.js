const express = require('express');
const app = express();

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

app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});
