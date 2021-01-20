const mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    title:  String,
    date:  String,
    ref: String,
    Href: String
  });

module.exports = mongoose.model('batismo', batismoSchema)