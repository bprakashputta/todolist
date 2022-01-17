const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    listName: {
        type: String
    }
});

const Item = mongoose.model('Item', itemSchema);


module.exports.Item = Item;
module.exports.itemSchema = itemSchema;