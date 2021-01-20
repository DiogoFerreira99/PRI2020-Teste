var express = require('express');
var router = express.Router();
var axios = require('axios')

var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDgxMGM2NDFhYmQ1NDU0MDZkZmRkMSIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJkYXcyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMTE1MDQwOSwiZXhwIjoxNjExMTc5MjA5fQ.kdA_-jCdh_ZvtmAsbjl33uEMvd3g4NU2EpEybR4JgRRlSu6-9y2AHfl4JNhe_jr6qFmhVrAmzKqvoQbPu4Po9667crHf-8xvOVqQa3W6Bkdpc73ePYRvvOGaJqWFf8WMGriJWpG1lmPgnzDoHDRgnkKrtVmYZrwX5WtIEIZfVmUvzLMU48205JDDL0TWWSXk_YXtATYQA6DbR-v8feBulyGlNQlJZIYHArppnDicxGHjbCCUzIVXP0pHBM8GzlgG6mBovRE1t-0NHAxl_rNilFEk7EEN9XnDZzGCBui0rcqNHK8MyRW3XOZKXPGwLah3fNLfrwU26iN7shwD8pYP-A'

router.get('/', function(req, res) {
  res.render('entrada.pug')
});

router.get('/classes', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token='+token)
        .then(dados => {
      res.render('tipologias', {lista: dados.data})
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/termosindice', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token='+token)
        .then(dados => {
      res.render('termos', {info: dados.data})
    })
    .catch(e => res.render('error', {error: e}))
});



router.get('/classes/*', function(req, res) {
  console.log(req.url)

  var id = req.url.split("/")[req.url.split("/").length-1]
  console.log(id)
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+id+'?token='+token)
      .then(dados => {
      console.log(dados.data.nivel)

      if(dados.data.nivel < 5 ){
        axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+id+'/descendencia?token='+token)          .then(dadosdesc => {
            if(dados.data.nivel == 3){
            var temp = {classe: dados.data, desc: dadosdesc.data, n: 1}
            }else{
              var temp = {classe: dados.data, desc: dadosdesc.data}
            }
            res.render('tipo', {info: temp})
            })
          .catch(e => res.render('error', {error: e}))

      }else if(dados.data.nivel==3){
        axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+id+'/descendencia?token='+token)          .then(dadosdesc => {
            axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+id+'/ti?token='+token)            .then(dadosproc => {
              var tproc = []
              console.log(dadosproc.data)
              for(p of dadosproc.data){
                
                if(p.idRel === 'eCruzadoCom' || p.idRel === "eComplementarDe" ||  p.idRel === "eSuplementoDe" || p.idRel === "eSuplementoPara"){
                  tproc.push(p)
                }
                console.log(tproc)
              }
              var temp = {classe: dados.data, desc: dadosdesc.data, proc: tproc}
              res.render('tipo', {info: temp})
              })
            .catch(e => res.render('error', {error: e}))
            })
          .catch(e => res.render('error', {error: e}))
      }
      
    })
    .catch(e => res.render('error', {error: e}))
});


module.exports = router;
