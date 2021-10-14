import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import React, { useState, useRef } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { useHistory } from "react-router";

export const EmailLoginForm = (props) => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// handle submission of login form
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/habits");
		} catch {
			setError("Failed to log in");
		}
		
		setLoading(false);
	}

	return (
		<chakra.form width="full" {...props} onSubmit={handleSubmit}>
			<FormControl isRequired>
				<FormLabel
					fontWeight="medium"
					fontSize="sm"
					mb="2"
					textAlign="center"
					color={useColorModeValue("gray.600", "gray.400")}
				>
					or login with email
				</FormLabel>

				{error && (
					<Alert status="error" marginBottom="3">
						<AlertIcon />
						{error}
					</Alert>
				)}

				<Input
					id="email"
					type="email"
					placeholder="Email address"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					ref={emailRef}
					required="true"
				/>
				<Input
					id="password"
					mt={2}
					type="password"
					placeholder="Password"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
					ref={passwordRef}
					required="true"
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
				Login
			</Button>
		</chakra.form>
	);
};
