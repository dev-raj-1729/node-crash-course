const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const mongoUri = 'mongodb+srv://admin:admin@blogs.dvnw4ff.mongodb.net/?retryWrites=true&w=majority';


app.listen(3000);

app.use(express.static('public'));
app.use(morgan('dev'));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

    res.render('index',{title:'Home',blogs});
})

app.get('/about',(req,res)=> {
    res.render('about',{title:'About'});
})


app.get('/blogs/create',(req,res)=> {
    res.render('create',{title:'New Blog'});
})

app.use((req,res)=> {
    res.status(404).render('404',{title:'404 Page Not Found'});
})