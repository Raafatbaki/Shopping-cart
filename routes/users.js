var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signUp', function(req, res, next) {
  res.render('user/signUp');
});

router.post('/signUp', (req, res, next) => {
  res.send('ok')
})
module.exports = router;
