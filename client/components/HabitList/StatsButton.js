import { IconButton } from "@chakra-ui/react";
import React from "react";
import { FaRegChartBar } from "react-icons/fa";

export const StatsButton = (props) => (
	<IconButton aria-label="Habit Stats" icon={<FaRegChartBar />} {...props} />
);

export default StatsButton;
