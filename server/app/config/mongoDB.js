require("dotenv").config();
MONGO_DB = require('mongodb');
const mongoClient = MONGO_DB.MongoClient;
const url = process.env.MONGO_URL;
try{
    M_CONNECT = mongoClient.connect(url,{
        useUnifiedTopology: true
    });
    module.exports = {MONGO_DB,M_CONNECT} ;
}catch(err){
    console.log(err);
}