import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import Heading from './atoms/Heading'

const UserCompanyDetails = ({user}) => {
  return (
    <Card sx={{ mb: 3 }}>
    <CardContent>
      <Heading variant="h5">Company Details</Heading>
      <Typography variant="body1">
        <b>Company Name:</b> {user.company?.name}
      </Typography>
      <Typography variant="body1">
        <b>Position:</b> {user.company?.title}
      </Typography>
      <Typography variant="body1">
        <b>Department:</b> {user.company?.department}
      </Typography>
      <Typography variant="body1">
        <b>Address:</b> {user.company?.address?.city},{" "}
        {user.company?.address?.country}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default UserCompanyDetails