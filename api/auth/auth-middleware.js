const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config/secrets');

const HttpError = require('../helpers/http-error');

// ==============================================

const restricted = (req, res, next) => {
  // the server expects to find the token in the request header Authorization
  const token = req.headers.authorization; // req.headers.authorization is set even though Authorization:abcdef is sent as header when making request.

  if (token) {
    // async verify (with old-school node async callback style)
    // -callback is used to handle success or failure
    jwt.verify(token, TOKEN_SECRET, (err, decoded_token) => {
      if (err) {
        // next({ status: 401, message: `token bad: ${err.message}` });
        next(new HttpError('Invalid JWT!', 401));
      } else {
        // -Token is valid => move along!
        req.decoded_token = decoded_token;
        next();
      }
    });
  } else {
    // next({ status: 401, message: 'Token required!' });
    next(new HttpError('JWT required!', 401));
  }
};

// ==============================================

const admin_only = (req, res, next) => {
  console.log('req.decoded_token: ', req.decoded_token);
  if (req.decoded_token.role === 'admin') {
    next();
  } else {
    next(new HttpError('Admin role required!', 401));
  }
};

// ==============================================

const checkAuthPayload = (req, res, next) => {
  const { username, password } = req.body;
  const valid = Boolean(username && password && typeof password === 'string');

  if (valid) {
    next();
  } else {
    next({
      status: 422,
      message:
        'Please provide username and password and the password shoud be alphanumeric',
    });
  }
};

// ==============================================

module.exports = { checkAuthPayload, restricted, admin_only };
