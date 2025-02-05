import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, CssBaseline, Grid, Paper, Tabs, Tab, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { UserList } from './components/UserList';
import UserDetailsTab from './components/UserDetailsTab';
import TodoTab from './components/TodoTab';
import { useStore } from './store/store';
import { theme } from './theme';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import BackDrop from './components/BackDrop';

const queryClient = new QueryClient();

export default function App() {
  const { currentTab, setCurrentTab,loader, toggleDrawer ,drawerOpen} = useStore();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));



  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        {
          loader && <BackDrop/>
        }

        <Grid container sx={{ height: '100vh' }}>
          {/* Hamburger Button for smaller screens */}
          {isSmallScreen && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1000, // Make sure the button is above the content
              }}
              onClick={() => toggleDrawer(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Sidebar for larger screens, Drawer for smaller screens */}
          <Grid item xs={isSmallScreen ? 12 : 3} >
            {isSmallScreen ? (
              <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                  width: 340,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: 340,
                    boxSizing: 'border-box',
                    paddingInline:"16px",
                    paddingBlock:"20px"
                  },
                }}
              >
                <UserList />
              </Drawer>
            ) : (
              <Paper sx={{ height: '100%', p: 2 }}>
                <UserList />
              </Paper>
            )}
          </Grid>

          <Grid id="asfda" item xs={isSmallScreen ? 12 : 9} sx={{
    p: 3,
    ...(isSmallScreen && {
      position: "absolute",
      top: "10%",
      left: 0,
      width: "100%",
    }),
  }}>
            <Tabs id="asasdfasdfda" value={currentTab} onChange={(_, v) => setCurrentTab(v)}>
              <Tab id="asfdsadfasa" label="User Details" value="details" />
              <Tab id="asfdassfd" label="Todos" value="todos" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {currentTab === 'details' ? <UserDetailsTab /> : <TodoTab />}
            </Box>
          </Grid>
        </Grid>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
