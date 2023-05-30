const express = require('express')
const mariadb = require('mariadb');
require('dotenv').config();
let con = mariadb.createPool({
    host: process.env.sql_host,
    user: process.env.sql_user,
    password: process.env.sql_pass,
    database: process.env.sql_db
});
const app = express()
const port = 9080
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    next();
  });
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(port, function() {
	console.log(`Server started on port ${port}`);
});
app.get('/API', async (req, res) => {
  var q = `
  SELECT * FROM foto;
  `
  var out = await con.query(q)
  res.send(out)
})

