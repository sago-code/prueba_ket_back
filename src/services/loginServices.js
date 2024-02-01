const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRepository = require('../repositories/loginRepository');

async function loginServices(userName, password) {
    try {
        const user = await loginRepository.loginRepository(userName, password);

        if (!user || !user.id) {
            throw new Error('User not found');
        }

        const accessToken = generateAccessToken(user.id, user.userName);
        await storeAccessToken(user.id, accessToken);

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
    try {
        await loginRepository.createAccessToken(userId, accessToken); // Asegúrate de tener esta función implementada en el repositorio
    } catch (error) {
        console.error('Error storing access token:', error);
        throw new Error('Failed to store access token');
    }
}

module.exports = {
    loginServices
};
