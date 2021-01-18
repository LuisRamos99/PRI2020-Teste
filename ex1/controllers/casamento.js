var mongoose = require('mongoose')
var Casamento = require('../models/casamento')

module.exports.lista = () => {
    return Casamento.find()
        .select({ "date": 1, "title":1, "ref":1, "_id": 0})
        .exec()
}

module.exports.listaQueryNome = (nome) => {
    return Casamento.find({ title: {$regex : ".*"+nome+".*"} })
        .exec()
}

module.exports.listaQueryAno = (ano) => {
    return Casamento.find({ date : {$regex :  ano + "\/" + ano } })
        .exec()
}

module.exports.listaQueryByAno = (bool) => {
    if (bool==true) 
        return Casamento.find() 
           .aggregate({$group : date})
           .exec()
}

module.exports.listaTitulos= () => {
    return Casamento.find()
        .select({ "title":1, "_id":1})
        .exec()
}

module.exports.lookUp = id => {
    return Casamento.findOne({ _id: id })
           .exec()
}
