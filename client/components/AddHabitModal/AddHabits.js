import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Stack,
  Input,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import * as React from 'react';

const AddHabits = ({
  isOpen, onClose, onAddHabit = () => {}, ...props
}) => {
  const [name, setName] = React.useState('');
  const [reminder, setReminder] = React.useState(1);
  const [frequency, setFrequency] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);

  const onSubmit = () => {
    const payload = {
      name, reminder, frequency, isPrivate,
    };
    onAddHabit(payload);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Habit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            bg={useColorModeValue('gray.50', 'gray.800')}
            px={{
					  base: '4',
					  md: '10',
            }}
            rounded="lg"
            py="16"
          >
            <Stack as="section" spacing="6" {...props}>
              <Input
                mt={2}
                id="Goal"
                placeholder="Name of Goal"
                _placeholder={{
							  color: useColorModeValue('gray.600', 'gray.400'),
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                mt={2}
                id="DaysUntilReminder"
                placeholder="Days Until Reminder"
                _placeholder={{
							  color: useColorModeValue('gray.600', 'gray.400'),
                }}
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />
              <FormControl id="frequency" mt={2}>
                <Select size="md" onChange={(e) => setFrequency(e.target.value)}>
                  <option>Daily</option>
                  <option>Every other day</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </Select>
              </FormControl>
              <FormControl display="flex" alignItems="center" mt="4" value={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}>
                <FormLabel flex="1" fontSize="md" mb="0">
                  Make this Goal Private
                </FormLabel>
                <Switch id="email-news" />
              </FormControl>
              <Button
                mt="5"
                size="sm"
                fontWeight="normal"
                isFullWidth
                fontSize="lg"
                fontWeight="bold"
                colorScheme="blue"
              >
                Record your WHY
              </Button>
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onSubmit}>Add Habit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddHabits;
