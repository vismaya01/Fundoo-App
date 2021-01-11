import React, { useState } from 'react'
import './NewNote.css';
import FilledPin from '../assets/filledpin.svg'
import OutlinedPin from '../assets/outlinedpin.svg'
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Service from '../../sevices/NoteServices'
import DisplayIcons from '../DisplayIcons/DisplayIcons'

const services = new Service()

const NewNote = (props) => {
    const [open, setOpen] = useState(true);
    const [pin, setPin] = useState(false)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [bgColor, setBgColor] = useState('#fff')
    const noTrash = true
    const id = ''

    const handleClick = () => {
        setOpen(false)
    }

    const handlePin = () => {
        setPin(true)
    }

    const saveNote = () => {
        if (title !== '') {
            let formData = new FormData();
            formData.set("title", title);
            formData.set("description", description);
            formData.set("color", bgColor);
            services.saveNotes(formData, localStorage.getItem("userToken")).then(res => {
                console.log(res)
                props.GetNote()
                setBgColor('#fff')
                setTitle('')
                setDescription('')
            }).catch((err) => {
                console.log(err);
            });
        }
        setOpen(true)
    };

    return (<div className="notes">
        {open ?
            <div className="contain container" >
                <div className="note" onClick={handleClick}>Take a note...</div>
                <IconButton><CheckBoxOutlinedIcon /></IconButton>
                <IconButton> <BrushIcon /></IconButton>
                <IconButton> <ImageOutlinedIcon /></IconButton>
            </div> :
            <div className="contain container1" style={{ backgroundColor: bgColor }}>
                <div className="note1" >
                    <div className="title pd">
                        <InputBase placeholder='Title' fullWidth multiline onChange={(e) => setTitle(e.target.value)} />
                        <IconButton onClick={handlePin}>
                            <img src={pin ? FilledPin : OutlinedPin} alt='pin' />
                        </IconButton>
                    </div>
                    <div className='note pd'>
                        <InputBase placeholder='Take a note...' fullWidth multiline
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="toolbar">
                    <DisplayIcons setBgColor={setBgColor} noTrash={noTrash} id={id}/>
                    <div className="close-button">
                        <Button size="small" onClick={() => { saveNote() }}>Close</Button>
                    </div>
                </div>
            </div>
        }
    </div>
    );
}

export default NewNote

