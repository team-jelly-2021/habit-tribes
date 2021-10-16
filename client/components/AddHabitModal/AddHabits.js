/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-filename-extension */
import {
  Box,
  Button,
  Center,
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
  useDisclosure,
} from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { ClipLoader } from 'react-spinners';
import * as React from 'react';
import Video from '../Video';
import upload from '../../lib/uploadVideo';

const AddHabits = ({
  isOpen, onClose, onAddHabit = () => {}, ...props
}) => {
  const [name, setName] = React.useState('');
  const [reminder, setReminder] = React.useState(1);
  const [frequency, setFrequency] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [videoName, setVideoName] = React.useState(null);
  const { isOpen: videoIsOpen, onOpen: videoOnOpen, onClose: videoOnClose } = useDisclosure();
  const [uploadProgess, setUploadProgress] = React.useState(0);

  const handleAddVideo = async ({ blob }) => {
    const file = new File([blob], `${uuid()}.mp4`, { type: 'video/mp4', lastModified: Date.now() });
    setVideoName(file.name);
    try {
      await upload(file, (progress) => setUploadProgress(progress));
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = () => {
    const payload = {
      name,
      reminder,
      frequency,
      isPrivate,
      videoName,
    };
    onAddHabit(payload);
    onClose();
  };

  return (
    <>
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
                <FormControl
                  display="flex"
                  alignItems="center"
                  mt="4"
                  value={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                >
                  <FormLabel flex="1" fontSize="md" mb="0">
                    Make this Goal Private
                  </FormLabel>
                  <Switch id="email-news" />
                </FormControl>
                <Button
                  mt="5"
                  size="sm"
                  isFullWidth
                  fontSize="lg"
                  fontWeight="bold"
                  colorScheme="blue"
                  onClick={videoOnOpen}
                >
                  Record your WHY
                </Button>
                <div style={{ margin: '10px 0px' }}>
                  {!!uploadProgess
                    && (
                      <Center>
                        <ClipLoader
                          loading={uploadProgess && uploadProgess !== 100}
                          color="green"
                        />
                        <div>{!!uploadProgess === 100 && 'Complete!'}</div>
                      </Center>
                    )}
                </div>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onSubmit}>
              Add Habit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {!!videoIsOpen
        && (
        <Video
          isOpen={videoIsOpen}
          onClose={videoOnClose}
          handleAddVideo={handleAddVideo}
        />
        )}
    </>
  );
};

export default AddHabits;
