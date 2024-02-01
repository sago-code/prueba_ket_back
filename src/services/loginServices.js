const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRepository = require('../repositories/loginRepository');

async function loginServices(userName, password) {
    try {
        const user = await loginRepository.loginRepository(userName, password);

        if (!user) {
            throw new Error('User not found');
        }

        const accessToken = generateAccessToken(user.userId, userName);
        await storeAccessToken(user.userId, accessToken);

        return { success: true, accessToken };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: 'Failed to log in' };
    }
}

function generateAccessToken(userId, userName) {
    return jwt.sign({ userId, userName }, 'your_secret_key', { expiresIn: '1h' });
}

async function storeAccessToken(userId, accessToken) {
    await loginRepository.createAccessToken(userId, accessToken);
}

module.exports = {
    loginServices
};
