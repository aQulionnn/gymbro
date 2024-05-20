import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextTruncation from './TextTruncation';
import { useNavigate } from 'react-router-dom';
import style from '../Style/MyPost.module.css'

export default function MyPost(props) {
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(props)
  }, [])
  return (
    <div className={style.main}>
      <div className={style.top_section}>
        <h5>{props.title}</h5>
      </div>
      <img src={'https://localhost:7209/api/File/'+props.photo}/>
      <div className={style.bottom_section}>
        <TextTruncation text={props.text} maxLength='200' onClick={() => navigate(`/post/${props.id}`)}/>
      </div>
    </div>
  );
}

