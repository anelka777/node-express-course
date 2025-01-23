const jwt = require('jsonwebtoken');

// POST /api/v1/logon
const login = (req, res) => {
    const { name, password } = req.body;


    if (!name || !password) {
        return res.status(400).json({ message: 'Please enter name and password' });
    }


    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME || '24h',
    });

    res.status(200).json({ token });
};

// GET /api/v1/hello
const getHello = (req, res) => {
    res.status(200).json({ message: `Hello, ${req.user.name}!` });
};

module.exports = { login, getHello };

