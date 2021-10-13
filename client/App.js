import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider, Center } from "@chakra-ui/react";
import HomePage from './components/HomePage'
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import HabitDashboard from './components/HabitDashboard';
import Friends from './components/Friends';
import Video from './components/Video';
import { AuthProvider } from "../lib/AuthContext";


const App = () => {
	
	return (
		<AuthProvider>
			<ChakraProvider>
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/login" exact>
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/habits" exact>
						<HabitDashboard />
					</Route>
					<Route path="/friends" exact>
						<Friends />
					</Route>
					<Route path="/video" exact>
						<Video />
					</Route>
					<Route path="/*">
						<div>
							<Center mt={20}>404 not found</Center>
						</div>
					</Route>
				</Switch>
			</ChakraProvider>
		</AuthProvider>
	);
}

export default App;

