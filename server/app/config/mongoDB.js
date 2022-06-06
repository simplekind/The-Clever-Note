var MONGO_DB = require('mongodb');
const MongoClient = MONGO_DB.MongoClient;
const url = process.env.MONGO_URL;

try {
    var M_CONNECT = MongoClient.connect(url, {
        useUnifiedTopology: true
    });
    module.exports = { MONGO_DB, M_CONNECT };
} catch (err) {
    console.log(err);
}
// const mongoose = require('mongoose');

// var M_CONNECT = mongoose.connect(url,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// }).then(() => {
//     module.exports = { MONGO_DB, M_CONNECT };
//     console.log("DB connected");
// })
// .catch((err) => console.log(`DB connection Err`, err));