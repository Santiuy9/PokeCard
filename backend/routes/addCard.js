const express = require('express');
const Card = require('../models/Card');  // Modelo de carta
const router = express.Router();

// Endpoint para agregar una nueva carta
router.post('/add', async (req, res) => {
  try {
    const newCard = new Card(req.body);  // Crear una nueva carta con los datos del body de la solicitud
    await newCard.save();  // Guardar la carta en la base de datos
    res.status(201).json({ message: 'Carta agregada exitosamente', card: newCard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Hubo un problema al agregar la carta' });
  }
});

module.exports = router;