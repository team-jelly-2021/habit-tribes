import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Flex,
	Button,
	Heading,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { SunIcon } from "@chakra-ui/icons";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../../lib/AuthContext';

const HomePage = () => {
	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100");
	const history = useHistory();
	const { currentUser } = useAuth();

	return (
		<Route
			render={() => {
				return currentUser ? <Redirect to='/habits' /> :
					<Flex
						background={formBackground}
						height="100vh"
						alignItems="center"
						justifyContent="center"
					>
						<main>
							<Heading fontSize="4em" color="blue.400">
								Habit Tribes
				</Heading>
							<Button
								rightIcon={<FcGoogle />}
								backgroundColor="gray.600"
								color="white"
								fontWeight="medium"
								mt={2}
								_hover={{ bg: "gray.400" }}
								_active={{
									bg: "gray.800",
									transform: "scale(0.95)",
								}}
								onClick={() => { history.push('/login') }}
							>
								Login
				</Button>
							<div></div>
							<Button
								rightIcon={<SunIcon />}
								backgroundColor="gray.600"
								color="white"
								fontWeight="medium"
								mt={2}
								_hover={{ bg: "gray.400" }}
								_active={{
									bg: "gray.800",
									transform: "scale(0.95)",
								}}
								onClick={toggleColorMode}
							>
								Color Mode
				</Button>
						</main>
					</Flex>
			  }
			}
		/>
	);
};

export default HomePage;
