const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],  // Referencias a cartas
  deck: [{ type: Schema.Types.ObjectId, ref: 'Card' }]  // Cartas en el mazo
});

// Encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar la contraseña ingresada con la encriptada
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
