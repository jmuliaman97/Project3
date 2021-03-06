import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    whiteSpace: 'nowrap',
    width: '100%',
    borderRadius: '0'
  },
  item:
  {
    flex: 0.5,
    margin: '5px 0px 5px 0px',
    overflow: 'hidden !important',
    whiteSpace: "nowrap",
  },
  title:
  {
    textAlign: 'center',
    fontWeight: 'bold',
    fontstyle: 'italic',
    fontSize: 20,
  }
}));

export default function TopBid({ topBid }) {

  const classes = useStyles();

  const handleOnclick = () => {
   
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <div >
        <ThemeProvider  >
          <Typography variant='h5' className={classes.title}>Top Bid</Typography>
        </ThemeProvider>
        {
          topBid ?
            <ListItem
              className={classes.item} onClick={handleOnclick}>
              <ListItemIcon >
                {topBid.photos ? <Avatar alt={topBid.photos[0]}
                  src={topBid.photos[0]}
                  className={classes.bigAvatar} /> : null }
              </ListItemIcon>

              <ListItemText
                primary={`${topBid.user ? `${topBid.user.firstName}
                  ${topBid.user.lastName}` : ''}`}
                secondary={`${topBid.description}`}
              />

            </ListItem>
            :
            <ListItem
              className={classes.item}
              style={{ textAlign: 'center', fontStyle: 'italic' }}
              onClick={handleOnclick}
            >
              <ListItemText primary="NONE" />
            </ListItem>

        }


      </div>
    </Paper>
  );
}