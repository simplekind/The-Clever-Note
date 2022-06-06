const { query } = require('express');
const { getTime } = require('./helper');
const {setNote,fetchAllNotes,updateNote,deleteNote} = require('./model')

exports.createNote = async (req,res)  =>{
    try{
        var currentTime = Date.now();
        var newNote ={
            title: 'Untitled',
            desc : '',
            createdAt: currentTime,
            updatedAt: currentTime,
            archive: 0
        };
        var id = await setNote(newNote);
        newNote['_id']= id;
        res.status(200).send(newNote);
    }catch(err){
        res.status(400).send(err.message);
    }
}

exports.getAllNotes = async(req,res)=>{
    try{
        var query ={
            archive: 0
        };
        if(req.params.type == 'trash'){
            query.archive =1;
        }
        var data= await fetchAllNotes(query);
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err.message);    
    }
}

exports.updateNoteById = async(req, res)=>{
    try{
        var currentTime = getTime();
        var query = {
            title:res.title,
            desc:res.desc,
            updatedAt: currentTime
        };
        await updateNote(req.params.id,query);
        res.status(200).send(query);
    }catch(err){
        res.status(400).send(err.message);    
    }
}

exports.deleteNote = async (req,res) =>{
    try{
        await deleteNote(req.params.id);
        res.status(200).send(id);
    }catch(err){
        res.status(400).send(err.message);    
    }
}