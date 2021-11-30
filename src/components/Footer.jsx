import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="http://www.republiquedesmangues.fr/">
        Site de mentira
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (

      
      <Box
        component="footer"
        sx={{
            marginTop: '40%',
            position: 'sticky',
            boxShadow: 1,
            display: 'flex',
            alignItems: 'center',
          py: 3,
          px: 2,
          
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
         
        <Container maxWidth="sm">
          <Typography variant="body1">
            E-Commerce super seguro.
          </Typography>
          <Copyright />
        </Container>
        
      </Box>
      
  
  );
}
