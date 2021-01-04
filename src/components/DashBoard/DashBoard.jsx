import React, { useState } from 'react';
import './DashBoard.css';
import logo from '../assets/logo.png'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Delete from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import Refresh from '@material-ui/icons/Refresh'
import AppIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

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
  const [color, setColor] = useState(false);
  const [keyValue, setKeyValue] = useState(false);
  const [hide, setHide] = useState(false)

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
    setColor(true);
    setKeyValue(value);
  }

  const handleHideAccount = () => {
    setHide(!hide)
  }

  const handleUnHideAccount = () => {
    setHide(false)
  }

  return (<div className='Content' >
    <div className="header-content">
      <div className="row-head  row-head1" onClick={handleUnHideAccount}>
        <Toolbar>
          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            aria-label="open drawer"
            edge="start"
            className={clsx({
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <img className='logo' src={logo} alt='img' />
        <div className="name">Fundoo</div>
      </div>
      <div className="row-head  row-head2" onClick={handleUnHideAccount}>
        <div className="search" >
          <IconButton>
            <SearchIcon />
          </IconButton>
          <div className="input">
            <StylesProvider injectFirst>
              <TextField placeholder="Search" fullWidth variant='outlined' />
            </StylesProvider>
          </div>
          <IconButton className='clear-icon'>
            <ClearIcon />
          </IconButton>
        </div>
        <div className="row-icons">
          <IconButton>
            <Refresh />
          </IconButton>
          <IconButton onClick={handleViewOpen} >
            {view ? <AppIcon /> : <ListIcon />}
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="row-head row-head3">
        <IconButton>
          <AppIcon />
        </IconButton>
        <IconButton onClick={handleHideAccount}>
          <AccountCircleIcon fontSize='large' />
        </IconButton>
      </div>
      <div className={hide ? "true profile" : "false profile"} >
        <div className="person">

        </div>
      </div>
    </div>
    <div className="main-content" onClick={handleUnHideAccount}>
      <div className="column-content">
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
          <List>
            <ListItem button onClick={() => { handleClass('Notes'); handleDrawerOpen() }}
              className={color && keyValue === 'Notes' ? 'pink' : 'white'} key='Notes'>
              <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
              <ListItemText>Notes</ListItemText>
            </ListItem>
            <ListItem button onClick={() => { handleClass('Reminder'); handleDrawerOpen() }}
              className={color && keyValue === 'Reminder' ? 'pink' : 'white'} key='Reminder'>
              <ListItemIcon><NotificationsNoneOutlinedIcon /></ListItemIcon>
              <ListItemText>Reminder</ListItemText>
            </ListItem>
            <ListItem button onClick={() => { handleClass('Edit'); handleDrawerOpen() }}
              className={color && keyValue === 'Edit' ? 'pink' : 'white'} key='Edit'>
              <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
              <ListItemText>Edit labels</ListItemText>
            </ListItem>
            <ListItem button onClick={() => { handleClass('Archive'); handleDrawerOpen() }}
              className={color && keyValue === 'Archive' ? 'pink' : 'white'} key='Archive'>
              <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
              <ListItemText>Archive</ListItemText>
            </ListItem>
            <ListItem button onClick={() => { handleClass('Delete'); handleDrawerOpen() }}
              className={color && keyValue === 'Delete' ? 'pink' : 'white'} key='Delete'>
              <ListItemIcon><Delete /></ListItemIcon>
              <ListItemText>Trash</ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
      <div className="main">

      </div>
    </div>
  </div>
  );
}