import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
  },
}));

function Contributors() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      Contributors
    </Box>
  );
}

export default Contributors;
