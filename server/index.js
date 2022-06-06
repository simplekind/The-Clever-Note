require('dotenv').config();

getTime = () =>{
    return Date.now();
}

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const mongoose = require("mongoose");
const CleverNote = require('./app/model')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(port,()=>{
    console.log('listening on port '+ port);
})

app.post('/api/note',async (req,res)  =>{
    try{
        var currentTime = Date.now();
        var newNote = new CleverNote({
            title: 'Untitled',
            desc : '',
            createdAt: currentTime,
            updatedAt: currentTime,
            archive: 0
        });
        const resp = await newNote.save();
        const id = resp._id;
        newNote['_id']=id;
        await res.status(200).send(newNote);
    }catch(err){
        res.status(400).send(err.message);
    }
})

app.get('/api/notes/:type', async(req,res)=>{
    try{
        var query ={
            archive: 0
        };
        if(req.params.type == 'trash'){
            query.archive =1;
        }
        const data= await CleverNote.find(query).sort({ createdAt: -1 });
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err.message);    
    }
})

app.put('/api/note/:id',async(req, res)=>{
    try{
        await CleverNote.updateOne({ _id: req.params.id },
            req.body
        )
        const note = await CleverNote.findOne({ _id: req.params.id });
        await res.status(200).send(note);
    }catch(err){
        res.status(400).send(err.message);    
    }
}
)

app.delete('/api/note/:id',async (req,res) =>{
    try{
        await CleverNote.findByIdAndDelete(req.params.id);
        await res.status(200).send(req.params.id);
    }catch(err){
        res.status(400).send(err.message);    
    }
});