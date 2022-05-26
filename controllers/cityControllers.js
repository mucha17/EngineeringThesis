const res = require('express/lib/response');
const { City } = require('../models/cityModel');
const ObjectID = require('mongoose').Types.ObjectId;

exports.all = (req, res) => {
    City.find((err,docs) => {
        if(!err) res.send(docs);
        else res.status(500).send(err);
    })
};

exports.single = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.send(400).send('Nie znaleziono miasta o identyfikatorze ' + req.params.id)
    City.findById(req.params.id, (err,docs) => {
        if(!err) res.status(200).send(docs);
        else res.status(500).send(err)
    })
}