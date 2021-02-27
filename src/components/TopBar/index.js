import React, { useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MoonIcon from '@material-ui/icons/Brightness4';
import SunIcon from '@material-ui/icons/BrightnessHigh';

import { changeThemeAction } from 'store/actions/theme';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'flex-end',
  },
  link: {
    marginLeft: theme.spacing(2.5),
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  toggleButton: {
    marginLeft: theme.spacing(2),
  },
}));

function TopBar() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const toggleTheme = useCallback(
    () => dispatch(changeThemeAction(theme === 'light' ? 'dark' : 'light')),
    [dispatch, theme],
  );

  return (
    <Box className={classes.container}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/contributors" className={classes.link}>Contributors</Link>
          <Link to="/repositories" className={classes.link}>Repositories</Link>

          <Tooltip title="Toggle Theme">
            <IconButton
              className={classes.toggleButton}
              edge="end"
              color="inherit"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default withRouter(TopBar);
