import { Button, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../lib/AuthContext";
import { AuthProvider } from '../../../lib/AuthContext'

export const EmailRegisterForm = (props) => {
	const fullNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const phoneRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();


	
	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/habits");
		} catch {
			setError(`Failed to login`);
		}

		setLoading(false);
	}

	return (
		<chakra.form width="full" {...props} onSubmit={handleSubmit}>
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
					ref={fullNameRef}
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
          ref={emailRef}
					required
				/>
				<Input
					mt={2}
					id='password'
					type="password"
					placeholder="Password"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
	        ref={passwordRef}
					required
				/>
				<Input
					mt={2}
					id='confirmPassword'
					type="password"
					placeholder="Confirm password"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
          ref={passwordConfirmRef}
					required
				/>
				<Input
					mt={2}
					id='phoneNumber'
					type="phoneNumber"
					placeholder="Phone # for text notifications"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					ref={phoneRef}
					required
				/>
			</FormControl>
			<Button
				disabled={loading}
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
