const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//models
const Blog = require('./models/blogs');

const mongoUri = 'mongodb+srv://admin:admin@blogs.dvnw4ff.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(mongoUri,{useNewUrlParser:true, useUnifiedTopology: true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect('/blogs');
})

app.get('/about',(req,res)=> {
    res.render('about',{title:'About'});
})


app.get('/blogs',(req,res)=> {
    Blog.find()
    .then((blogs)=>{
        res.render('index',{title:'Home',blogs});
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save().then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.get('/blogs/create',(req,res)=> {
    res.render('create',{title:'New Blog'});
})

app.get('/blogs/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((blog)=>{
        res.render('details',{title:'Details',blog});
    }).catch((err)=>{
        console.log(err);
    });
})

app.delete('/blogs/:id',(req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
    .then((blog)=>{
        res.json({redirect:'/blogs'});
    }).catch((err)=>{
        console.log(err);
    });
})

app.use((req,res)=> {
    res.status(404).render('404',{title:'404 Page Not Found'});
})