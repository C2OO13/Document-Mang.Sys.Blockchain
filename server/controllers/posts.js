import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const messages = await PostMessage.find();
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new PostMessage(body); 
    try {
        newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};