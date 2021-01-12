import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import logo from '../assets/logo.png'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Delete from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Refresh from '@material-ui/icons/Refresh'
import AppIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Avatar, Toolbar, List, IconButton, Button, InputBase, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Switch, Route } from 'react-router-dom'
import Note from '../Note/Note'
import Trash from '../Trash/Trash'
import Archive from '../Archive/Archive'
import { Link } from 'react-router-dom'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function DashBoard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [keyValue, setKeyValue] = useState(false);
  const [hide, setHide] = useState(false)
  const [search, setSearch] = useState('')
  let userData = JSON.parse(localStorage.getItem("userData"))
  let history = useHistory();
  let userEmail = ''
  let userFirstName = ''
  let userLastName = ''

  if (userData !== null) {
    userData.map((item) => (
      (userEmail = item.email),
      (userFirstName = item.firstName),
      (userLastName = item.lastName)
    ))
  }

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const handleViewOpen = () => {
    setView(!view);
  }

  const handleClass = (value) => {
    setKeyValue(value);
  }

  const handleHideAccount = () => {
    setHide(!hide)
  }

  const handleUnHideAccount = () => {
    setHide(false)
  }

  useEffect(() => {
    handleClass('Notes')
    history.push("/dashBoard/notes");
  }, [])

  return (<div className='Content' >
    <div className="header-content">
      <div className="row-head1" onClick={handleUnHideAccount}>
        <Toolbar>
          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            aria-label="open drawer"
            edge="start">
            <MenuIcon onClick={() => { handleClass('Notes') }} />
          </IconButton>
        </Toolbar>
        <img className='logo' src={logo} alt='img' />
        <div className="name">Fundoo</div>
      </div>
      <div className="row-head2" onClick={handleUnHideAccount}>
        <div className="search" >
          <IconButton>
            <SearchIcon />
          </IconButton>
          <div className="input">
            <InputBase placeholder="Search" fullWidth onChange={(e) => { setSearch(e.target.value) }} />
          </div>
          <IconButton className='clear-icon'>
            <ClearIcon />
          </IconButton>
        </div>
        <div className="row-icons">
          <IconButton>
            <Refresh />
          </IconButton>
          <IconButton className='App-icon' onClick={handleViewOpen} >
            {view ? <AppIcon /> : <ListIcon />}
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="row-head3">
        <IconButton>
          <AppIcon />
        </IconButton>
        <IconButton onClick={handleHideAccount}>
          <AccountCircleIcon fontSize='large' />
        </IconButton>
      </div>
      <div className={hide ? "true profile" : "false profile"} >
        <div className="person">
          <div className="avatarContainer">
            <Avatar className="avatarIcon" alt='profile' />
          </div>
          <div className='name' style={{ fontSize: 20 }}>
            {userFirstName} {userLastName}
          </div>
          <div className='name' style={{ fontSize: 15 }}>
            {userEmail}
          </div>
        </div>
        <div className="cardActions">
          <Button variant="contained" onClick={() => {
            handleLogout()
          }}>Logout</Button>
        </div>
      </div>
    </div>
    <div className="main-content" onClick={handleUnHideAccount}>
      <Drawer variant="permanent"
        className={clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <List onMouseOver={handleDrawerOpen} onMouseOut={handleDrawerClose}>
          <ListItem button component={Link} to="/dashBoard/notes" onClick={() => { handleClass('Notes') }}
            className={keyValue === 'Notes' ? 'pink' : 'white'} key='Notes'>
            <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
            <ListItemText>Notes</ListItemText>
          </ListItem>
          <ListItem button onClick={() => { handleClass('Reminder') }}
            className={keyValue === 'Reminder' ? 'pink' : 'white'} key='Reminder'>
            <ListItemIcon><NotificationsNoneOutlinedIcon /></ListItemIcon>
            <ListItemText>Reminder</ListItemText>
          </ListItem>
          <ListItem button onClick={() => { handleClass('Edit') }}
            className={keyValue === 'Edit' ? 'pink' : 'white'} key='Edit'>
            <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </ListItem>
          <ListItem button onClick={() => { handleClass('Archive') }}
            component={Link} to="/dashBoard/archives"
            className={keyValue === 'Archive' ? 'pink' : 'white'} key='Archive'>
            <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </ListItem>
          <ListItem button onClick={() => { handleClass('Delete') }}
            component={Link} to="/dashBoard/trashes"
            className={keyValue === 'Delete' ? 'pink' : 'white'} key='Delete'>
            <ListItemIcon><Delete /></ListItemIcon>
            <ListItemText>Trash</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <div className="main">
        <Switch>
          <Route exact path="/dashBoard/notes" component={() => <Note search={search} />} />
          <Route exact path="/dashBoard/trashes" component={Trash} />
          <Route exact path="/dashBoard/archives" component={Archive} />
        </Switch>
      </div>
    </div>
  </div>
  );
}