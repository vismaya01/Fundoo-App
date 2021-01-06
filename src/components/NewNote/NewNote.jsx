import React, { useState } from 'react'
import './NewNote.css';
import FilledPin from '../assets/filledpin.svg'
import OutlinedPin from '../assets/outlinedpin.svg'
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button'
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

export default function NewNote() {
    const [open, setOpen] = useState(true);
    const [pin, setPin] = useState(false)
    const [color, setColor] = useState(false)
    const [bgColor, setBgColor] = useState('')
    const [showColorList, setShowColorList] = useState(false);

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
        setBgColor(value);
    };

    const handleClick = () => {
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(true)
    }

    const handlePin = () => {
        setPin(true)
    }

    const handleColor = () => {
        setColor(true)
    }

    const handleColorOut = () => {
        setColor(false)
    }

    return (<div className="notes">
        {open ?
            <div className="contain container" >
                <div className="note" onClick={handleClick}>Take a note...</div>
                <IconButton><CheckBoxOutlinedIcon /></IconButton>
                <IconButton> <BrushIcon /></IconButton>
                <IconButton> <ImageOutlinedIcon /></IconButton>
            </div> :
            <div className="contain container1" style={{backgroundColor: bgColor}}>
                <div className="note1" >
                    <div className="title pd">
                        <InputBase placeholder='Title' fullWidth />
                        <IconButton onClick={handlePin}>
                            <img src={pin ? FilledPin : OutlinedPin} alt='pin' />
                        </IconButton>
                    </div>
                    <div className='note pd'>
                        <InputBase placeholder='Take a note...' fullWidth />
                    </div>
                </div>
                <div className="toolbar">
                    <div className="tools">
                        <IconButton aria-label="Remind me" edge="start">
                            <AddAlertOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="Collaborator">
                            <PersonAddOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="Change color"
                            onMouseOver={() => { handleColor(); setShowColorList(!showColorList) }} onMouseOut={handleColorOut}>
                            <ColorLensOutlinedIcon fontSize="small" />
                        </IconButton>
                        {showColorList ? (
                            <div className={color ? "visible color-change" : "NV color-change"}
                                onMouseOver={handleColor} style={{ width: 150, height: 125 }}>
                                {DATA.map((item, index) => (
                                    <button onMouseOver={handleColor} onClick={() => selectColor(item.id)}
                                        key={index}
                                        className="button-color"
                                        style={{ backgroundColor: item.id}}
                                    ></button>
                                ))}
                            </div>
                        ) : null}
                        <IconButton aria-label="Add image">
                            <ImageOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="Archive note">
                            <ArchiveOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="More">
                            <MoreVertOutlinedIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <div className="close-button">
                        <Button size="small" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </div>

        }
    </div>
    );

}

