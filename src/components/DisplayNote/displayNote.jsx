import React, { useState } from 'react'
import './displayNote.css'
import DisplayIcons from '../DisplayIcons/DisplayIcons'
import UpdateNote from '../UpdateNote/UpdateNote';

const DisplayNote = (props) => {
    const [bgColor, setBgColor] = useState("#fff")
    const [note, setNote] = useState([])
    const [update, setUpdate] = useState(false)
    const onArchive = true

    const handleUpdate = (value) => {
        setUpdate(true)
        setNote(value)
    }

    const handleClose = () => {
        setUpdate(false)
    }

    return (        
        <div className="display-note">
            {props.item.map((item) => (
                    <div className="addNote"  style={{ backgroundColor: item.color}}>
                        <div className="notes1" onClick={() => handleUpdate(item)}>
                            <div className="pds">
                                {item.title}
                            </div>
                            <div className='pds'>
                                {item.description}
                            </div>
                        </div>
                        <div className="tool">
                        <div className="toolbar1">
                            <DisplayIcons setBgColor={setBgColor} item={item} id={item.id} GetNote={props.GetNote} noArchive={onArchive} />
                        </div>
                        </div>
                    </div>
            ))}
            <UpdateNote item={note} open={update} close={handleClose} GetNote={props.GetNote}/>
        </div>
    );
}

export default DisplayNote