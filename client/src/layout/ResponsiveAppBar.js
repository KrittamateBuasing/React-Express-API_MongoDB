
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';
import {deleteCart} from '../store/cartSlice';

import { Link } from 'react-router-dom';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { ShoppingCartOutlined } from '@mui/icons-material';

import { Badge } from "antd";


const pages = [
    {
        title: 'Product', icon: '', to: '/'
    },
    {
        title: 'About us', icon: '', to: '/aboutus'
    }
    ,
    {
        title: 'Contract', icon: '', to: '/contract'
    },
   
]

const authen = [
    {
        title: 'Register', icon: <PeopleAltOutlinedIcon />, to: '/register'
    },
    {
        title: 'Login', icon: <LoginIcon />, to: '/login'
    }
]
const userMenu = [
    {
        title: 'cart', icon: <ShoppingCartOutlined />, to: '/Cart'
    },

]

const nonUserMenu = [
    {
        title: 'cart', icon: <ShoppingCartOutlined />, to: '/CartWithoutLogin'
    },

]

const settings = [
    {
        title: 'Profile', icon: '', to: '/Profile'
    },
    {
        title: 'Logout', icon: '', to: '#'
    }
]

function ResponsiveAppBar() {

    const { user,cart } = useSelector((state) => ({ ...state }))
   
    const dispatch = useDispatch();
    const navi = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        dispatch(deleteCart())
        handleCloseNavMenu()
        navi('/')
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#b5d1ed' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* LOGO */}
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                                               <IconButton>
                            <Link to={'/'}>
                            <Avatar  src="https://thumbs.dreamstime.com/b/cow-logo-icon-circle-vector-art-branding-excellence-cow-logo-icon-circle-vector-art-branding-excellence-320699694.jpg" />
                            </Link>
                        </IconButton>
                    </Typography>
                    {/* /LOGO */}

                    {/* Minimize Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: 'none' }}>
                                        <Typography textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}

                            {user.user.length === 0 && authen.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: 'none' }}>
                                        <Typography textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {user.user.length === 0 && authen.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: 'none' }}>
                                        <Typography textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            { userMenu.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: 'none' }}>
                                        <Typography textAlign="center">
                                            <Badge count={cart.length}>
                                                {page.title}
                                            </Badge>
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                             


                        </Menu>
                    </Box>
                    {/* /Minimize Menu */}

                    {/* LOGO Minimize */}
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        
                        <IconButton>
                            <Link to={'/'}>
                            <Avatar alt="Remy Sharp" src="https://thumbs.dreamstime.com/b/cow-logo-icon-circle-vector-art-branding-excellence-cow-logo-icon-circle-vector-art-branding-excellence-320699694.jpg" />
                            </Link>
                        </IconButton>
                        
                        
                    </Typography>
                    {/* /LOGO Minimize */}

                    {/* Menu Left Full */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', mr: 5 }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* /Menu Left Full */}

                    {/* Menu Right Full */}
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {user.user.length === 0 && authen.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'black', mr: 2,
                                    }}
                                    startIcon={page.icon}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                 
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {user.user.length !== 0 && userMenu.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'black', mr: 2,
                                    }}
                                    startIcon={page.icon}
                                >
                                    <Badge count={cart.length} offset={[13,1]}>
                                        {page.title}
                                    </Badge>
                                    
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {user.user.length == 0 && nonUserMenu.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'black', mr: 2,
                                    }}
                                    startIcon={page.icon}
                                >
                                    <Badge count={cart.length} offset={[13,1]}>
                                        {page.title}
                                    </Badge>
                                    
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* /Menu Right Full */}

                    {/* User Menu */}
                    {user.user.length !== 0 &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_9131529&psig=AOvVaw2uwSYCYjpVLvfxflVzEcL-&ust=1723027870199000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJiUl5WZ4IcDFQAAAAAdAAAAABAE" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={setting.title == "Logout" ? handleLogout : handleCloseUserMenu}>
                                        <Link to={setting.to} style={{ textDecoration: 'none' }}>
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    }
                    {/* /User Menu */}


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;