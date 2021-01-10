import React, { useState } from 'react'
import './displayIcons.css';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Service from '../../sevices/NoteServices'

const services = new Service()

const DisplayIcons = (props) => {
    const [color, setColor] = useState(false)
    const [showColorList, setShowColorList] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    let Bgcolor = props.color

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTrashNotes = () => {
        let data = {
            noteIdList: [props.item.id], isDeleted: true
        }
        services.trashNotes(data, localStorage.getItem("userToken")).then(res => {
            console.log(res)
            setAnchorEl(null);
            props.GetNote();
        }).catch(err => {
            console.log(err);
        })
    }

    const handleArchiveNotes = () => {
        if (props.id !== '') {
            let data = {
                noteIdList: [props.item.id], isArchived: true,
            }
            services.archiveNotes(data, localStorage.getItem("userToken")).then(res => {
                console.log(res)
                props.GetNote();
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const updateColor = () => {
        if (props.id !== '') {
            let data = {
                noteIdList: [props.id], color : Bgcolor
            }
            services.updateColor(data, localStorage.getItem("userToken")).then(res => {
                console.log(res)
                props.GetNote();
            }).catch(err => {
                console.log(err);
            })
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

    const selectColor = (value) => {
        props.setBgColor(value);
        Bgcolor=value;
    };

    const handleColor = () => {
        setColor(true)
    }

    const handleColorOut = () => {
        setColor(false)
    }

    return (
        <div className="tools">
            <IconButton aria-label="Remind me" edge="start">
                <AddAlertOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Collaborator">
                <PersonAddOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Change color"
                onClick={() => { handleColor(); setShowColorList(!showColorList) }}>
                <ColorLensOutlinedIcon fontSize="small" />
            </IconButton>
            {showColorList ? (
                <div className={color ? "visible color-change" : "NV color-change"}
                    onMouseOver={handleColor} onMouseOut={handleColorOut} style={{ width: 150, height: 125 }}>
                    {DATA.map((item) => (
                        <button onMouseOver={handleColor} onClick={() => { selectColor(item.id); updateColor() }}
                            className="button-color"
                            style={{ backgroundColor: item.id }}
                        ></button>
                    ))}
                </div>
            ) : null}
            <IconButton aria-label="Add image">
                <ImageOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Archive note"  >
                <ArchiveOutlinedIcon fontSize="small" onClick={handleArchiveNotes} />
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
                    <MenuItem onClick={handleTrashNotes}>Delete Note</MenuItem>
                </Menu>
            }
        </div>
    )
}

export default DisplayIcons