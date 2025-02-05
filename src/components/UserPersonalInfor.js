import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import Heading from './atoms/Heading'

const UserPersonalInfor = ({user}) => {
  return (
    <Card sx={{ mb: 3 }}>
    <CardContent>
      <Heading variant="h5">Personal Info</Heading>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <b>Email:</b> {user.email}
          </Typography>
          <Typography variant="body1">
            <b>Gender:</b> {user.gender}
          </Typography>
          <Typography variant="body1">
            <b>Age:</b> {user.age}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <b>Blood Group:</b> {user.bloodGroup}
          </Typography>
          <Typography variant="body1">
            <b>Weight:</b> {user.weight}
          </Typography>
          <Typography variant="body1">
            <b>Height:</b> {user.height}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  )
}

export default UserPersonalInfor