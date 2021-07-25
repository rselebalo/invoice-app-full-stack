import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import DefaultLayout from '../../containers/DefaultLayout';

/* eslint-disable react/prop-types */
const PrivateRoute: React.FC<any> = ({ component: Component, path, ...rest }) => {
  const render = (props: any) => <DefaultLayout {...props} />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
