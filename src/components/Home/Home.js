import React , { useEffect } from 'react';
import {Container, Grid, Grow,} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import { getPosts } from '../../Redux/Actions/posts';
import From from '../Form/From';
import Posts from '../Posts/Posts';
import useStyles from './styles'
const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    } , [dispatch])
    const classes = useStyles()
    return (
        <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" className={classes.mainContainer} alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <From />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    );
};

export default Home;