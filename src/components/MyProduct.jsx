import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import TextTruncation from './TextTruncation'

export default function MyProduct(props) {
  return (
    <div>
      <Card sx={{width: 345}}>
        <CardMedia 
          sx={{height: 160}}
          image={'https://localhost:7209/api/File/'+props.photo}
          name={props.name}
        />
        <CardContent sx={{paddingBottom: '0'}}>
          <Typography gutterBottom variant='h5' component="div">
            {props.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <TextTruncation text={props.desc} maxLength='150'/>
          </Typography>
          <Typography >
            {props.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color='primary'>
            Купить
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

