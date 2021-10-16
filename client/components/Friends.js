import React, { useEffect, useState } from 'react';
import { Flex, HStack, SimpleGrid, useColorModeValue as mode } from "@chakra-ui/react";
import { MobileHamburgerMenu } from "./MobileHamburgerMenu";
import { Notification } from "./Notification";
import { PageContent } from "./PageContent";
import { PageHeader } from "./PageHeader";
import { ChakraProvider} from "@chakra-ui/react";
import { Box,Badge,Avatar,Button, Input, Stack, Heading, Text, InputRightElement, Divider } from "@chakra-ui/react";
import { NavMenu } from "./NavMenu";
import { useMobileMenuState } from "./useMobileMenuState";
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../lib/AuthContext';

const AllUsers = (props) => { 
  const { isMenuOpen, toggle } = useMobileMenuState();

  const [allUsers,setAllUsers] = useState([]);

  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState("");

  const { currentUser } = useAuth();
  console.log('user   ', currentUser);
    

  //get all users from server and update allUsers arr;
  useEffect(() => {
    console.log('FRIENDS: in useEffect');

    axios.get('/api/friends/allFriends')
      .then(res => {
        console.log('res', res);
        /*res.data.forEach(obj=>{
          folder.push(obj.full_name);
        })*/
            
     
    
        setAllUsers(res.data);
      });

        
      axios.get('/api/friends/requests', {
      })
        .then(res => {
          console.log('friend reqs', res);
          const requests = res.data;
          setFriendRequests(requests);
          console.log(requests);
        });

  },[]);




  const property = {
        
    NumOfHabits:4,
    AvgCompleted:'89%',
       
  }

  const acceptFriendRequest = (user) => {
    axios.put('/api/friends/', {
      friendshipID: user._id
    })
      .then(res => {
        user.request_accepted = TRUE;
      });
  };

  const sendFriendRequest = (user) => {
    axios.post('/api/friends', {
      invitedFriend: user.uid
    }).then(res => {
      user.friend_b = true,
      user.request_accepted = false
    });
  };

  const performSearch = (searchString) => {
    axios.get('/api/friends/search/', {
      params: {query: searchString}
    }).then(res => {
      console.log('searchResults : ', res.data);
      setSearchResults(res.data);
    });
  };
      
  const renderUsers = (users) =>{
    console.log('RENDER USERS');
    let name;
    let i=0;
    //each loop change the users index to get every user 
    return users.map((user)=>{
      name=users[i] 
      console.log('usr', user);
      //console.log('name',name)
      i++
           
      return (
           
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
         
                <Box p="6">
                   
                   <Box
                     mt="1"
                     fontWeight="semibold"
                     as="h4"
                     lineHeight="tight"
                     isTruncated
                   > <Avatar size="2xl" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />{user.full_name}
                     
                   </Box>
                   {/*<Box
                       color="gray.500"
                       fontWeight="semibold"
                       letterSpacing="wide"
                       fontSize="s"
                       textTransform="uppercase"
                       ml="2"
                     >
                      Num of Habits: {property.NumOfHabits}  
                      
                     </Box>
                     <Box
                       color="gray.500"
                       fontWeight="semibold"
                       letterSpacing="wide"
                       fontSize="s"
                       textTransform="uppercase"
                       ml="2"
                     >
                      Avg % completed: {property.AvgCompleted}  
                      
                   </Box> */}
       
                   
                   <br/>

                  <Button colorScheme="teal" size="sm" visibility={user.friend_b} onClick={() => sendFriendRequest(user)}>
                  Send Friend Request
                  </Button>


                   {user.friend_b & (!user.request_accepted & currentUser.uid == user.friend_b) ? 
                   <Button colorScheme="teal" size="sm" onClick={() => acceptFriendRequest(user)}>
                     Accept Friend Request
                   </Button> : 
                   <Button disabled={true} visibility={user.friend_b}>
                   Friend Request Pending
                  </Button>
                  }
                 
                 </Box>
               </Box>
            
      )
           
    })

  }
    
  return (
        <Flex direction="column" bg={mode("gray.100", "gray.800")} height="100vh">
        <Flex align="center" bg="blue.400" color="white" px="6" minH="16">
          <Flex justify="space-between" align="center" w="full">
            <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
            <NavMenu.Mobile isOpen={isMenuOpen} />
  
            <NavMenu.Desktop />

  
          </Flex>
        </Flex>
  
        <PageHeader />
        
        <div style={{padding: '15px'}}>
        <Heading size="lg">Friends</Heading>

          <HStack>
            <Input bg={mode('white', 'gray.800')} placeholder="Search by user name or email" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
            <Button colorScheme="blue" flexShrink={0} fontWeight="bold" fontSize="sm" onClick={() => performSearch(searchString)}>
                Search
            </Button>
          </HStack>

          {searchResults ? 
          <Heading size="md">Search Results</Heading>
          : ""}

          {searchResults ? renderUsers(searchResults) : ""}


          
        </div>
        <Divider />

        <div style={{padding: '15px'}}>
          <Heading size="md">Friend Requests</Heading>
            <SimpleGrid columns="3">
             {renderUsers(friendRequests)}
            </SimpleGrid>
        </div>

        <Divider />

        <div style={{padding: '15px'}}>
          <Heading size="md">My Friends</Heading>
            <SimpleGrid columns="3">
             {renderUsers(allUsers)}
            </SimpleGrid>
        </div>
      </Flex>
        
       
        
       
      
       
  )

};

export default AllUsers;