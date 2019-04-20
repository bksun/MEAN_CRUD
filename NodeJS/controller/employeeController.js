var express = require('express');
var router = express.Router();

var { Employee }  = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Eo=rror in retreiving Employee ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }

    Employee.findById((req.params.id), (err, doc) => {
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

    var emp = new Employee({
        name: req.body.name,
        Position: req.body.Position,
        salary: req.body.salary,
        office: req.body.office,
    });

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
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

    Employee.findByIdAndRemove((req.params.id), (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in retrieing value'+ JSON.stringify(err, undefined, 2));
        }
    });
});


router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        Position: req.body.Position,
        salary: req.body.salary,
        office: req.body.office,
    });

    emp.save((err, data) => {
    if(!err){
        console.log(res.send(data));
    }
    else{
        console.log('Error in save ' + JSON.stringify(err, undefined, 2));
    }
    });
});

module.exports = router;