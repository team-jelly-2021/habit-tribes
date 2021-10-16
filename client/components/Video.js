import React from 'react'
import { Box, Button, Center, useColorMode } from '@chakra-ui/react';
import VideoRecorder from 'react-video-recorder'

window.Buffer = window.Buffer || require('buffer').Buffer;

const Video = () => {

  // finshing adding logic too components for different color
const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Box m="10">
      <Center>
        <Box
          bg={'gray.700'}
          shadow="base"
          borderRadius="2xl"
          p={{
            base: '4',
            md: '8',
          }}
        >
          <Box minWidth="400px" height="640" m={2}>
            <Center>
              <VideoRecorder
                // chunkSize={250}
                constraints={{
                  audio: true,
                  video: true,
                }}
                timeLimit={30000}
                countdownTime={2000}
                // dataAvailableTimeout={500}
                // isFlipped
                isOnInitially
                // onError={function noRefCheck(){}}
                onRecordingComplete={(blob) => {
                  console.log(blob, 'video blob')
                  console.log('Blob object url', window.URL.createObjectURL(blob))
                }}
                showReplayControls
                replayVideoAutoplayAndLoopOff
              />
            </Center> 
            <Center>
              <Button m={2} onClick={()=> { console.log('Invokes function to send blow to s3 bucket') }}>Add Video</Button>
              </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};
export default Video;
