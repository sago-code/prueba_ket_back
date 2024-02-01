const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
    const secretKey = 'token_acceso';
    const accessToken = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    
    return accessToken;
}

module.exports =  generateAccessToken;