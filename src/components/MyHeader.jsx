import React from 'react'
import '../Style/MyHeader.css'
import { Navigate, useNavigate } from 'react-router-dom'

function MyHeader() {
  const navigate=useNavigate()
  return (
    <header className='container'
    >
      <div className='icon'>
        <h2>GymBro</h2>
      </div>
      <div className='buttons'>
        <button className='btn' onClick={()=>{(navigate("/"))}}>Статьи</button>
        <button className='btn' onClick={()=>{(navigate("/sportpit"))}}>Спортивное Питание</button>
        <button className='btn' onClick={()=>{(navigate("/products"))}}>Спорт Товары</button>
        <button className='btn' onClick={()=>{(navigate("/videos"))}}>Видео</button>
      </div>
    </header>
  )
}



export default MyHeader