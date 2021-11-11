// -invoke .config method on object returned.
// -We want the resulting side effects of this!
// -It injects the env-vars into our app.
require('dotenv').config();
const path = require('path');

const express = require('express');
const server = express();

// ==============================================
// Register Middleware:

server.use(express.json()); // parse request body as JSON

// -Redirect to HTTPS version on Heroku when user
//  enters URL as:
//  x.com
// -Works without this if user explicity enters:
//  https://www.x.com
// -Heroku article explaining how to
//  "use https for all requests":
//  https://help.heroku.com/J2R1S4T8/can-heroku-force-an-application-to-use-ssl-tls
if (server.get('env') === 'production') {
  const enforce = require('express-sslify');
  server.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// -Root route serves the React app:
//  (react router routes also need
//   the catch-all endpoint!!!)
// server.use(express.static(path.join(__dirname, '..', 'client', 'build')));
server.use(express.static(path.join(__dirname, '..', 'client', 'out')));

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  console.log('In DEV mode');

  // on Heroku machine, an env variable is called "NODE_ENV" -> "production" or "development"
  const cors = require('cors');
  server.use(cors());
} // else {
// server.use(require('helmet')());
// -It is possible for middlewars to
//  modify conflicting headers.
// -Whichever middleware that
//  comes last wins!
// }

// ==============================================

// -Routers:
const authRouter = require('./auth/auth-router');
server.use('/api/auth', authRouter);

const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter);

const productsRouter = require('./products/products-router');
server.use('/api/products', productsRouter);

const checkoutRouter = require('./checkout/checkout-router');
server.use('/api/checkout', checkoutRouter);

// ==============================================

// -Catch-all that just sends back index.html.
// -This is to allow React Routing to work!
// -The root route (/) serving index.html
//  at the React Routing root route
//  works without the catch-all endpoint below.
server.get('*', (req, res) => {
  // res.send('<h1>success</h1>');
  // res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
  res.sendFile(path.join(__dirname, '..', 'client/out', 'index.html'));
});

// ==============================================

module.exports = server;
