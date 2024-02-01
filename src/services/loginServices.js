
const { LoginRepository, TokenRepository } = require('../repositories/loginRepository');
const generateAccessToken = require('../utils/tokenUtil');
const bcrypt = require('bcrypt');

async function LoginServices(username, password) {
    try {
        const user = await LoginRepository(username);
        console.log('Usuario obtenido de la base de datos:', user);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const userPassword = user.map(u => u.password)[0];
        console.log('Contraseña del usuario obtenida:', userPassword);

        console.log('Contraseña ingresada por el usuario:', password);

        const passwordMatch = await bcrypt.compare(password, userPassword);

        if (!passwordMatch) {
            throw new Error('Contraseña incorrecta');
        }

        const userId = user.map(u => u.id)[0];
        console.log('ID del usuario:', userId);

        const accessToken = generateAccessToken(userId);
        await TokenRepository(userId, accessToken);
        return accessToken;
    } catch (error) {
        throw new Error('Error en el inicio de sesión: ' + error.message);
    }
}

module.exports = LoginServices;