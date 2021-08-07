import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './Styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login'
import Input from './Input'
import Icon from './Icon'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router';
import {authSignUp , authSignin} from '../../Redux/Actions/Auth'
const Auth = () => {
    const history = useHistory()
    const classes = useStyles()
    const [signUp , setSignup] = useState(false)
    const [showPassword , setShowPassword] = useState(false)
    let initialFormData = {
        fristName:'',
        lastName:'',
        email:'',
        password:'',
        confrim:''
    }
    const [formData , setFormData] = useState(initialFormData)
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(signUp){
            dispatch(authSignUp(formData , history))
        }else{
            dispatch(authSignin(formData, history))
        }
    }
    
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormData({...formData , [name]:value})
    }
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    const googleSuccess = async (res) => {
        const result = await res?.profileObj
        const token = await res?.tokenId
        try {
            dispatch({type:'AUTH',data:{result , token}})
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("falid to login");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={`${classes.paper} formPaper`} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h6">{signUp ? `Sign Up` : `Sing In`}</Typography>
                
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            signUp && (
                                <>
                                    <Input
                                        name="fristName"
                                        label="Frist Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )
                        }
                        <Input
                            name="email"
                            label="Email"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="password"
                            handleChange={handleChange}
                            type={showPassword ? `text` : `password`}
                            handleShowPassword={handleShowPassword}
                        />
                        {
                            signUp && (
                                <Input
                                    name="confrim"
                                    label="confrim Password"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            )
                        }
                    </Grid>
                    <Button type="submit" className={classes.submit} fullWidth variant="contained" color="primary">
                        {signUp ? `sign up` : `sign in`}
                    </Button>
                    <GoogleLogin 
                        clientId="280398153975-k9cgoet8kkgviajr3fn9v06hs6dqaf9q.apps.googleusercontent.com"
                        render={(renderProp) => (
                           <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProp.onClick}
                            disabled={renderProp.disabled}
                            startIcon={<Icon />}
                            variant="contained"
                            
                           >
                            Google Sign in   
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}

                    />
                    <Grid container justifyContent="flex-end">
                    <Button onClick={() => setSignup(!signUp)}>{signUp ? `already have an acount? sign in`: `don't have an acount? sign up`}</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;