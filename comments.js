//create web server
//create a web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');

//add comment
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let newComment = new Comment({
        post: req.body.post,
        user: req.body.user,
        content: req.body.content
    });

    Comment.addComment(newComment, (err, comment) => {
        if(err){
            res.json({success: false, msg: 'Failed to add comment'});
        } else {
            res.json({success: true, msg: 'Comment added'});
        }
    });
});

//get comments
router.get('/:id', (req, res, next) => {
    Comment.getCommentsByPost(req.params.id, (err, comments) => {
        if(err) throw err;
        if(!comments){
            return res.json({success: false, msg: 'No comments found'});
        }
        res.json({success: true, comments: comments});
    });
});

//delete comment
router.delete('/:commentId', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Comment.getCommentById(req.params.commentId, (err, comment) => {
        if(err) throw err;
        if(!comment){
            return res.json({success: false, msg: 'Comment not found'});
        }
        Comment.deleteComment(comment, (err, comment) => {
            if(err){
                res.json({success: false, msg: 'Failed to delete comment'});
            } else {
                res.json({success: true, msg: 'Comment deleted'});
            }
        });
    });
});

module.exports = router;