/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
import {
  HStack,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import * as React from 'react';
import { Card } from './Card';
import { FieldGroup } from './FieldGroup';
import { HeadingGroup } from './HeadingGroup';
import { useAuth } from '../../lib/AuthContext'

export const AccountSettings = (props) => {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return (
    <Stack as="section" spacing="6" {...props}>
      <HeadingGroup
        title="Account Settings"
        description="Change your profile, request your data, and more"
      />
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup title="Name &amp; Avatar" description="Change your name and profile picture">
            <HStack spacing="4">
              <Avatar
                src={
                  currentUser?.photoURL ||
                  'https://images.hindustantimes.com/img/2021/05/08/1600x900/Jim_carrey_1620469222065_1620469231087.jpg'
                }
                name={currentUser?.displayName || 'Jim Carrey'}
              />
              <Box>
                <Text> {currentUser?.displayName || 'Jim Carrey'} </Text>
               
              </Box>
            </HStack>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                Change name
              </Button>
              <Button size="sm" fontWeight="normal">
                Change gravatar
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup title="Login details" description="Change your email and password">
            <Text fontSize="sm"> {currentUser?.email}</Text>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                Change email
              </Button>
              <Button size="sm" fontWeight="normal">
                Change password
              </Button>
            </HStack>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
  );
};

