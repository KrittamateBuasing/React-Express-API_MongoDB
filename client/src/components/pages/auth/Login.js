import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CloudOff, Password } from '@mui/icons-material';

import { login } from '../../../Functions/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginRedux } from '../../../store/userSlice';
import { useLocation } from 'react-router-dom';
import { Toast } from 'bootstrap'


// Default theme
const defaultTheme = createTheme();

export default function Login() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const json = {
      name: data.get("name"),
      password: data.get("password"),
      email:data.get("email"),
      phone:data.get("phone"),
      userfile:data.get("userfile")
    }

    login(json)
      .then(res => {
        console.log(res.data.payload.user.name);
        
        alert('LOGIN SUCESS');
        dispatch(loginRedux({
          name: res.data.payload.user.name,
          role: res.data.payload.user.role,
          email:res.data.payload.user.email,
          phone:res.data.payload.user.phone,
          userfile:res.data.payload.user.userfile,
          token: res.data.token
        }));
        localStorage.setItem('token', res.data.token);
        roleRedirects(res.data.payload.user.role);
      })
      .catch(err  => { 
        alert(err.response.data);
        console.log(err.response.data) 
      })
  };
  const roleRedirects = (role) => {
    let intended = location.state


    if (intended) {
      navi('../'+intended)
    } else {
      if (role === 'admin') {
        navi('/admin/viewtable');
      } else {
        navi('/user/index');
      }
    }

    

  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/assets/wallpaper2.jpg)', // Use relative path if in public folder

            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
