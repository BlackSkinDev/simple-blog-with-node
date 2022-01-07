var express = require('express');
var router = express.Router();
const blogController = require('../controllers/blogController')

/* GET blogs listing. */
router.get('/',blogController.blog_index);

/* Create blog. */
router.get('/create',blogController.blog_create);


// /* GET  single blog. */
router.get('/:id', blogController.blog_single);

/* Store blog. */
router.post('/',blogController.blog_store);

/* Delete blog. */
router.delete('/:id', blogController.blog_delete);

  
  



module.exports = router;

