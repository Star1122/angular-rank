import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import Box from '@material-ui/core/Box';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { lightTheme, darkTheme } from 'theme';
import { loadThemeAction } from 'store/actions/theme';
import { install } from 'store/actions/main';
import Routes from 'routes';
import TopBar from 'components/TopBar';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    height: 'calc(100vh - 56px)',
    padding: theme.spacing(2),
    boxSizing: 'border-box',

    '@media (min-width:0px) and (orientation: landscape)': {
      height: 'calc(100vh - 48px)',
    },

    '@media (min-width:600px)': {
      height: 'calc(100vh - 64px)',
    },
  },
}));

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(loadThemeAction());
    dispatch(install('angular'));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Router>
          <TopBar />

          <Box className={classes.container}>
            <PerfectScrollbar>
              <Routes />
            </PerfectScrollbar>
          </Box>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
