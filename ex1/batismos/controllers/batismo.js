// Controlador para o modelo batismo

var batismo = require('../models/batismo')

// Devolve a lista de batismo
module.exports.listar = () => {
    return batismo
        .find({},{href:0})
        .sort('title')
        .exec()
}


module.exports.consultar = id => {
    return batismo
        .findOne({_id: id})
        .exec()
}

module.exports.batisados = () => {
    return batismo
        .find()
        .sort('title')
        .exec()
}

module.exports.ano = ano => {
    return batismo
        .find({date: {$regex: ano}})
        .sort('title')
        .exec()
}

