import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider, Center } from "@chakra-ui/react";
import HomePage from './components/HomePage'
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import HabitDashboard from './components/HabitDashboard';
import Friends from './components/Friends';
import Video from './components/Video';
import { AuthProvider } from "./lib/AuthContext";
import PrivateRoute from './components/PrivateRoute'
import TokenWrapper from './components/TokenWrapper'


const App = () => {

	return (
		<AuthProvider>
		 <TokenWrapper>
			<ChakraProvider>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<PrivateRoute path="/habits" component={HabitDashboard} />
					<PrivateRoute path="/friends" component={Friends} />
					<PrivateRoute path="/video" component={Video} />
					<Route path="/*">
						<div>
							<Center mt={20}>404 not found</Center>
						</div>
					</Route>
				</Switch>
			</ChakraProvider>
			</TokenWrapper>
		</AuthProvider>
	);
}

export default App;

