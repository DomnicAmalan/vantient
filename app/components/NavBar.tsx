import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AppNavBar: React.FC<React.PropsWithChildren> = (props) => {
  const router = useRouter()
  return (
    <>
    <Box sx={{ flexGrow: 1, mb: 10  }}>
      <AppBar sx={{ backgroundColor: 'white', boxShadow: 0.3 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => router.push('/')}
          >
            <Image 
              src={require('@/assets/brandlogo.png')}
              alt='Logo'
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000' }}>
            Vantient 
          </Typography>
          <Link 
            href={'/addwebsite'}
          >
            <Button
              sx={{ backgroundColor: '#D09CFA' }}
              startIcon={<AddIcon />}
            >
            Add New Websites
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    {props?.children}
    </>
  );
}

export default AppNavBar