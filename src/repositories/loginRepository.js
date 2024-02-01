const { getConnection } = require('typeorm');

async function loginRepository(userName, password) {
    const connection = getConnection();
    const result = await connection.query(`
        CALL login(?, ?);
    `, [userName, password]);
    return result;
}

async function createAccessToken(userId, accessToken) {
    try {
        const connection = getConnection();
        await connection.query(`
            CALL create_access_token(?, ?);
        `, [userId, accessToken]);
    } catch (error) {
        console.error('Error storing access token:', error);
        throw new Error('Failed to store access token');
    }
}

module.exports = {
    loginRepository,
    createAccessToken
};
