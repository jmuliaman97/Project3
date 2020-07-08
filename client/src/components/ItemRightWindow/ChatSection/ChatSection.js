import React, { useEffect, useRef } from 'react';
import { useWindowScroll } from 'react-use'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: '1',
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    behavior : 'smooth'
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  item:
  {
    flex: 0.5,
    border: "1px",
    borderRadius: "5px",
    marginBottom: '5px',
  }
}));

export default function ChatSection({ messages , input }) {

  const classes = useStyles();
  const commentSection = useRef(null)

  useEffect(()=>
  {
    scrollToMyRef()
  }
  ,[messages])

  const scrollToMyRef = () => {
    const scroll =
    commentSection.current.scrollHeight -
    commentSection.current.clientHeight;
    commentSection.current.scrollIntoView(0, scroll);
  };
//test
  return (
    <>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}  
    >
    
        {messages.map(message =>
        <ListItem>

          <Avatar alt="Remy Sharp" src="https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg" className={classes.bigAvatar} />


          <ListItemText primary={`${message.user.firstName} ${message.user.lastName}`} secondary={`${message.body}`} />
        </ListItem>
      )    
      }
      <div ref={commentSection}/>
    </List>

</>
  );
}