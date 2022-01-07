const Blog = require('../models/blog');

const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('blogs/blogs',{title:'All blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err)
    });
}

const blog_create = (req,res)=>{
    res.render('blogs/create',{title:'Create blog'})
}

const blog_single = (req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.render('blogs/single-blog',{blog:result,title:'Blog details'});
    })
    .catch((err)=>{
        res.render('404',{title:'Not found'})
    });
}

const blog_store = (req,res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(console.err)
    });
}

const blog_delete = (req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({
           redirect:'/blogs' 
        })
    })
    .catch((err)=>{
        console.log(console.err)
    });
}





module.exports = {
    blog_index,
    blog_create,
    blog_single,
    blog_store,
    blog_delete
}