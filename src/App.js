import React, { useState } from 'react';
import {Container} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from './components/Home/Home';
const App = () => {
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    return (
        <Router>
            <Container maxwidth="lg">
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/auth" exact>
                    <Auth />
                </Route>
            </Switch>
            </Container>
        </Router>
    );
};

export default App;