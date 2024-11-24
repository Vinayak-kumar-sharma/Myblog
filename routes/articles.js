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

router.get("/post/:id", async (req,res)=>{
    console.log(req.params.id)
    const post = await Article.findById(req.params.id);
    res.render('post', { post });
})

router.get('/new', (req, res) => {
    res.render('new'); 
  });
  

router.post("/new", async (req,res)=>{
    const { title, description } = req.body;
    const newPost = new Article({
        title,
        description,
    })

    await newPost.save()
    res.status(200).redirect("/");
})

// DELETE Route

router.delete('/post/:id', async (req, res) => {
    try {
      await Article.findByIdAndDelete(req.params.id);
      res.status(200).redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the post' });
    }
  });

  // PUT Route
// router.post('/post/:id/update', async (req, res) => {

//     try {
//         const{title,description} = req.body;

//         if (!title || !description) {
//             return res.status(400).send('Title and content are required.');
//           }

//        await Article.findByIdAndUpdate(
//         req.params.id,
//         { 
//         title:title, 
//         description:description, 
//         },
//         { new: true } // Return the updated document
//       );
//       res.redirect(`/post/${req.params.id}`);
//     } 
//     catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error updating the post' });
//     }
//   });
  // GET Route for Edit Page
router.get('/post/:id/edit', async (req, res) => {
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
  

  router.put('/post/:id/', async (req, res) => {

    try {
        const{title,description} = req.body;

        if (!title || !description) {
            return res.status(400).send('Title and content are required.');
          }

       await Article.findByIdAndUpdate(
        req.params.id,
        { 
        title:title, 
        description:description, 
        },
        { new: true } // Return the updated document
      );
      res.redirect(`/post/${req.params.id}`);
    } 
    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating the post' });
    }
  });
  
  
  



module.exports = router