import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles'
import Filebase from 'react-file-base64'
import {createPost , updatePost} from '../../Redux/Actions/posts'
import {useDispatch , useSelector} from 'react-redux'
import { setCurrentId } from '../../Redux/Actions/currentId';
const From = () => {
    const [postData , setPostData] = useState({
        title:'',messege:'',tags:'',selectedFile:''
    })
    const dispatch = useDispatch()
    const currentId = useSelector(state => state.currentId)
    const updatedPost = useSelector(state => currentId ? state.posts.find(p => p._id === currentId) : postData )
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const classes = useStyles()
    
    useEffect(() => {
      if(updatePost)  setPostData(updatedPost)
    },[updatedPost])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId , {...postData , name: user?.result?.name}))
        }else{
            dispatch(createPost({...postData , name: user?.result?.name}))
        }
        clear()
    }
    const clear = () => {
        dispatch(setCurrentId(null))
        setPostData({
            title:'',messege:'',tags:'',selectedFile:''
        })
    }

    if (!user) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
      }
    return (<Paper className={classes.paper}>
            <form noValidate  autoComplete="off" className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}> 
            <Typography  variant="h6">{currentId ? `Editing ${updatedPost.title}`: `Create a Memory`}</Typography>

                <TextField required  name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData , title:e.target.value})}/>

                <TextField multiline rows={4} required name="messege" variant="outlined" label="Messege" fullWidth value={postData.messege} onChange={(e) => setPostData({...postData , messege:e.target.value})}/>

                <TextField required  name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData , tags: e.target.value.split(',')})}/>

                <div className={classes.fileInput}>
                    <Filebase type="file" multiple={false} onDone={({base64}) => setPostData({...postData , selectedFile:base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
            </Paper>
    );
};

export default From;    