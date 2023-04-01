const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');



const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/login', (_req, _res)=>{
    _res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><input type="text" name="username"><button type="submit">Add</button><form/>')
});

let username;
app.post('/', (_req, _res)=>{
    console.log(_req.body);
    username = '  '+_req.body.username + ':';
    
    _res.redirect('/');
});

app.get('/', (_req, _res)=>{
    fs.readFile("file.txt", {encoding: 'utf-8'}, (err,data)=>{
        console.log(err);
        _res.send(`<h1>Welcome ${username}</h1><br>${data}<br><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>`);
    });
});

let msg;
app.post('/message', (_req, _res)=>{
    msg = _req.body.message;
    userMsg = username+msg;
    fs.appendFile("file.txt", userMsg, (err)=>{
        console.log(_req.body);
    });
    _res.redirect('/');
})

app.listen(3000);