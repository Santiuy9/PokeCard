const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Pokémon', 'Entrenador', 'Objeto', 'Estadio'], required: true },
  hp: { type: Number },  // Solo para Pokémon
  phase: { type: String, enum: ['Básico', 'Fase 1', 'Fase 2'] },  // Solo para Pokémon
  image: { type: String },  // URL de la imagen
  attacks: [{
    name: { type: String },
    damage: { type: Number },
    specialEffect: { type: String },
    energyRequired: { type: Number }
  }],  // Solo para Pokémon
  ability: { type: String },  // Solo para Pokémon
  retreatCost: { type: Number },  // Solo para Pokémon
  weakness: { type: String },  // Solo para Pokémon
  resistance: { type: String },  // Solo para Pokémon
  effect: { type: String }  // Solo para Entrenador, Objeto o Estadio
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;