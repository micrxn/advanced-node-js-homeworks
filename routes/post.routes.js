const router = require("express").Router();
const PostController = require("../controllers/post.controller");


router.get("/all", PostController.fetchAllPosts);

router.get("/:?", PostController.fetchPostByTitle);// ova ne mi raboti mi dava 404 vo postman

router.post("/add", PostController.addNewPost);

router.patch("/:title/update", PostController.updatePost);

router.delete("/:id", PostController.deletePost);



module.exports = router;