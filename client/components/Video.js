/* eslint-disable block-spacing */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-multiple-empty-lines */
import * as React from 'react';
import {
  Box,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import VideoRecorder from 'react-video-recorder';

window.Buffer = window.Buffer || require('buffer').Buffer;

const Video = ({ isOpen = () => {}, onClose = () => {}, handleAddVideo = () => {} }) => {
  const [blob, setBlob] = React.useState(null);

  const handleRecordingComplete = (blob) => {
    const blobObject = {
      blob,
      url: window.URL.createObjectURL(blob),
    };
    setBlob(blobObject);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Habit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box m="10">
            <Center>
              <Box
                bg="gray.200"
                shadow="base"
                borderRadius="2xl"
                p={{
                  base: '4',
                  md: '8',
                }}
              >
                <Box minWidth="460px" height="400" m={2}>
                  <Center>
                    <VideoRecorder
                      constraints={{
                        audio: true,
                        video: true,
                      }}
                      timeLimit={30000}
                      countdownTime={2000}
                      isOnInitially
                      onRecordingComplete={(blob) => handleRecordingComplete(blob)}
                      showReplayControls
                      replayVideoAutoplayAndLoopOff
                    />
                  </Center>
                  <Center>
                    <Button
                      m={2}
                      onClick={() => { handleAddVideo(blob); onClose(); }}
                    >
                      Add Video
                    </Button>
                  </Center>
                </Box>
              </Box>
            </Center>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default Video;
