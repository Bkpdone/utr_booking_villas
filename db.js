const mongoose = require('mongoose');

const urldb=`mongodb://127.0.0.1:27017/demo-v1`;


const connectDb = async() =>{

    
    try{
        await mongoose.connect(urldb);
        console.log('Hi Connected Db SuccessFully...');
    }
    catch(err){
        console.log('Error in connect Db x x x ',err);
    }
};

module.exports = connectDb;