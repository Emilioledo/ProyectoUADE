const mongoose = require ('mongoose');

const url = "mongodb+srv://grupo8:2LUvYAiILuwKKZr3@cluster0.suhi8.mongodb.net/grupo8?retryWrites=true&w=majority";
const connectdb = () => {
    mongoose.connect(url, 
        {useNewUrlParser: true, useUnifiedTopology: true}).then (()=> {
            console.log ("Base de datos conectada");
        }).catch ( (error) => {
            console.log (error);
        });
    }

module.exports = connectdb;




