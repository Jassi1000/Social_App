import React from 'react';
import react, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import { useAuthStore } from '../Store/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => { 
    const {login} = useAuthStore();

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log("Form data updated:", formData);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Call the signUp function from the auth store
    await login(formData);
    console.log("Form submitted:", formData);
    navigate('/dashboard'); // Redirect to dashboard after login
    console.log("Redirecting to dashboard");
    // Add your form logic here
  };
    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Registration Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="text"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Login 
          </Button>
        </Stack>
      </Box>
    </Paper>
    )
}
export default Login;