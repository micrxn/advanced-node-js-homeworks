const path = require("path");
const DataService = require("../services/data.services");
const {v4: uuid} = require("uuid");

const postsPath = path.join(__dirname, "..", "data", "posts.json");


 class BlogModel {
    //get all posts
    static async getAllPosts() {
        return DataService.readJSONFile(postsPath);
    }
    //get by title
    static async getPostByTitle(postTitle){
        const posts = await this.getAllPosts();
        const findPost = posts.find(post => post.title === postTitle);
        if (findPost) {
            return findPost;
        } else {
            return Promise.reject({msg: "No post with that title"})
        }
    }// ova ne mi raboti mi dava 404 vo postman
    //new post
    static async newPost(newPostContent) {
        const posts = await this.getAllPosts();

        const postExists = posts.some(post => post.title === newPostContent.title)
        if(postExists) return Promise.reject({msg: "Post with this title already exists"})

        const newPost = {
            id: uuid(),
            ...newPostContent,
        }
        const updatedPosts = [...posts, newPost];

        await DataService.saveJSONFile(postsPath, updatedPosts);
        return newPost.content;
    }

    //update post
    static async updatePost(postTitle, postUpdateContent) {
        const posts = await this.getAllPosts();

        const findPost = await this.getPostByTitle(postTitle);

        const updatedPost = {...findPost, ...postUpdateContent};

        const updatedPosts = posts.map(post => post.title === findPost.title ? updatedPost : post);
        
        await DataService.saveJSONFile(postsPath, updatedPosts);

        //za update me interesira kako moze da se vraka updateot sto e napraven mesto OK
    }
    //delete post
    static async deletePost(postId) {
        const posts = await this.getAllPosts();

        const updatedPosts = posts.filter(post => post.id !== postId);

        if(updatedPosts.length === posts.length){
            return Promise.reject({msg: "Post not found"})
        }
        await DataService.saveJSONFile(postsPath, updatedPosts)
        // isto i za delete kako da vratam sto e izbrisano
    }
 }

 module.exports = BlogModel;