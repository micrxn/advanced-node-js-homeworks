const PostModel = require("../models/post.model");

class PostController {
    static async fetchAllPosts(req,res){
        try {
            const posts = await PostModel.getAllPosts();
            res.status(200).send(posts)
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async fetchPostByTitle(req, res) {
        try {
            const {title: titleId} = req.params;

            const post = await PostModel.getPostByTitle(titleId);
            res.status(200).send(post)
        } catch (error) {
            res.status(400).send(error);
        }
    }// ova ne mi raboti mi dava 404 vo postman

    static async addNewPost(req, res) {
        try {
            const newPostContent = req.body;

            const newPost = await PostModel.newPost(newPostContent)

            res.status(200).send(newPost)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async updatePost(req, res) {
        try {
            const postTitle = req.params.title;
            const postContentUpdates = req.body;

            await PostModel.updatePost(postTitle, postContentUpdates)

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error)
        }
        //za update me interesira kako moze da se vraka updateot sto e napraven mesto OK
    }

    static async deletePost(req, res) {
        try {
            const postId = req.params.id;
            await PostModel.deletePost(postId);
            res.sendStatus(200)
        } catch (error) {
            res.status(400).send(error)
        }
        // isto i za delete kako da vratam sto e izbrisano
    }
}


module.exports = PostController