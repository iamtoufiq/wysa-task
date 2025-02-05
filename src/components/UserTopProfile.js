import React from 'react'
import Body2Text from './atoms/Body2Text'
import { Card, CardContent } from '@mui/material'
import Body1Text from './atoms/Body1Text'
import Heading from './atoms/Heading'

const UserTopProfile = ({user}) => {
  return (
    <Card sx={{ mb: 3 }}>
    <CardContent>
      <Heading variant="h5">{`${user.firstName} ${user.lastName}`}</Heading>
      <Body1Text color="text.secondary">{user.company?.title}</Body1Text>
      <Body2Text color="text.secondary">
        {`${user.address?.city}, ${user.address?.state}, ${user.address?.country}`}
      </Body2Text>
    </CardContent>
  </Card>
  )
}

export default UserTopProfile