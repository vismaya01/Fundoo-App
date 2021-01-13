import React, { useState } from 'react'
import './displayIcons.css';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Service from '../../sevices/NoteServices'

const services = new Service()

const DisplayIcons = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick1 = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorE2(null);
    };

    const handleTrashNotes = (value) => {
        let data = {
            noteIdList: [props.item.id], isDeleted: value
        }
        services.trashNotes(data, localStorage.getItem("userToken")).then(res => {
            console.log(res)
            setAnchorEl(null);
            props.GetNote();
        }).catch(err => {
            console.log(err);
        })
    }

    const handleDeleteNotes = () => {
        let data = {
            noteIdList: [props.item.id]
        }
        services.deleteNotes(data, localStorage.getItem("userToken")).then(res => {
            console.log(res)
            setAnchorEl(null);
            props.GetNote();
        }).catch(err => {
            console.log(err);
        })
    }

    const handleArchiveNotes = (value) => {
        if (props.id !== '') {
            let data = {
                noteIdList: [props.item.id], isArchived: value
            }
            services.archiveNotes(data, localStorage.getItem("userToken")).then(res => {
                console.log(res)
                props.GetNote();
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const updateColor = (value) => {
        if (props.id !== '') {
            props.setBgColor(value);
            let data = {
                noteIdList: [props.id], color: value
            }
            services.updateColor(data, localStorage.getItem("userToken")).then(res => {
                console.log(res)
                props.GetNote();
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            props.setBgColor(value);
        }
    }

    const DATA = [
        { title: "Default", id: "#fff" },
        { title: "Red", id: "#f28b82" },
        { title: "orange", id: "#fbbc04" },
        { title: "yellow", id: "#fff475" },
        { title: "green", id: "#ccff90" },
        { title: "Teal", id: "#a7ffeb" },
        { title: "Blue", id: "#a7ffeb" },
        { title: "Dark Blue", id: "#aecbfa" },
        { title: "purple", id: "#d7aefb" },
        { title: "pink", id: "#fdcfe8" },
        { title: "Brown", id: "#e6c9a8" },
        { title: "Gray", id: "#e8eaed" },
    ];

    return (
        <div className="tools">
            {props.trash ?
                <>
                    <IconButton aria-label="Delete forever" onClick={() => { handleDeleteNotes() }}>
                        <DeleteForeverOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Restore" onClick={() => { handleTrashNotes(!props.item.isDeleted) }}>
                        <RestoreFromTrashOutlinedIcon fontSize="small" />
                    </IconButton>
                </>
                :
                <>
                    <IconButton aria-label="Remind me" edge="start">
                        <AddAlertOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Collaborator">
                        <PersonAddOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Change color"
                        onClick={handleClick1} >
                        <ColorLensOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorE2}
                        keepMounted
                        open={Boolean(anchorE2)}
                        onClose={handleClose1}>
                        <div className="color-change">
                            {DATA.map((item) => (
                                <button onClick={() => { updateColor(item.id) }}
                                    className="button-color"
                                    style={{ backgroundColor: item.id }} />
                            ))}
                        </div>
                    </Menu>
                    <IconButton aria-label="Add image">
                        <ImageOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Archive note" onClick={() => { handleArchiveNotes(!props.item.isArchived) }}>
                        {props.archive ? <UnarchiveOutlinedIcon fontSize="small" /> : <ArchiveOutlinedIcon fontSize="small" />}
                    </IconButton>
                    <IconButton aria-label="More" onClick={handleClick}>
                        <MoreVertOutlinedIcon fontSize="small" />
                    </IconButton>
                    {props.noTrash ? null :
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem onClick={() => { handleTrashNotes(!props.item.isDeleted) }}>Delete Note</MenuItem>
                        </Menu>
                    }
                </>
            }
        </div>
    )
}

export default DisplayIcons