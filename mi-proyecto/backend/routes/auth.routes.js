const express = require('express');
const router = express.Router();

// Aquí iría la lógica de login y registro
router.post('/register', (req, res) => {
  res.send('Registro');
});

router.post('/login', (req, res) => {
  res.send('Login');
});

module.exports = router;

