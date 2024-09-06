import React from 'react';
import { useNavigate } from 'react-router-dom';  // Para navegação
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
import Logo from '../../assets/logo.png';

const pages = ['HOME', 'LOGIN', 'CADASTRO', 'CONVERSOR', 'COMANDOS'];
const settings = ['PERFIL', 'Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();  // Hook para navegação

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

  // Função para navegação
  const handleNavigate = (page) => {
    switch (page) {
      case 'HOME':
        navigate('/');
        break;
      case 'LOGIN':
        navigate('/login');
        break;
      case 'CONVERSOR':
          navigate('/conversor');
          break;
      case 'COMANDOS':
            navigate('/escolher-comando');
            break;
      case 'CADASTRO':
        navigate('/cadastro');
        break;
      default:
        navigate('/');
        break;
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#ffffff' }}>
      <Container maxWidth="xl" sx={{ bgcolor: '#ffffff' }}>
        <Toolbar disableGutters>

          {/* Logo à esquerda */}
          <Box sx={{ flexGrow: 1 }}>
            <img src={Logo} alt="Logo" style={{ width: "90px", height: "90px" }} />
          </Box>

          {/* Menu de navegação à direita para telas maiores */}
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}  // Chamando navegação
                sx={{ my: 2, color: '#000000' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Menu hambúrguer para dispositivos móveis */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#0095BA' }} />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
