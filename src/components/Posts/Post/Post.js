import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles'
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import {setCurrentId} from '../../../Redux/Actions/currentId'
import {deletePost,likeCount} from '../../../Redux/Actions/posts'
import {useDispatch} from 'react-redux'
import '../../../index.css'
const Post = ({post}) => {
    const [show , setShow] = useState(true)
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleEdit = () => {
        dispatch(setCurrentId(post._id))
    }
    const handleDelete = () => {
        setShow(false)
        dispatch(deletePost(post._id))
        
    }
    const user = JSON.parse(localStorage.getItem('profile'));
    
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

    return (
        <Card className={`${classes.card} postCard`} display={show ? `block` : `none`}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={`${classes.overlay2} overlayEdit`}>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button style={{color:'white'}} size="small" onClick={handleEdit}>
                <EditIcon fontSize="medium"/>
            </Button>
            )}
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h6">{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" component="p" color="textSecondary">{post.messege}</Typography>
            
            </CardContent>        
            <CardActions className={classes.cardActions}>
                <Button size="small" disabled={!user?.result} color="primary" onClick={() => dispatch(likeCount(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
            </CardActions>
        </Card> 
    );
};

export default Post;