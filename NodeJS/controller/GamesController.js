var express = require('express');
var router = express.Router();

var { Games }  = require('../models/Games');
var ObjectId = require('mongoose').Types.ObjectId;


function validateGame(data) {
    let errors = {};
    if (data.title === '') {
        errors.title = "Can't be empty";
    }
    if (data.cover === '') {
        errors.cover = "Can't be empty";
    }

    let isValid = Object.keys(errors).length === 0;
    return {errors, isValid};
}

router.get('/', (req, res) => {
    Games.find((err, docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Eo=rror in retreiving Games ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {

    const {errors, isValid} = validateGame(req.body);

    if (!isValid) {
        res.status(400).json({errors});
    }

    var games = new Games({
        title: req.body.title,
        cover: req.body.cover
    });

    games.save((err, data) => {
    if(!err){
        console.log(data);
        res.status(201).json({game: data});
    }
    else{
        res.status(500).json({ errors: {global: "something went wrong..."}});
    }
    });
});


router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }

    Games.findById((req.params.id), (err, doc) => {
        if(!err){
            res.send(doc);
        }   
        else{
            console.log('Error in retrieing value'+ JSON.stringify(err, undefined, 2));
        }
    });
}); 

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params,id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }

    var games = new Games({
        name: req.body.name,
        Position: req.body.Position,
        salary: req.body.salary,
        office: req.body.office,
    });

    Games.findByIdAndUpdate(req.params.id, { $set, games }, { new: true }, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in update value'+ JSON.stringify(err, undefined, 2));
        }
    });
});


router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }

    Games.findByIdAndRemove((req.params.id), (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in retrieing value'+ JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;