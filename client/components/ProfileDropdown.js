import {
	Avatar,
	Box,
	Flex,
	HStack,
	Menu,
	MenuItem,
	MenuList,
	Text,
	useMenuButton,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { useAuth } from '../lib/AuthContext';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const UserAvatar = () => {
	const { currentUser } = useAuth();

	// The name field needs to be added to the firebase user object on sign up
	// Then that property needs to replace the Jim Carrey string
	return (
		<Avatar
			size="sm"
			src={currentUser?.photoURL}
			name="Jim Carrey"
		/>
	)
};

const ProfileMenuButton = (props) => {
	const buttonProps = useMenuButton(props);
	return (
		<Flex
			{...buttonProps}
			as="button"
			flexShrink={0}
			rounded="full"
			outline="0"
			_focus={{
				shadow: "outline",
			}}
		>
			<Box srOnly>Open user menu</Box>
			<UserAvatar />
		</Flex>
	);
};

export const ProfileDropdown = () => {
	const history = useHistory();
	const [error, setError] = useState("");
	console.log('Profile dropdown state changed')
	const { currentUser, logout } = useAuth();

		// logout function handler
		async function handleLogout() {
			setError("");
			try {
				await logout();
				history.push("/login");
			} catch {
				setError("Failed to log out");
			}
		}
	
	return (
		<Menu>
			<ProfileMenuButton />
			<MenuList
				rounded="md"
				shadow="lg"
				py="1"
				color={mode("gray.600", "inherit")}
				fontSize="sm"
			>
				<HStack px="3" py="4">
					<UserAvatar />
					<Box lineHeight="1">
						<Text fontWeight="semibold">Jim Carrey</Text>
						<Text mt="1" fontSize="xs" color="gray.500">
							{currentUser?.email}
					</Text>
					</Box>
				</HStack>
				<MenuItem fontWeight="medium">Account Settings</MenuItem>
				<MenuItem fontWeight="medium" color={mode("red.500", "red.300")} onClick={handleLogout}>
					Sign out
			</MenuItem>
			</MenuList>
		</Menu>
	)
};
