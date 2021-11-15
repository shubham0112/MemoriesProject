import React from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import NavBar from './components/NavBar/NavBar'; 
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/auth" exact component={Auth}></Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;