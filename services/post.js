const Post = require('../models/post');
const User = require('../models/user');

const createPostScrape = async (title, username,category,content) => {

    const post = new Post({
        content: content,
        username:username,
        category:category,
        title:title
    });

    post.save().catch(() => {
        return null;
    });
}


const getPostById = async (id) => {
    return await Post.findById(id);
};

// const getArticles = async () => {
//     return await Article.find({});
// };

// const updateArticle = async (id, title) => {
//     const article = await getArticleById(id);
//     if (!article)
//         return null;

//     article.title = title;
//     await article.save();
//     return article;
// };

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