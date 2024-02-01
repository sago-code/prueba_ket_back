const bcrypt = require('bcrypt');
const createUserRepository = require('../repositories/createUserRepository');

async function createUserService(name, lastName, userName, password, userTypeId) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await createUserRepository.createUserRepository(name, lastName, userName, hashedPassword, userTypeId);

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Failed to create user' };
    }
}

module.exports = {
    createUserService
};