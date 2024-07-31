const Conge = require('../model/conge');

const createConge = async (req, res) => {
    console.log("🚀 ~ createConge ~ req.body:", req.body)
    req.body.etatConge = "ENATTENTE"
  const conge = new Conge(req.body);
  try {
    await conge.save();
    res.status(201).send(conge);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getConges = async (req, res) => {
  try {
    const conges = await Conge.find().populate('user').populate('userTo');
    res.status(200).send(conges);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCongeById = async (req, res) => {
  try {
    const conge = await Conge.findById(req.params.id).populate('user').populate('userTo');
    if (!conge) {
      return res.status(404).send();
    }
    res.status(200).send(conge);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getCongesByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
      const conges = await Conge.find({ user: userId }).populate('user').populate('userTo');
      if (!conges) {
        return res.status(404).send();
      }
      res.status(200).send(conges);
    } catch (error) {
      res.status(500).send(error);
    }
  };
const updateConge = async (req, res) => {
  

  try {
    const conge = await Conge.findByIdAndUpdate(req.params.id,req.body);

     if (!conge) {
      return res.status(404).send();
    }

     await conge.save();
    res.send(conge);
  } catch (error) {
    res.status(400).send(error);
  }
};
const refuserConge = async (req, res) => {
 
    try {
        const conge = await Conge.findByIdAndUpdate(req.params.id,{etatConge:"REFUSE"});
        if (!conge) {
          return res.status(404).send();
        }
    
         await conge.save();
        res.send(conge);
      } catch (error) {
        res.status(400).send(error);
      }
};
const accepterConge = async (req, res) => {
 
  try {
    const conge = await Conge.findByIdAndUpdate(req.params.id,{etatConge:"CONFIRME"});
    if (!conge) {
      return res.status(404).send();
    }

     await conge.save();
    res.send(conge);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteConge = async (req, res) => {
  try {
    const conge = await Conge.findByIdAndDelete(req.params.id);
    if (!conge) {
      return res.status(404).send();
    }
    res.send(conge);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createConge,
  getConges,
  getCongeById,
  updateConge,
  deleteConge,
  accepterConge,
  refuserConge,
  getCongesByUserId
};
