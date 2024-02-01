const userService = require('../services/usersService');

async function createUserController(req, res) {
    const { name, lastName, userName, password, userTypeId } = req.body;
    const result = await userService.createUserService(name, lastName, userName, password, userTypeId);
    if (result.success) {
        return res.status(201).json({ message: result.message });
    } else {
        return res.status(500).json({ message: result.message });
    }
}

module.exports = {
    createUserController
};