const { getConnection } = require('typeorm');

async function LoginRepository(username) {
    const user = await getConnection().query('CALL login(?)', [username]);
    
    return user && user[0] ? user[0] : null;
}

async function TokenRepository(userId, accessToken) {
    await getConnection().query('CALL createAccessToken(?, ?)', [userId, accessToken]);
}


module.exports = {
    LoginRepository,
    TokenRepository
};
