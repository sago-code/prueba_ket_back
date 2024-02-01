const loginServices = require('../services/loginServices')

async function loginController(req, res) {
    const { userName, password } = req.body;

    try {
        const { success, accessToken, message } = await loginServices.loginServices(userName, password);

        if (success) {
            res.status(200).json({ success: true, accessToken });
        } else {
            res.status(400).json({ success: false, message });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    loginController
};