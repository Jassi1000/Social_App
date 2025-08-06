// src/components/MyForm.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import { useAuthStore } from '../Store/auth';

const Signup = () => {
  const {signUp} = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
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
    signUp(formData);
    console.log("Form submitted:", formData);
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
            label="Name"
            name="username"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            required
          />
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
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Signup;
