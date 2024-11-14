const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

//Reading the files data

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('form', {files: files});
    })

})

//FileCreating feature ---

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        res.redirect("/");
    })
})

//ReadFile feature ---

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8" ,(err, filedata) => {
        res.render('readFile', {filename: req.params.filename, filedata: filedata});
    })
})

//editfile feature ---

app.get('/edit/:filename', (req, res) => {
    res.render('edit', {filename: req.params.filename});
})

app.post('/edit', (req, res) => {
    fs.rename(`./files/${req.body.Previous}`, `./files/${req.body.New}`, (err) => {
        res.redirect("/");
    })
})

//menu feature ---

const hov = document.querySelector('#hover');
const btn = document.querySelector('#menu');

btn.addEventListener('click', () => {
    
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})