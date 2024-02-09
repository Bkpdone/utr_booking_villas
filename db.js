const mongoose = require('mongoose');

const urldb=`mongodb://127.0.0.1:27017/demo-v2`;
const cloudURI='mongodb+srv://GandN:GandN07@cluster0.t0xpfpc.mongodb.net/'

const connectDb = async() =>{

    
    try{
        await mongoose.connect(cloudURI);
        console.log('Hi Connected Db SuccessFully...');
    }
    catch(err){
        console.log('Error in connect Db x x x ',err);
    }
};

module.exports = connectDb;