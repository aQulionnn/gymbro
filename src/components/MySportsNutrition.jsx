import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import TextTruncation from './TextTruncation'

export default function MySportsNutrition(product) {
  return (
    <div>
      <Card sx={{ width: 345}}>
        <CardActionArea>
          <CardMedia
            sx={{height: 160}}
            image={'https://localhost:7209/api/File/'+product.photo}
            name={product.name}
          />
          <CardContent sx={{paddingBottom: '0'}}>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <TextTruncation text={product.desc} maxLength='150'/>
            </Typography>
            <Typography>
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color='primary'>
            Купить
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}