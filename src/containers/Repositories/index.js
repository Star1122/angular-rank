import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
  },
}));

function Repositories() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      Repositories
    </Box>
  );
}

export default Repositories;
