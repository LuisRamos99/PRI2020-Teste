var express = require('express');
var router = express.Router();

var Casamento = require('../controllers/casamento')


router.get('/api/casamentos', function(req, res) {
  if(req.query.nome != null) {
    Casamento.listaQueryNome(req.query.nome)
      .then(data => res.status(200).jsonp({casamentos: data}))
      .catch(err => res.status(500).jsonp({erro: err}))}
  else if(req.query.ano != null) {
    Casamento.listaQueryAno(req.query.ano)
      .then(data => res.status(200).jsonp({casamentos: data}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  else if(req.query.byAno != null) {
    Casamento.listaQueryByAno(req.query.byAno)
      .then(data => res.status(200).jsonp({casamentos: data}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  else Casamento.lista()
    .then(data => res.status(200).jsonp({casamentos: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
});



router.get('/api/casamentos/noivos', function(req,res) {
  Casamento.listaTitulos()
    .then(data => {
      var noivos = []
      data.forEach(i => {
        var nome = i.title.split(":")[1]
        nome = nome.split("c.c")[0]
        if(!noivos.includes(nome)) noivos.push(nome)
        })
      res.status(200).jsonp({noivos: noivos.sort()})
    })
    .catch(err => res.status(500).jsonp({erro: err}))
})








router.get('/api/casamentos/:id', function(req,res) {
  Casamento.lookUp(req.params.id)
    .then(data => res.status(200).jsonp({casamento: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
})







module.exports = router;
