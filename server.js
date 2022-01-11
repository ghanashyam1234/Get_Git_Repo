const path = require('path');
const express = require('express');
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 5000;

// routes
const search = require('./routes/search');


// add middlewares
const root = require('path').join(__dirname, 'client','build' );
app.use(express.static(root));

app.use(cors());
app.use(express.json());
app.use('/search', search);

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client','build', 'index.html'));
});

const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
