const Post = require('../models/post');
const User = require('../models/user');


const getPostById = async (id) => {
    return await Post.findById(id);
};


const deletePost = async (id) => {
    const article = await getPostById(id);
    if (!article)
        return null;

    await article.remove();
    return article;
};

module.exports = {
    deletePost,
    getPostById,
    createPostScrape
}