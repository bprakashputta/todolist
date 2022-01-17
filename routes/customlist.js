const express = require('express')
const todo = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {request, response} = require("express");
const {Item, itemSchema} = require('../models/item');


todo.get('/:listname', async (request, response)=>{
    // return response.send(request.params.listname);
    // let items = [''];
    let items = await Item.find({listName: _.lowerCase(request.params.listname)}).catch((err)=>{console.log(err.message)});
    return response.render('list', {kindOfDay: _.capitalize(request.params.listname), newItems: items});
});

todo.post('/:listname', async (request, response) => {

    let item = new Item({
        itemName: request.body.itemName,
        listName: _.lowerCase(request.params.listname)
    });
    await item.save();
    console.log(item);
    return response.redirect("/"+_.lowerCase(request.params.listname));
});

todo.post('/:listname/delete', async (request, response) => {
    console.log(request.body.checkbox);
    let item = await Item.deleteOne({_id: request.body.checkbox}).catch((err)=>{console.log(err.message)});
    console.log(item);
    return response.redirect('/'+_.lowerCase(request.params.listname));
});


module.exports = todo;