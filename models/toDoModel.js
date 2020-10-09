const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: String,
    subTask: String,
    status: String,
    created_at: String,
    updated_at: String
});

module.exports = mongoose.model('toDoList' , toDoSchema);