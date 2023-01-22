const express = require('express')
const cors = require('cors')
const app = express()
const sqlite3 = require('sqlite3').verbose();

const database = new sqlite3.Database('./database');

app.use(cors());

var username = "";
var userpassword = "";

database.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(15) UNIQUE, password varchar(255))')
database.run('CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY AUTOINCREMENT, post varchar(255), username varchar(255), date varchar(255), user_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id))')

app.get('/',(req,res)=>{
    res.end()
})

//check database if user already exists
app.get('/check-existing-user', (req, res)=>{
    username = req.query.name
    userpassword = req.query.password

    database.all("SELECT * from users", (err,row) => {
      res.json({row})
        
    });
})

// Creates new user

app.get('/create-new-user',(req,res)=>{
    
    username = req.query.name
    userpassword = req.query.password
   
    database.run(`INSERT OR IGNORE INTO users (username,password) values (?, ?)` , [username, userpassword] )

    res.end()
})

app.listen(2023)