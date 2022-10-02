const express = require('express');

const Blog = require('../models/blogs');

router = express.Router();

router.get('/',(req,res)=> {
    Blog.find()
    .then((blogs)=>{
        res.render('index',{title:'Home',blogs});
    })
    .catch((err)=>{
        console.log(err);
    });
})

router.post('/',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save().then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
})

router.get('/create',(req,res)=> {
    res.render('create',{title:'New Blog'});
})

router.get('/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((blog)=>{
        res.render('details',{title:'Details',blog});
    }).catch((err)=>{
        console.log(err);
    });
})

router.delete('/:id',(req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
    .then((blog)=>{
        res.json({redirect:'/blogs'});
    }).catch((err)=>{
        console.log(err);
    });
})

module.exports = router;