import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextTruncation from './TextTruncation';
import { useNavigate } from 'react-router-dom';

export default function MyPost(props) {
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(props)
  }, [])
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          component='img'
          sx={{ height: 160 }}
          image={'https://localhost:7209/api/File/'+props.photo}
          title={props.title}
        />
        <CardContent sx={{paddingBottom: '0'}}>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <TextTruncation text={props.text} maxLength='150'/>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color='primary' onClick={() => navigate(`/post/${props.id}`)}>
            Читать
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

