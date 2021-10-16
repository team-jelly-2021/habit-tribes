import {
  Box, Center, Flex, useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import AddHabitsButton from './AddHabitsButton';
import StatsButton from './StatsButton';
import SettingsButton from './SettingsButton';

const ActionsCard = ({ onOpenAddHabits = () => {}, ...props }) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    shadow="none"
    rounded="lg"
    p={{
		  base: '4',
		  md: '8',
    }}
    {...props}
  >
    <Center>
      <SettingsButton mx={2} size="lg" />
      <AddHabitsButton onClick={onOpenAddHabits} mx={2} size="lg" />
      <StatsButton mx={2} size="lg" />
    </Center>
  </Box>
);

export default ActionsCard;
