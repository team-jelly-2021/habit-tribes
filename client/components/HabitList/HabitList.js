import { Box, Stack, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DraggableListItem } from "./DraggableListItem";
import { useDraggableList } from "./useDraggableList";
import AddHabits from "../AddHabitModal/AddHabits";
import HabitCard from "./HabitCard";
import ActionsCard from "./ActionsCard";
import axios from "axios";
import { useAuth } from "../../../lib/AuthContext";

export const HabitList = () => {
	const [habits, setHabits] = React.useState([]);
	const { items, handlePositionUpdate, measurePosition } = useDraggableList(habits);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser } = useAuth();


	useEffect(() => {
		fetchHabits();
	}, []);

	const fetchHabits = async () => {
		try {
			const token = await currentUser.getIdToken();
			const fetchedHabits = await axios.get(`/api/habits/`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setHabits(fetchedHabits.data);
		} catch (e) {
			console.log(e.message);
		}
	};

	const onAddHabit = async (payload) => {
		const { data } = await axios.post("/api/habits", payload);
		setHabits([...habits, data]);
	};

	const onDelete = async (habitId) => {
		try {
			await axios.delete(`/api/habits/${habitId}`);
		} catch (e) {
			console.log(e.message);
		}
		setHabits(habits.filter((habit) => habit.id !== habitId));
	};

	return (
		<Box as="section" p="10">
			<Box maxWidth="600px" mx="auto">
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
							bg={`gray.${(index + 1) * 100}`}
							borderRadius="lg"
							boxShadow="md"
							position="relative"
							onPositionUpdate={handlePositionUpdate}
							measurePosition={measurePosition}
						>
							<HabitCard habit={habit} onDelete={onDelete} />
						</DraggableListItem>
					))}
					<ActionsCard onOpenAddHabits={onOpen} />
					{ isOpen &&
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
