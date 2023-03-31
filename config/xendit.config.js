const Xendit = require('xendit-node');
const dotenv = require('dotenv');

dotenv.config();

const x = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY
});

module.exports = x;