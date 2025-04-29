// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate }    from 'react-router-dom';
import {
  Box,
  Button,
  Card as MuiCard,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { signUp } from '../auth'; // your API helper

const PageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#005BBB',
  alignItems: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const Card = styled(MuiCard)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: 8,
}));

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name)            errs.name     = 'Required';
    if (!form.username)        errs.username = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (form.password.length < 6)         errs.password = 'Min 6 chars';
    if (form.password !== form.confirm)   errs.confirm  = 'Passwords must match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('🔔 handleSubmit fired', form);

    if (!validate()) {
      console.log('🔔 validation failed', errors);
      return;
    }

    try {
      console.log('🔔 calling signUp api…', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      const user = await signUp({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      console.log('✅ signUp response:', user);
      navigate('/sign-in');
    } catch (err) {
      console.error('❌ signUp error:', err);
      setErrors({ api: err.response?.data?.message || err.message });
    }
  };

  return (
    <>
      <CssBaseline />
      <PageContainer direction="column" spacing={2}>
        <Typography variant="h4" component="h1" color="common.white">
          Register your account
        </Typography>

        <Card elevation={3}>
          {errors.api && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {errors.api}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl error={!!errors.name} fullWidth>
              <TextField
                label="Name"
                name="name"
                placeholder="Enter your full name..."
                value={form.name}
                onChange={handleChange}
                helperText={errors.name}
                required
                fullWidth
              />
            </FormControl>

            <FormControl error={!!errors.username} fullWidth>
              <TextField
                label="Username"
                name="username"
                placeholder="Enter a username..."
                value={form.username}
                onChange={handleChange}
                helperText={errors.username}
                required
                fullWidth
              />
            </FormControl>

            <FormControl error={!!errors.email} fullWidth>
              <TextField
                label="Email address"
                name="email"
                type="email"
                placeholder="Enter your email address..."
                value={form.email}
                onChange={handleChange}
                helperText={errors.email}
                required
                fullWidth
              />
            </FormControl>

            <FormControl error={!!errors.password} fullWidth>
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password..."
                value={form.password}
                onChange={handleChange}
                helperText={errors.password}
                required
                fullWidth
              />
            </FormControl>

            <FormControl error={!!errors.confirm} fullWidth>
              <TextField
                label="Confirm Password"
                name="confirm"
                type="password"
                placeholder="Enter your password again..."
                value={form.confirm}
                onChange={handleChange}
                helperText={errors.confirm}
                required
                fullWidth
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#28a745',
                '&:hover': { backgroundColor: '#218838' },
                py: 1.5,
              }}
            >
              Sign up
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography align="center" variant="body2">
            Already have an account?{' '}
            <Link href="/Login">
              Login to redirect
            </Link>
            .
          </Typography>
        </Card>
      </PageContainer>
    </>
  );
}
