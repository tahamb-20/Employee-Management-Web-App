const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idutilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
         unique: true
    },
    nom: {
        type: String,
     },
    prenom: {
        type: String,
     },
    telephone: {
        type: String,
     },
    matricule: {
        type: String,
     },
    cin: {
        type: String,
     },
    adresse: {
        type: String,
     },
    image: {
        type: String
    },
    role: {
        type: String,
     },
    email: {
        type: String,
         unique: true
    },
    password: {
        type: String,
     },
    SalaryPerDay: {
        type: Number,
     }
})
const Users = mongoose.model('users', userSchema)
module.exports = Users;