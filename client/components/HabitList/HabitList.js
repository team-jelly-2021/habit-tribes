import {
  Box, Stack, Flex, useDisclosure, useToast, Alert,
} from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/alert';
import * as React from 'react';
import axios from 'axios';
import { DraggableListItem } from './DraggableListItem';
import { useDraggableList } from './useDraggableList';
import AddHabits from '../AddHabitModal/AddHabits';
import HabitCard from './HabitCard';
import ActionsCard from './ActionsCard';
import { useAuth } from '../../lib/AuthContext';

export const HabitList = () => {
  const [habits, setHabits] = React.useState([]);
  const { items, handlePositionUpdate, measurePosition } = useDraggableList(habits);
  const [notifications, setNotifications] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { currentUser } = useAuth();

  React.useEffect(() => {
    fetchHabits();
  }, []);

	const fetchHabits = async () => {
		try {
			const token = await currentUser.getIdToken();
			const { data } = await axios.get(`/api/habits/`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setNotifications(data.filter(habit => habit.notification))
			setHabits(data);
		} catch (e) {
			console.log(e.message);
		}
	};

  const onAddHabit = async (payload) => {
    const { data } = await axios.post('/api/habits', payload);
    setHabits([...habits, data]);
    toast({
      title: 'Awesome!',
      description: 'Habit has been created',
      status: 'success',
      duration: 3000,
    });
  };

  const onDelete = async (habitId) => {
    try {
      await axios.delete(`/api/habits/${habitId}`);
      setHabits(habits.filter((habit) => habit.id !== habitId));
    } catch (e) {
      toast({
        title: 'Unknown Error',
        description: 'Something went wrong.',
        status: 'error',
        duration: 3000,
      });
    }
  };

	const onComplete = async (habitId) => {
		try {
			await axios.post(`/api/habits/${habitId}/done`)
			fetchHabits()
			toast({
				title: "Goal completed",
				description: "Great job! Your future self is so proud.",
				status: "success",
				duration: 3000,
			})
		} catch(e) {
			toast({
				title: "Unknown Error",
				description: "Something went wrong.",
				status: "error",
				duration: 3000,
			})
		}
	}

	return (
		<Box as="section" p="10">
			<Box maxWidth="600px" mx="auto">
			{!!notifications.length && 
			  <Flex justify="center" mb={4} mt={-4}>
				  {notifications.map(notification => {
						return (
							<Alert status="error">
								<AlertIcon />
								Hey! Your past self left you a video about <a href="#" style={{ fontStyle: 'italic', marginLeft: '5px' }}>{notification.name}</a>
							</Alert>)
					})}
				</Flex>
			}
				<Stack as="ul" spacing="4">
					{habits.map((habit, index) => (
						<DraggableListItem
							key={habit.id}
							index={index}
							whileHover={{
								scale: 1.03,
							}}
							whileTap={{
								cursor: "grabbing",
								scale: 1.12,
							}}
							height="16"
							bg={habit.complete ? `green.100` : `gray.100`}
							borderRadius="lg"
							boxShadow="md"
							position="relative"
							onPositionUpdate={handlePositionUpdate}
							measurePosition={measurePosition}
						>
							<HabitCard habit={habit} onDelete={onDelete} onComplete={onComplete}/>
						</DraggableListItem>
					))}
					<ActionsCard onOpenAddHabits={onOpen} />
					{!!isOpen &&
						<AddHabits
						isOpen={isOpen}
						onClose={onClose}
						onAddHabit={onAddHabit}
					/>
					}
				</Stack>
			</Box>
		</Box>
	);
};

export default HabitList;
