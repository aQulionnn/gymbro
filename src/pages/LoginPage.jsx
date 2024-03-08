import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ marginTop: "150px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;