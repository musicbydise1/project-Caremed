const Client = require('../models/tutorial');
const User = require('../models/userModel');
const CustomError = require('../models/CustomError');

exports.createClient = async (req, res, next) => {
  if (!req.body) {
    return next(new CustomError('Body cannot be empty', 400));
  }
  try {
    const client = await Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      age: req.body.age,
      address: req.body.address,
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      diagnosis: req.body.diagnosis,
      creator: req.uid,
    });

    const user = await User.findById(req.uid);

    if (user) {
      const clients = [...user.clients, client.id];
      await user.updateOne({ clients });

      return res.status(201).send({ success: true, client });
    }
  } catch (err) {
    console.log(err);
    next(new CustomError('Something went wrong', 500));
  }
};

exports.findAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find();

    return res.status(200).send({ success: true, clients });
  } catch (err) {
    console.log(err);
    next(new CustomError('Something went wrong', 500));
  }
};

exports.findOneClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return next(new CustomError('Client not found', 404));
    }
    res.send({ success: true, client });
  } catch (err) {
    next(new CustomError('Something went wrong', 500));
  }
};

exports.updateClient = async (req, res, next) => {
    const editClient = await Client.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    );

    if (!editClient) {
      return next(new CustomError('Client not found', 404));
    }

    return res.status(200).send({ success: true, client: editClient });
}

exports.deleteClient = async (req, res, next) => {  // Измененное название функции
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return next(new CustomError('Client not found', 404));
    }

    if (client.creator != req.uid) {
      return next(new CustomError('Unauthorized access to delete route', 400));
    }

    await Client.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.uid);

    if (user) {
      let clients = user.clients.filter(clientId => clientId != req.params.id);
      await user.updateOne({ clients });
    }

    return res.send({ success: true, client });
  } catch (err) {
    next(new CustomError('Something went wrong', 500));
  }
};
