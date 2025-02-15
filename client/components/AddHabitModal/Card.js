import { Box, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const Card = (props) => (
	<Box
		bg={useColorModeValue("white", "gray.700")}
		shadow="base"
		rounded="lg"
		p={{
			base: "4",
			md: "8",
		}}
		{...props}
	/>
);
