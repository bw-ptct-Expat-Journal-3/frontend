import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// It uses the same API as <Route />
// It renders the Route and passes the props through
// It checks if user is auth; if so, render 'component';
// if not, redirect to /login

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (localStorage.getItem('token')) {  // if token is in local storage then returns components otherwise returns to login 
					return <Component {...props} />;
				} else {
					return <Redirect to='/Login' />;
				}
			}}
		/>
	);
};
export default PrivateRoute;
