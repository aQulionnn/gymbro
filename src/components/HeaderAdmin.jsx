import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function HeaderAdmin() {
    const navigate = useNavigate();
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>

          </Typography>
          <List component="nav" aria-labelledby="main navigation" sx={{ display: 'flex', justifyContent: 'center' }}>
            <ListItem button onClick={()=>{(navigate("/admin/"))}}>
              <ListItemText primary="Статьи" />
            </ListItem>
            <ListItem button onClick={()=>{(navigate("/admin/sportpit"))}}>
              <ListItemText primary="Спортивное Питание" />
            </ListItem>
            <ListItem button onClick={()=>{(navigate("/admin/products"))}}>
              <ListItemText primary="Спорт Товары" />
            </ListItem>
            <ListItem button onClick={()=>{(navigate("/admin/videos"))}}>
              <ListItemText primary="Видео" />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
  )
}

export default HeaderAdmin