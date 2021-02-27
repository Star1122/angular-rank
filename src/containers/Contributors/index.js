import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
  },
}));

function Contributors() {
  const classes = useStyles();

  const angularData = useSelector((state) => state.main.organizations.angular);
  console.log(angularData);

  return (
    <Box className={classes.container}>
      Contributors
    </Box>
  );
}

export default Contributors;
