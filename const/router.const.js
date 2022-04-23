const router = require("express").Router();
const postRouter = require("../routes/post.routes")
const authRouter = require("../routes/auth.routes")

router.use("/posts", postRouter);
router.use("/auth", authRouter);


module.exports = router;