import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Text,
	Flex,
	Button,
	Heading,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { BiLogIn } from "react-icons/bi";
import { MdAccountCircle } from 'react-icons/md';
import { SunIcon } from "@chakra-ui/icons";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../lib/AuthContext';

const HomePage = () => {
	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100");
	const history = useHistory();
	const { currentUser } = useAuth();

	return (
		<Route
			render={() => {
				return currentUser ? (
          <Redirect to="/habits" />
        ) : (
          <Flex
            background={formBackground}
            height="100vh"
            alignItems="center"
            justifyContent="center"
          >
            <main>
              <Heading fontSize="4em">
                <Text
                  bgGradient="linear(to-r, blue.600, green.200)"
                  bgClip="text"
                  fontSize="6xl"
                  fontWeight="extrabold"
                >
                  Habit Tribes
                </Text>
              </Heading>
              <Button
                rightIcon={<BiLogIn />}
                backgroundColor="blue.600"
                color="white"
                fontWeight="medium"
                mt={2}
                _hover={{bg: 'blue.400'}}
                _active={{
                  bg: 'blue.600',
                  transform: 'scale(0.95)',
                }}
                onClick={() => {
                  history.push('/login');
                }}
              >
                Login
              </Button>
              <div></div>
              <Button
                rightIcon={<MdAccountCircle />}
                backgroundColor="green.400"
                color="white"
                fontWeight="medium"
                mt={2}
                _hover={{bg: 'green.300'}}
                _active={{
                  bg: 'green.800',
                  transform: 'scale(0.95)',
                }}
                onClick={() => {
                  history.push('/register');
                }}
              >
                Create new account
              </Button>
              <div></div>
								<Button
								mt={2}
                rightIcon={<SunIcon />}
                backgroundColor="yellow.400"
                color="white"
                fontWeight="medium"
                mt={2}
                _hover={{bg: 'gray.400'}}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)',
                }}
                onClick={toggleColorMode}
              >
                Color Mode
              </Button>
            </main>
          </Flex>
        );
			  }
			}
		/>
	);
};

export default HomePage;
