const { getConnection } = require('typeorm');

async function createUserRepository(name, lastName, userName, password, userTypeId) {
    const connection = getConnection();
    await connection.query('CALL create_user(?, ?, ?, ?, ?)', [name, lastName, userName, password, userTypeId]);
}

module.exports = {
    createUserRepository
};