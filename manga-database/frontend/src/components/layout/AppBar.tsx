import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider
} from '@mui/material';
import {
  AccountCircle,
  Menu as MenuIcon,
  Home,
  Bookmark,
  Favorite,
  Settings,
  Logout
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

interface AppBarProps {
  onMenuClick: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <MuiAppBar position="static" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          📚 Manga Database
        </Typography>
        
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              startIcon={<Home />}
              sx={{ mr: 1 }}
            >
              Browse
            </Button>
            
            <Button
              color="inherit"
              startIcon={<Bookmark />}
              sx={{ mr: 1 }}
            >
              My Lists
            </Button>
            
            <Button
              color="inherit"
              startIcon={<Favorite />}
              sx={{ mr: 2 }}
            >
              Favorites
            </Button>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={isMenuOpen ? 'primary-search-account-menu' : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <AccountCircle sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Settings sx={{ mr: 1 }} />
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/register">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
