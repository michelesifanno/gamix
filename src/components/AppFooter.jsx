import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const footerStyle = {
  backgroundColor: '#222',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
  bottom: '0',
  width: '100%',
};

const linkStyle = {
  color: '#fff',
  marginRight: '10px',
  textDecoration: 'none',
  fontSize: '12px',
};

export default function Footer() {
  return (
    <Box sx={footerStyle}>
      <Typography variant="body2" color="inherit" sx={{ fontWeight: '700', letterSpacing: '-0.5px' }}>
        &copy; 2023 Gamix Hub Project
      </Typography>
      <div>
        <Link href="#" target="_blank" rel="noopener" underline="hover" sx={linkStyle}>
          Privacy Policy
        </Link>
        <Link href="#" target="_blank" rel="noopener" underline="hover" sx={linkStyle}>
          Terms of Service
        </Link>
        <Link href="#" target="_blank" rel="noopener" underline="hover" sx={linkStyle}>
          Contact Us
        </Link>
      </div>
    </Box>
  );
}
