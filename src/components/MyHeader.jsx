import React from 'react'
import cl from '../Style/MyHeader.module.css'
import {useNavigate } from 'react-router-dom'

function MyHeader() {
  const navigate=useNavigate()

  return (
    <header>
      <div className={cl.container}>
        <div className={cl.icon}>
          <h2 className={cl.title}>GymBro</h2>
        </div>
        <div className={cl.buttons}>
          <button className={cl.btn} onClick={()=>{(navigate("/"))}}>Статьи</button>
          <button className={cl.btn} onClick={()=>{(navigate("/sportpit"))}}>Спортивное Питание</button>
          <button className={cl.btn} onClick={()=>{(navigate("/products"))}}>Спорт Товары</button>
          <button className={cl.btn} onClick={()=>{(navigate("/videos"))}}>Видео</button>
        </div>
      </div>
      <div className={cl.line}></div>
    </header>
  )
}



export default MyHeader