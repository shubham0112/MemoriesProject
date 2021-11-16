import React from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import NavBar from './components/NavBar/NavBar'; 
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={()=> <Redirect to="/posts" /> }></Route>
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" exact component={()=>(!user ? <Auth/> : <Redirect to="/posts"/>)}></Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;