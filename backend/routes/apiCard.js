const express = require('express');
const axios = require('axios');
const router = express.Router();

const POKEMON_API_URL = 'https://api.pokemontcg.io/v2/cards'; // URL base de la API

// Endpoint para obtener cartas desde la API externa
router.get('/cards', async (req, res) => {
  try {
    // Validar parámetros
    const validParams = ['name', 'supertype', 'subtype', 'types', 'page', 'pageSize'];
    const query = {};
    for (const key in req.query) {
      if (validParams.includes(key)) {
        query[key] = req.query[key];
      }
    }

    // Configurar encabezados
    const headers = {};
    if (process.env.POKEMON_API_KEY) {
      headers['X-Api-Key'] = process.env.POKEMON_API_KEY;
    }

    // Consumir API externa
    const response = await axios.get(POKEMON_API_URL, { params: query, headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener cartas:', error.message);
    res.status(500).json({
      error: 'No se pudieron obtener las cartas',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;
