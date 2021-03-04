import React from 'react';
import { useSelector } from 'react-redux';
import { AutoSizer, List } from 'react-virtualized';
// import { createSelector } from 'reselect';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
  },
  item: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  userInfo: {
    marginLeft: '1rem',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    lineHeight: 1.5,

    '& p': {
      marginRight: '0.5rem',
    },
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
}));

function Contributors() {
  const classes = useStyles();

  const contributors = useSelector(
    (state) => (state.main.organizations.angular || [])
      .reduce((data, repo) => {
        (repo.contributors || []).forEach((contributor) => {
          const index = data.findIndex((cont) => cont.id === contributor.id);
          if (index === -1) {
            data.push({
              ...contributor,
              aContributions: 1,
            });
          } else {
            data[index].aContributions += 1;
          }
        });
        return data;
      }, [])
      .sort((a, b) => b.aContributions - a.aContributions),
  );

  console.log(contributors);
  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => (
    <Box key={key} className={classes.item} style={style}>
      <img
        src={contributors[index].avatar_url}
        className={classes.logo}
        alt={contributors[index].login}
      />
      <Box className={classes.userInfo}>
        <Box className={classes.userName}>
          <Typography>UserId:</Typography>
          <a href={contributors[index].html_url} target="_blank" rel="noreferrer">
            {contributors[index].login}
          </a>
        </Box>
        <Typography>{`Contributions: ${contributors[index].aContributions}`}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box className={classes.container}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={contributors.length}
            rowHeight={80}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </Box>
  );
}

export default Contributors;
