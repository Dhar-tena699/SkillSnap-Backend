const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    userModel.createUser(name, email, hashedPassword, (err) => {
      if (err) return res.status(400).json({ message: 'User already exists or invalid input' });

      res.status(201).json({ message: 'User created successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid email or password' });

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) return res.status(401).json({ message: 'Invalid email or password' });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    });
  });
};
