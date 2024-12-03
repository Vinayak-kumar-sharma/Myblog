const express = require("express");
const router = express.Router()
const Article = require('./../models/articles.js')


router.get("/", async (req,res)=>{

    try {
        const posts = await Article.find();
        res.render('index',{ posts });
        
    } catch (error) {
        console.error('Error fetching the posts: ',error)
        res.status(500).send("internal server error...")
        
    }
})
router.get("/newblog", (req, res) => {
  res.render('new'); 
});

router.get("/edit/:id/", async (req, res) => {
  try {
    const post = await Article.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('edit', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving the post');
  }
});

router.get("/:slug/blog", async (req,res)=>{
    try {
      console.log(req.params.slug)
      const post = await Article.findOne({slug: req.params.slug });
      if(!post){
        return res.status(404).send("<h1>Post not found</h1>")
      }
      post.views+=1;
      await post.save();
      res.render('post', { post });
    } catch (error) {
      res.status(500).send("<h2>Error fetching the post</h2>");
    }
  })



router.post("/newblog", async (req,res)=>{
    const { title,description,markdown } = req.body;
    const newPost = new Article({
        title,
        markdown,
        description,
        createdAt: new Date(),
    })

    await newPost.save()
    res.status(200).redirect(`/${newPost.slug}/blog`);
})

// // DELETE Route

router.delete('/post/:id', async (req, res) => {
    try {
      await Article.findByIdAndDelete(req.params.id);
      res.status(200).redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the post' });
    }
  });

//   // GET Route for Edit Page
// // router.get('/edit/:slug', async (req, res) => {
// //     try {
// //       const post = await Article.findOne({slug: req.params.slug});
// //       if (!post) {
// //         return res.status(404).send('Post not found');
// //       }
// //       res.render('edit', { post });
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).send('Error retrieving the post');
// //     }
// //   });
  

  router.put('/edit/:slug', async (req, res) => {

    try {
        const{title,description,markdown} = req.body;

        if (!title || !description) {
            return res.status(400).send('Title and content are required.');
          }
       
       await Article.updateOne(
        {slug : req.params.slug},
        { 
        title:title, 
        description:description, 
        markdown:markdown,
        },
        { new: true } // Return the updated document
      );
      res.status(200).redirect(`/${req.params.slug}`);
    } 
    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating the post' });
    }
  });
  
  
  



module.exports = router