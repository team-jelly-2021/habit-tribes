import { Button, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { Card } from './Card'
import { HeadingGroup } from './HeadingGroup'

export const DangerZone = (props) => (
  <Stack as="section" spacing="6" {...props}>
    <Card>
      <Text fontWeight="bold">Delete account and data</Text>
      <Text fontSize="sm" mt="1" mb="3">
        Once you delete your user, there is no going back. Please be certain.
      </Text>
      <Button size="sm" colorScheme="red">
        Delete account
      </Button>
    </Card>
  </Stack>
)
