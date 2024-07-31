// models/Presence.js
const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
  heureArrivee: {
    type: String,
   },
  heureSortie: {
    type: String,
   },
  jour: {
    type: Date,
   },
  etatpresence: {
    type: String,
   },
  naturepresence: {
    type: String,
   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
   }
});

const Presence = mongoose.model('Presence', presenceSchema);
module.exports = Presence;
