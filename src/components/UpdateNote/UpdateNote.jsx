import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import DisplayIcons from '../DisplayIcons/DisplayIcons';
import Service from '../../sevices/NoteServices'
// import './UpdateNote'

const services = new Service()

const UpdateNote = (props) => {
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [Bgcolor, setColor] = useState();

    useEffect(() => {
        setTitle(props.item.title);
        setId(props.item.id);
        setColor(props.item.color);
        setDescription(props.item.description)
    }, [props])

    const updateNote = () => {
        let formData = new FormData();
        formData.set("noteId", id)
        formData.set("title", title);
        formData.set("description", description);
        services.updateNotes(formData, localStorage.getItem("userToken")).then(res => {
            console.log(res)
            props.GetNote()
            props.close()
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Dialog onClose={props.close} aria-labelledby="simple-dialog-title" open={props.open}>
            <div className="update container1" style={{ backgroundColor: Bgcolor }}>
                <div className="note1" >
                    <div className="title pd">
                        <InputBase type="text" placeholder='Title' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='note pd'>
                        <InputBase type="text" placeholder='Take a note...' fullWidth value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="toolbar">
                    <DisplayIcons GetNote={props.GetNote} setBgColor={setColor} color={Bgcolor} id={props.item.id} />
                    <div className="close-button">
                        <Button size="small" onClick={() => { updateNote() }}>Close</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default UpdateNote