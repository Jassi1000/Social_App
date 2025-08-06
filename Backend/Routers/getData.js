const express = require("express");
const { getPosts, getUserPosts, getFollowers, getFollowing, getOtherUserDetails, getUserDetails, getCommentsOnPost, getUserSavedPosts } = require("../Controller/getDataControl");
const { protect } = require("../Middeware/protect");
const getRouter = express.Router()

getRouter.get("/getPosts",protect, getPosts);
getRouter.get("/getUserPosts", protect, getUserPosts);
getRouter.get("/getUserSavedPosts", protect, getUserSavedPosts);
getRouter.get("/getFollowers", protect, getFollowers);
getRouter.get("/getFollowing", protect, getFollowing);
getRouter.get("/getOtherUserDetails/:otherUserId", protect, getOtherUserDetails);
getRouter.get("/getUserDetails", protect, getUserDetails);
getRouter.get("/getCommentsOnPost/:postId", protect, getCommentsOnPost);

module.exports = getRouter;