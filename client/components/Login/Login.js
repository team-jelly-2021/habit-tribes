import React from 'react';
import {
	Box,
	Heading,
	LightMode,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Card } from "../Login/Card";
import { EmailLoginForm } from "../Login/EmailLoginForm";
import { GoogleLoginButton } from "../Login/GoogleLoginButton";

const Login = () => {

	// catches error when login fails
async function handleSubmit(e) {
	e.preventDefault();

	try {
		setError("");
		setLoading(true);
		await login(emailRef.current.value, passwordRef.current.value);
		history.push("/");
	} catch {
		setError("Failed to log in");
	}

	setLoading(false);
}
	
  return (

			<Box
				as="section"
				bgGradient={{
					md: "linear(to-r, blue.600, green.200)",
				}}
				py="20"
			>
				<Card maxW="2xl" mx="auto" textAlign="center">
					<Stack maxW="xs" mx="auto" spacing="8">
						<Stack spacing="3">
							<Heading as="h1" letterSpacing="tight">
								Login
							</Heading>
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								"The seed of every habit is a single, tiny decision."
							</Text>
						</Stack>

						<LightMode>
							<GoogleLoginButton />
						</LightMode>
						<EmailLoginForm onSubmit={(e) => e.preventDefault()} />

						<Box fontSize="sm">
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								Don't have an account yet?
							</Text>
							<Link
								fontWeight="semibold"
								color={useColorModeValue("blue.600", "blue.300")}
								href='/register'
							>
								Sign up
							</Link>
						</Box>
					</Stack>
					<Text
						mt="16"
						fontSize="xs"
						mx="auto"
						maxW="md"
						color={useColorModeValue("gray.600", "gray.400")}
					>
						By logging in, you acknowledge that you have read, understood, and
						agree to our terms and conditions.
					</Text>
				</Card>
			</Box>
	);
}

export default Login;