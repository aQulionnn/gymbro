import React from 'react'
import cl from '..//Style/MyVideo.module.css'

export default function MyVideo(props) {
  return (
    <div className={cl.container}>
      <h2 className={cl.title}>{props.title}</h2>
      <video
        controls
        autoPlay 
        poster="https://assets.codepen.io/6093409/river.jpg"
      >
        <source
          src={'https://localhost:7209/api/Tutorial/'+props.id}
          type="video/mp4"
        />
      </video>
      <h3 className={cl.description}>{props.desc}</h3>
    </div>
  )
}