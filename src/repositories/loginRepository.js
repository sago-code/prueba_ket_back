const { getConnection } = require('typeorm');

async function loginRepository(userName, password) {
    const connection = getConnection();
    const result = await connection.query(`
        CALL login(?, ?, @userId);
    `, [userName, password]);
    
    // Obtener el resultado del procedimiento almacenado (el valor de @userId)
    const userIdResult = await connection.query(`SELECT @userId AS userId`);
    
    // Retornar el ID de usuario
    return userIdResult[0][0].userId;
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
