// controllers/presenceController.js
const Presence = require('../model/presence');

const createPresence = async (req, res) => {
    const presence = new Presence(req.body);
    try {
      await presence.save();
       res.status(201).send(presence);
    } catch (error) {
      console.log("🚀 ~ createPresence ~ error:", error)
      res.status(400).send(error);
    }
  };
  
  const getPresences = async (req, res) => {
    try {
      const presences = await Presence.find().populate('user');
      res.status(200).send(presences);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const getPresenceById = async (req, res) => {
    try {
      const presence = await Presence.findById(req.params.id).populate('user');
      if (!presence) {
        return res.status(404).send();
      }
      res.status(200).send(presence);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const updatePresence = async (req, res) => {
  
    req.body.user = req.body.user._id
    console.log("🚀 ~ updatePresence ~  req.body:",  req.body)
    try {
      const presence = await Presence.findByIdAndUpdate(req.params.id,req.body).populate('user');
      if (!presence) {
        return res.status(404).send();
      }
  
       await presence.save();
       res.send(presence);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  const deletePresence = async (req, res) => {
    try {
      const presence = await Presence.findByIdAndDelete(req.params.id);
      if (!presence) {
        return res.status(404).send();
      }
      res.send(presence);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  module.exports = {
    createPresence,
    getPresences,
    getPresenceById,
    updatePresence,
    deletePresence
  };