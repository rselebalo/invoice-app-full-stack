import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Loader from '../components/Loader';
import { PageNotFound } from '../components/PageNotFound';
import { ROUTES } from './routes';
import PrivateRoute from '../components/PrivateRoute';

const Navigation = () => {

return(
    <Router>
        <Suspense fallback={<Loader />}>
            <Switch>
                {ROUTES.map((route: any) => {
                    return <PrivateRoute key={route.path} {...route} />
                })}
                <Route render={PageNotFound} />
            </Switch>
        </Suspense>
    </Router>
);
};


export default Navigation;
