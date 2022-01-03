import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cadastro from '../pages/cadastro';
import Home from '../pages/home';
import App from  '../pages/App';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={App}/>
    <Route path="/cadastro" exact component={Cadastro}/>
    <Route path="/home" exact component={Home}/>
  </Switch>
)
export default Routes;