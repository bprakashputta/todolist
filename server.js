const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {request, response} = require("express");
const {Item, itemSchema} = require('./models/item');
const todo = express();
const PORT = process.env.PORT || 3000;

// mongoose.connect("mongodb://localhost:27017/todoList")
//     .then(()=>{
//         console.log("Connect to MongoDB Database");
//     })
//     .catch((err)=>{
//         console.log("Something went wrong!!!");
//     })

mongoose.connect("mongodb+srv://bprakashputta:EpsTnXaxQ4zXjKJ@personal-projects.yfifv.mongodb.net/todolist?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connect to MongoDB Database");
    })
    .catch((err)=>{
        console.log("Something went wrong!!!");
    })


todo.set('view engine', 'ejs');
todo.use(bodyParser.urlencoded({extended: true}));
todo.use(express.static('public'));
todo.use(express.json());

const customlist = require('./routes/customlist');
// let items = Item
//     .find({});
// console.log(items);



todo.get('/', async (request, response)=>{
    // // let today = new Date();
    // // // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // // let day = today.toLocaleString('en-us',{weekday: "long"});
    // // // return response.send("Helo Bhanu");
    // // console.log(day);
    // // let items = Ite
    // // let item1 = new Item({itemName: "Get Food"})
    // // let item2 = new Item({itemName: "Brush Teeth"})
    // // let item3 = new Item({itemName: "Take Bath"});
    // // let foundItems = Item.find();
    // // if(foundItems.le)
    // // let items = await Item.insertMany([item1, item2, item3]);
    // //
    // let items = ["Get Food", "Bathing","Brush Teeth", "Take Tablets"];
    // // let items = await Item
    // //     .find()
    // //     .select('itemName').catch((err)=>{console.log(err.message)});
    //
    // if(items.length === 0) {
    //     for (let item of items) {
    //         let newItem = new Item({
    //             itemName: item
    //         });
    //         await newItem.save();
    //     }
    // }else{
    //     for (let item of items) {
    //         // console.log(item);
    //         let findItem = await Item.find({itemName: item}).select('itemName').catch((err)=>{console.log(err.message)});
    //         // console.log(findItem);
    //         // return response.redirect('/');
    //         if(findItem.length===0||(findItem.length!==0 && item !== findItem[0].itemName)){
    //             let newItem = new Item({
    //                 itemName: item
    //             });
    //             console.log("Inserted");
    //             await newItem.save();
    //         }else{
    //             console.log("Already Exists");
    //             // console.log("Hi");
    //         }
    //     }
    // }
    //
    // // await items.save();
    // // console.log(items)
    let items = await Item.find({});
    // console.log(items);
    return response.render('index', {kindOfDay: "Today", newItems: items});
});

todo.post('/', async (request, response) => {

    let item = new Item({
        itemName: request.body.itemName,
        listName: "Today"
    });
    await item.save();
    console.log(item);
    return response.redirect("/");
});

todo.post('/delete', async (request, response) => {
    console.log(request.body.checkbox);
    // console.log("hi");
    // return response.send("hi");
    let item = await Item.deleteOne({_id: request.body.checkbox}).catch((err)=>{console.log(err.message)});
    console.log(item);
    return response.redirect('/');
});

todo.get('/about', (request, response)=>{
    return response.render('about');
});

todo.use('/', customlist);

todo.listen(PORT, (err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("Server is listening on PORT", PORT);
})