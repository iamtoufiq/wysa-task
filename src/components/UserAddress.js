import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import Heading from './atoms/Heading'

const UserAddress = ({user}) => {
  return (
    <Card sx={{ mb: 3 }}>
        <CardContent>
          <Heading variant="h5">Address</Heading>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <b>Street:</b> {user.address?.address}
              </Typography>
              <Typography variant="body1">
                <b>City:</b> {user.address?.city}
              </Typography>
              <Typography variant="body1">
                <b>State:</b> {user.address?.state} ({user.address?.stateCode})
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <b>Postal Code:</b> {user.address?.postalCode}
              </Typography>
              <Typography variant="body1">
                <b>Country:</b> {user.address?.country}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}

export default UserAddress