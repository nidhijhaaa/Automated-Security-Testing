// app.js - A simple vulnerable app for testing
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve a simple home page
app.get('/', (req, res) => {
  res.send(`
    <h1>Simple Test App</h1>
    <p>This is a test application for DAST scanning.</p>
    <form action="/data" method="POST">
      <label for="input">Enter some text:</label>
      <input type="text" id="input" name="userInput">
      <button type="submit">Submit</button>
    </form>
  `);
});

// A route that echoes user input - a classic XSS test case
app.post('/data', (req, res) => {
  const userData = req.body.userInput;
  // WARNING: This is intentionally vulnerable for demonstration.
  // It reflects user input without sanitization.
  res.send(`<p>You entered: ${userData}</p>`);
});

// Start the server
app.listen(port, () => {
  console.log(`Test app listening on http://localhost:${port}`);
});
