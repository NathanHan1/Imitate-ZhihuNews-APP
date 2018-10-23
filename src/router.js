import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Home from './routes/Home';


function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/home" component={Home} />
                <Redirect to="/home"/>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
