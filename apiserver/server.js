const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/nodeModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes

app.get('/', (req,res) => {

    res.send('hello node api')
})
app.post('/note', async(req, res) => {
    try{
        const note = await Note.create(req.body)
        res.status(200).json(note);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.get('/notes', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try{
        const notes = await Note.find({});
        res.status(200).json(notes)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
app.get('/note/:id', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try{
        const {id} = req.params;
        const note = await Note.findById(id);
        res.status(200).json(note)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
app.put('/note/:id', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try{
        const {id} = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body);
        const note2 = await Note.findById(id);
        if(!note){
            res.status(404).json({message: "Note with id: "+ id + " not found."})
        }
        res.status(200).json(note2)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
app.delete('/note/:id', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try{
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id);
        if(!note){
            res.status(404).json({message: "Note with id: "+ id + " not found."})
        }
        res.status(200).json({message: "Note succesfully deleted."})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
app.get('/blog', (req,res) => {

    res.send('hello blo')
})
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:X_Kid0252@notesapi.b2sxyk9.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => {
        console.log("running on port 3000")
    })
    console.log('connected to mongodb')
}).catch((error) => {
    console.log(error)
})
