const mongoose = require('mongoose');

const congeSchema = new mongoose.Schema({
  description: {
    type: String,
   },
  dateDebut: {
    type: Date,
   },
  dateFin: {
    type: Date,
   },
  duree: {
    type: Number,
   },
  etatConge: {
    type: String,
    },
    natureconge: {
    type: String,
   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
   },
  delivered: {
    type: Boolean,
    default: false
  },
  read: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
   },
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

const Conge = mongoose.model('Conge', congeSchema);
module.exports = Conge;
