import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';


function FixedBottomNavigation() {

  return (
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Tutti i giochi" icon={<VideogameAssetIcon />} />
          <BottomNavigationAction label="Piattaforme" icon={<VideogameAssetIcon />} />
          <BottomNavigationAction label="Genere" icon={<VideogameAssetIcon />} />
          <BottomNavigationAction label="Altro" icon={<VideogameAssetIcon />} />
        </BottomNavigation>
  );
}

export default FixedBottomNavigation;