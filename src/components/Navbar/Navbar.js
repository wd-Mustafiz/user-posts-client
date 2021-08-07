import React, { useEffect, useState } from 'react';
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import useStyles from './styles'
import logo from '../../images/logo.png'
import {Link , useHistory , useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'
const Navbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const classes = useStyles()
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token

        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
        history.push('/auth')
        setUser(null)
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">
                MEMORIES
                </Typography>
                <img height='40' className={classes.image} src={logo} alt="memories" srcSet=""/>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                        </div>
                    ) : (
                        <Button variant="contained" component={Link} to="/auth" color="primary">Sign In</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;