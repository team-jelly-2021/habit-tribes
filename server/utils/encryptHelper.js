const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const initVector = crypto.randomBytes(16);
const key = process.env.CRYPTO_KEY;

const encryptHelper = {};

encryptHelper.encryptString = (targetString) => {

  const cipher = crypto.createCipheriv(algorithm, key, initVector);
  let encrypted = cipher.update(targetString, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};


encryptHelper.decryptString = (targetString) => {
  const decipher = crypto.createDecipheriv(algorithm, key, initVector);

  let decrypted = decipher.update(targetString, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
};


module.exports = encryptHelper;