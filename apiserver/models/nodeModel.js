const mongoose = require('mongoose')
const noteScehma = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a note title"]
        },
        content: {
            type: String,
            required: [true, "Please enter a note content"]
        },
        author: {
            type: String,
            required: [true, "Please enter a note author"]
        },
    },
    {
        timestamps: true
    }

)

const Note = mongoose.model('Note', noteScehma);
module.exports = Note;