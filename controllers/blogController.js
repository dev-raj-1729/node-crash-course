//blog_index, blog_create_get, blog_create_post,blog_delete, blog_details

const Blog = require('../models/blogs');

const blog_index = (req,res) => {
    Blog.find()
    .then((blogs)=>{
        res.render('index',{title:'Home',blogs});
    })
    .catch((err)=>{
        console.log(err);
    });
}

const blog_details = (req, res) => {
    Blog.findById(req.params.id)
    .then((blog)=>{
        res.render('details',{title:'Details',blog});
    }).catch((err)=>{
        console.log(err);
    });
}

const blog_create_get = (req,res) => {
    res.render('create',{title:'New Blog'});
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
}

const blog_delete = (req, res) => {
    
    Blog.findByIdAndDelete(req.params.id)
    .then((blog)=>{
        res.json({redirect:'/blogs'});
    }).catch((err)=>{
        console.log(err);
    });

}

module.exports = {
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_details,
    blog_index
};