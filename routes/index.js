var express = require('express');
var router = express.Router();
const { creatTokens, validateToken } = require('./JWT')

/* GET home page. */
module.exports = function (db) {
  router.get('/', function (req, res, next) {
    res.render('login', { title: 'Express' });
  });

  router.post('/', async (req, res) => {
    console.log('masuk login')
    try {
      const email = req.body.email
      const password = req.body.password

      const { rows: emails } = await db.query('SELECT * FROM users WHERE email = $1', [email])

      if (emails.length == 0) {
        return res.redirect('/')
      }

      if (password != emails[0].password) {
        return res.redirect('/')
      }
      console.log('masuk2')

      const accessToken = creatTokens(emails)

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000
      })

      res.redirect('/barang')
    } catch (err) {
      return res.redirect('/')
    }

  })
  return router
}
