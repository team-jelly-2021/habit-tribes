import { Box, Stack, Flex } from "@chakra-ui/react";
//import * as React from "react";
import { DraggableListItem } from "./DraggableListItem";
import { useDraggableList } from "./useDraggableList";
import AddHabits from "../AddHabitModal/AddHabits";
import React, { useEffect, useState } from "react";
import axios from 'axios';

export const HabitList = () => {
	const initialItems = ["200", "300", "400", "500", "600"];
	const { items, handlePositionUpdate, measurePosition } = useDraggableList(
		initialItems
	);

	useEffect(() => {
		axios.get("/habits")
			.then((result) => {
				console.log("result from backend", result.data);
				const todayGoalsFolder = [];
				result.data.forEach((obj) => {
					todayGoalsFolder.push(obj.habits_id);
				});
				console.log("folder in useEffect >>", todayGoalsFolder);
				setTodayGoals(todayGoalsFolder);
			});
	}, []);

	return (
		<Box as="section" p="10">
			<Box maxWidth="600px" mx="auto">
				<Stack as="ul" spacing="4">
					{items.map((hue, index) => (
						<DraggableListItem
							key={hue}
							index={index}
							whileHover={{
								scale: 1.03,
							}}
							whileTap={{
								cursor: "grabbing",
								scale: 1.12,
							}}
							height="16"
							bg={`gray.${hue}`}
							borderRadius="lg"
							boxShadow="md"
							position="relative"
							onPositionUpdate={handlePositionUpdate}
							measurePosition={measurePosition}
						/>
					))}
					<AddHabits />
				</Stack>
			</Box>
		</Box>
	);
};

export default HabitList;
