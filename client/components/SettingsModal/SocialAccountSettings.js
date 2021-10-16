import { Stack } from '@chakra-ui/react'
import { FaBitbucket, FaFacebook, FaGithub, FaGoogle, FaSpotify } from 'react-icons/fa'
import * as React from 'react'
import { Card } from './Card'
import { HeadingGroup } from './HeadingGroup'
import { SocialAccount } from './SocialAccount'

export const SocialAccountSettings = (props) => (
  <Stack as="section" spacing="6" {...props}>
    <HeadingGroup
      title="Connected accounts"
      description="Connect your Habit Tribes account to one or more providers"
    />
    <Card>
      <Stack spacing="5">
        <SocialAccount provider="Github" icon={FaGithub}  />
        <SocialAccount provider="Google" icon={FaGoogle} iconColor="red.500" />
        <SocialAccount provider="Facebook" icon={FaFacebook} iconColor="blue.500" />
      </Stack>
    </Card>
  </Stack>
)
