import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../Style/LoginPage.module.css'
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    if (email === 'root' && password === 'root'){
      navigate('/admin')
    }
    e.preventDefault();
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <h1 className={style.login} align='center'>Login</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.user}>
            <input 
              type="text" 
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PersonIcon />
          </div>
          <div className={style.password}>
            <input 
              type="password" 
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LockIcon />
          </div>
          <button className={style.btn} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;