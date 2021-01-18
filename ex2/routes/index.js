var express = require('express');
var router = express.Router();
var axios = require('axios')

var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4NzMzMCwiZXhwIjoxNjExMDE2MTMwfQ.wLJVtYevtcDXQn6wGsQoMClDkRpeGcxHahghdPCfkWukL8pwD-3K592IQB_xeJ_eDpfJNon4XsPUnZitWZ0fQBri2hn8YaJowI-4MblUf8i4Ansn05dhH1Y4tWMoLAH066Qc3nITWvy6gszXaR0wiK46z_vvPDM1ZB6jFKkzjYTeGjyasXr6BVSPpwmyKBeGT9sm_TKeoBh9GKjT243_rNaXULSx6TMBlFzFiKInjMQNemrhGRGwgFh3UyqkJdHG9mWrDcs0Q4EnbEHt_DCBmy40wvlK8CaNaDdBstQqhfVXLLXSYxXgT6bLfcBIj2o6IqVV2NONBokuIsXCcbdYWg'


/* GET home page. */
router.get('/', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(dados => {
      res.render('index', {list: dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});



router.get('/classe/:cod', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.cod +'?token=' + token)
    .then(classe => {
      axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.cod +'/procRel?token=' + token)
        .then(processos => {
            res.render('classe', {list: classe.data, proc: processos.data ,codigo: req.params.cod})
        })
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});


router.get('/processos/:cod', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes??nivel=3&codigo=' + req.params.cod + '&token=' + token)
    .then(dados => {
      res.render('processo', {list: dados.data, codigo: req.params.cod})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});



module.exports = router;
