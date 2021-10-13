import React, { useState, useRef } from "react";
import {
	Box,
	Heading,
	LightMode,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Card } from "../Register/Card";
import { EmailRegisterForm } from "../Register/EmailRegisterForm";
import { GoogleRegisterButton } from "../Register/GoogleRegisterButton";


const Register = (props) => {
	// redirect to login page if already have an account
  // const redirectToLogin = () => {
  //   history.push('/login')
  // }
  return (
		<>
			{/*/  start new styled components here for registration page */}
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
								Sign up!
							</Heading>
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								"The task of breaking a bad habit is like uprooting a powerful
								oak within us."
							</Text>
						</Stack>

						<LightMode>
							<GoogleRegisterButton />
						</LightMode>

						<EmailRegisterForm onSubmit={(e) => e.preventDefault()} />

						<Box fontSize="sm">
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								Already have an account?
							</Text>
							<Link
								fontWeight="semibold"
								color={useColorModeValue("blue.600", "blue.300")}
								href='/login'
							>
								Login
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
		</>
	);
};

export default Register;