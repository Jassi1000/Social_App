const express = require('express');
const { protect } = require('../Middeware/protect');
const { likePost, commentOnPost, requestToFollow, acceptFollow, savePost, removeFromFollowers } = require('../Controller/interactionsControl');
const interactionRouter = express.Router();

interactionRouter.post('/likePost/:postId', protect,likePost);
interactionRouter.post('/commentPost/:postId', protect, commentOnPost);

interactionRouter.put('/requestToFollow/:followUserId',protect,requestToFollow);
interactionRouter.put('/AcceptFollow/:otherUserId',protect,acceptFollow);
interactionRouter.put('/removeFromFollowers/:otherUserId',protect,removeFromFollowers);

interactionRouter.put('/savePost/:postId', protect, savePost);

module.exports = interactionRouter;