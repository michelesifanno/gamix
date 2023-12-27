import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FiberNewTwoToneIcon from '@mui/icons-material/FiberNewTwoTone';
import LogoDevTwoToneIcon from '@mui/icons-material/LogoDevTwoTone';
import VideogameAssetTwoToneIcon from '@mui/icons-material/VideogameAssetTwoTone';
import DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';


function MainListItems() {

  const [open, setOpen] = useState(false);
  const location = useLocation();


  const isActive = (path) => location.pathname === path;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        component={NavLink}
        to="/"
        selected={isActive('/')}
        className={isActive('/') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <SportsEsportsTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Tutti i giochi" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/migliori"
        selected={isActive('/migliori')}
        className={isActive('/migliori') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <EmojiEventsTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Migliori" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/nuove-uscite"
        selected={isActive('/nuove-uscite')}
        className={isActive('/nuove-uscite') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <FiberNewTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Nuove Uscite" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/creatori"
        selected={isActive('/creatori')}
        className={isActive('/creatori') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <LogoDevTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Creators" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/piattaforme"
        selected={isActive('/piattaforme')}
        className={isActive('/piattaforme') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <DesktopWindowsTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Piattaforme" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/generi"
        selected={isActive('/generi')}
        className={isActive('/generi') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <VideogameAssetTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Generi" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/negozi"
        selected={isActive('/negozi')}
        className={isActive('/negozi') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <LocalGroceryStoreTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Negozi" />
      </ListItemButton>

    </>
  )
}


export default MainListItems
