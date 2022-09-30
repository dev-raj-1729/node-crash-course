const express = require('express');
const path = require('path');


const app = express();

app.listen(3000);

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./views/index.html'));
})

app.get('/about',(req,res)=> {
    res.sendFile(path.resolve('./views/about.html'));
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

app.use((req,res)=> {
    res.status(404).sendFile(path.resolve('./views/404.html'));
})