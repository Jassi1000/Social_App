const User = require("../Models/User");
const Post = require("../Models/Post");

exports.getPosts = async (req,res) => {
    try{
        const userId = req.user.id;
        if(!userId){
            return res.json("userId is available");
        }
        const user = await User.findById({_id : userId});
        if(!user){
            return res.json("The User doesnot found");
        }
        const followings = user.following;
        const posts = await Post.find({userid : {$in : followings}}).populate({path:"userid",select:"username _id profilePicture"});
        if(!posts || posts.length === 0){
            return res.json("There is no posts available");
        }
        return res.json({message:"Fetching of posts is successful ! ",posts});
    }
    catch(err){
        console.error(err);
        return res.json("There is internal error while fetching posts");
    }
}

exports.getUserPosts = async (req, res) => {
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User.findById({_id: userId});
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const posts = await Post.find({ userid: userId });
        if(!posts || posts.length === 0){
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        res.status(200).json({ message: 'User posts fetched successfully', posts });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getFollowers = async (req, res) => {
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User.findById({_id: userId});
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const followers = await User.find({ _id: { $in: user.followers } }).select('username profilePicture _id');
        if(!followers || followers.length === 0){
            return res.status(404).json({ message: 'No followers found for this user' });
        }
        res.status(200).json({ message: 'Followers fetched successfully', followers });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getFollowing = async (req, res) => {
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User.findById({_id: userId});
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const following = await User.find({ _id: { $in: user.following } }).select('username profilePicture _id');
        if(!following || following.length === 0){
            return res.status(404).json({ message: 'No following found for this user' });
        }
        res.status(200).json({ message: 'Following fetched successfully', following });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getOtherUserDetails = async (req, res) => {
    try{
        const userId = req.user.id;
        const otherUserId = req.params.otherUserId;
        if(!otherUserId) {
            return res.status(400).json({ message: 'Other User ID is required' });
        }
        if(otherUserId === userId) {
            return res.status(400).json({ message: 'Cannot fetch details for the same user' });
        }

        if(!userId){
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User.findById({_id: userId}).select('username profilePicture bio followers following');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const otherUser = await User.findById({_id: otherUserId}).select('username profilePicture bio followers following posts privacy');
        const otherUserPosts = await Post.find({userid:otherUserId});
        if(!otherUser){
            return res.status(404).json({ message: 'Other user not found' });
        }
        const isFollowing = user.following.includes(otherUserId);
        if(isFollowing || otherUser.privacy === 'public') {
            return res.status(200).json({ message: 'Other user details fetched successfully', otherUser,otherUserPosts, isFollowing });
        }
        otherUser.followers = otherUser.followers.length;
        otherUser.following = otherUser.following.length;
        otherUser.posts = otherUser.posts.length;
        return res.status(200).json({ message: 'Other user details fetched successfully', otherUser, isFollowing: false });

    }
    catch(err) {
        console.error('Error fetching user details:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }   
}



exports.getUserDetails = async (req, res) => {
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User.findById({_id: userId}).select('-password -email -createdAt -updatedAt');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User details fetched successfully', user });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getCommentsOnPost = async (req, res) => {
    try{
        const postId = req.params.postId;
        if(!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }
        const post = await Post.findById(postId)
                                .populate({
                                    path: 'comments',
                                    populate: {
                                        path: 'commentBy',
                                        select: 'username profilePicture'
                                    }
                                });
        if(!post){
            return res.status(404).json({ message: 'Post not found' });
        }
        if(post.comments.length === 0){
            return res.status(404).json({ message: 'No comments found for this post' });
        }
        return res.status(200).json({ message: 'Comments fetched successfully', comments: post.comments });
    }
    catch(err) {
        console.error('Error fetching comments on post:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}