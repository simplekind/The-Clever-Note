const {MONGO_DB,M_CONNECT} = require('./config/mongoDB');

exports.setNote= async (req) =>{
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);
    res = await collection.insertOne(req);
    return res.insertedId;
}

exports.fetchAllNotes= async (req) =>{
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);
    res = await collection.find(query).sort({createdAt:-1}).toArray();
    return res;
}

exports.updateNote = async (id,payload) =>{
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);
    
    await collection.updateOne(
        {'_id':MONGO_DB.ObjectID(id)},
        {$set : payload}
    );
    
    return true;
}

exports.deleteNote = async (id,payload) =>{
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);
    
    const res = await collection.deleteOne(
        {'_id':MONGO_DB.ObjectID(id)}
    );
    
    if(!(res.result.n == 1)){
        throw new Error ('Something went wrong');
    }

    return res.n;
}