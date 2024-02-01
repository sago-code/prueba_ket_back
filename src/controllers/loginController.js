const LoginServices = require('../services/loginServices');

async function loginController(req, res) {
    const { username, password } = req.body;
    try {
        const accessToken = await LoginServices(username, password);
        res.json({ message: 'inicio de sesion correctamente', accessToken, expireIn: '1h' });
    } catch (error) {
        console.log('reasd',error)
        res.status(401).json({ message: error.message });
    }
}

module.exports = { loginController };