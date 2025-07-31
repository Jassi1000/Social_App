const express = require("express");
const { getPosts, getUserPosts, getFollowers, getFollowing, getOtherUserDetails } = require("../Controller/getDataControl");
const { protect } = require("../Middeware/protect");
const getRouter = express.Router()

getRouter.get("/getPosts",protect, getPosts);
getRouter.get("/getUserPosts", protect, getUserPosts);
getRouter.get("/getFollowers", protect, getFollowers);
getRouter.get("/getFollowing", protect, getFollowing);
getRouter.get("/getOtherUserDetails/:otherUserId", protect, getOtherUserDetails);

module.exports = getRouter;