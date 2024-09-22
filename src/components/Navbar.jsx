import { useState } from 'react';
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
import { Link } from "react-router-dom";

const Navbar = () => {

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
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                        Task Management
                    </Typography>

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
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >

                            {/* <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link to="/tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Dashboard
                    </Link>
                  </Typography>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link to="/tasks/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Settings
                    </Link>
                  </Typography>
                </MenuItem> */}
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/tasks" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <Typography sx={{ textAlign: 'center', width: '100%' }}>
                                        Dashboard
                                    </Typography>
                                </Link>
                            </MenuItem>

                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/tasks/settings" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <Typography sx={{ textAlign: 'center', width: '100%' }}>
                                        Settings
                                    </Typography>
                                </Link>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                        Task Management
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                component={Link}
                                to="/tasks"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Dashboard
                            </Button>
                            <Button
                                component={Link}
                                to="/tasks/settings"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Settings
                            </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to="/tasks" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        <Typography sx={{ textAlign: 'center', width: '100%' }}>
                                            Dashboard
                                        </Typography>
                                    </Link> 
                                </MenuItem>

                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/tasks/settings" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        <Typography sx={{ textAlign: 'center', width: '100%' }}>
                                            Settings
                                        </Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/tasks/settings" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        <Typography sx={{ textAlign: 'center', width: '100%' }}>
                                            Logout
                                        </Typography>
                                    </Link>
                                </MenuItem>


                            {/* const settings = ['Dashboard', 'Settings', 'Logout']; */}

{/* <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/tasks" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <Typography sx={{ textAlign: 'center', width: '100%' }}>
                                        Dashboard
                                    </Typography>
                                </Link>
                            </MenuItem> */}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar