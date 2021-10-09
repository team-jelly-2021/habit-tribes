import { Button, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import React, { useState } from 'react';
import { useHistory } from "react-router";
import axios from 'axios'
import ErrorMessage from "./ErrorMessage";
import { CircularProgress } from "@chakra-ui/progress";

export const EmailLoginForm = (props) => {
  function PasswordInput() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  }
  
  const history = useHistory();

  // initial state for Login component
  const [state, setState] = useState({
    email: '',
    password: '',
    success: null,
  })
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // handle typed inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  // post request for logging in
  const handleSubmitClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      "email" : state.email,
      "password" : state.password,
    }

    axios.post('/api/login', payload, {withCredentials: true})
      .then((res) => {

          console.log('this is the data received from server:    ', res.data)
          setIsLoading(false);
          setState(prevState => ({
            ...prevState,
            'success' : 'Log in successful, redirecting to homepage...'
          }))
          // push to homepage
          history.push({
            pathname: '/habits',
            state: {token: res.data}
        })
    })
    .catch(error => {
      setIsLoading(false)

      if (error.response.status === 401) {
        setError('Invalid email or password');
      }

      console.log('ERRRRRR', error.response)
    });
  }
  

  return (
    
    <chakra.form width="full" {...props} onSubmit={handleSubmitClick}>
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

      {error && <Alert status="error" marginBottom="3"><AlertIcon />{error}</Alert>}

        <Input
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
          id='password'
          mt={2}
          type="password"
          placeholder="Password"
          _placeholder={{
            color: useColorModeValue("gray.600", "gray.400"),
          }}
          onChange={handleChange}
          value={state.password}
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
        Login
		</Button>

    </chakra.form>
  );
};