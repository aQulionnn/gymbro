import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import cl from '../Style/MyHeader.module.css'

function HeaderAdmin() {
    const navigate = useNavigate();
  return (
    <header>
      <div className={cl.container}>
        <div className={cl.icon}>
          <h2 className={cl.title} onClick={() => {(navigate("/admin/"))}}>GymBro<span className={cl.title_admin}> admin</span></h2>
        </div>
        <div className={cl.buttons}>
          <button className={cl.btn} onClick={()=> {(navigate("/admin/"))}}>Статьи</button>
          <button className={cl.btn} onClick={()=> {(navigate("/admin/sportpit"))}}>Спортивное Питание</button>
          <button className={cl.btn} onClick={()=> {(navigate("/admin/products"))}}>Спорт Товары</button>
          <button className={cl.btn} onClick={()=> {(navigate("/admin/videos"))}}>Видео</button>
        </div>
      </div>
      <div className={cl.line_admin}></div>
    </header>
  )
}

export default HeaderAdmin