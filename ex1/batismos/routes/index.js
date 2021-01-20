var express = require('express');
var router = express.Router();

const batismo = require('../controllers/batismo')


router.get('/batismos/batisado', function(req, res, next) {
  batismo.listar()
    .then(dados => {
      var resu = []
      for (p of dados){
        var temp = p.title.split(":",2)[1]
        var temp2 = temp.split(".")[0]
        resu.push(temp2)
      }
      res.status(200).jsonp(resu)
    }
       )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/batismos/progenitores', function(req, res, next) {
  batismo.listar()
    .then(dados => {
      var resu = []
      for (p of dados){
        console.log(p.title)
        var temp = p.title.split(":")
        console.log(temp)
        var mae = temp[temp.length-1]
        console.log(mae)
        var pai = temp[2].split(";")
        console.log(pai[0])
        resu.push({id:p._id,mae:mae,pai:pai[0]})
      }
      res.status(200).jsonp({resu})
    }
       )
    .catch(e => res.status(500).jsonp({error: e}))
});
/* GET home page. */
router.get('/batismos', function(req, res, next) {
  if(req.query.ano){
    batismo.ano(req.query.ano)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
  }else{
  batismo.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
  }
});

router.get('/batismos/:id', function(req, res, next) {
  batismo.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});


module.exports = router;
