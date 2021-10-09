import { Button, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

export const EmailRegisterForm = (props) => {
	function PasswordInput() {
		const [show, setShow] = useState(false);
		const handleClick = () => setShow(!show);
	}

	const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    success: null,
  })

	const [error, setError] = useState('');

	  // typing change handler
		const handleChange = (e) => {
			const { id, value } = e.target;
			setState(prevState => ({
				...prevState,
				[id] : value,
			}));
		};
	
		// history push pages
		const history = useHistory();
	
		// redirect to login page if already have an account
		const redirectToLogin = () => {
			history.push('/login')
		}
	
		// handle click on registration
		const handleSubmitClick = (e) => {
			e.preventDefault();

			if (state.password != state.confirmPassword) {
				setError('Passwords do not match');
			}

			if (state.password === state.confirmPassword && state.name && state.email) {
				const payload = {
					"name": state.name,
					"email": state.email,
					"password": state.password,
					"phoneNumber": state.phoneNumber,
				};
	
				axios.post('/api/register', payload, {withCredentials: true})
				.then(res => {
						setState(prevState => ({
							...prevState,
							'success' : 'Registration successful, redirecting to homepage...'
						}));
						// push to homepage
						history.push('/habits')
				})
				.catch(error => {
					console.log(error)
					setError('Failed to create new account.')
				});
			} 
		}

	return (
		<chakra.form width="full" {...props} onSubmit={handleSubmitClick}>
			<FormControl>
				<FormLabel
					fontWeight="medium"
					fontSize="sm"
					mb="2"
					textAlign="center"
					color={useColorModeValue("gray.600", "gray.400")}
				>
					or sign up below
				</FormLabel>

				{error && <Alert status="error" marginBottom="3"><AlertIcon />{error}</Alert>}

				<Input
					id='name'
					type="name"
					placeholder="Full name"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					onChange={handleChange}
          value={state.name}
					required="true"
				/>
				<Input
					mt={2}
					id='email'
					type="email"
					placeholder="Email address"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					onChange={handleChange}
          value={state.email}
					required="true"
				/>
				<Input
					mt={2}
					id='password'
					type="password"
					placeholder="Password"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					onChange={handleChange}
          value={state.password}
					required="true"
				/>
				<Input
					mt={2}
					id='confirmPassword'
					type="password"
					placeholder="Confirm password"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					onChange={handleChange}
          value={state.confirmPassword}
					required="true"
				/>
				<Input
					mt={2}
					id='phoneNumber'
					type="phoneNumber"
					placeholder="Phone # for text notifications"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					onChange={handleChange}
          value={state.phoneNumber}
					required="true"
				/>
			</FormControl>
			<Button
				mt="3"
				isFullWidth
				fontSize="sm"
				fontWeight="bold"
				colorScheme="gray"
				type="submit"
			>
				Sign up
			</Button>
		</chakra.form>
	);
};
