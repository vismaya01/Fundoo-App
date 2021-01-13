import React, { useState } from 'react'
import './displayNote.css'
import DisplayIcons from '../DisplayIcons/DisplayIcons'
import UpdateNote from '../UpdateNote/UpdateNote';

const DisplayNote = (props) => {
    const [note, setNote] = useState([])
    const [update, setUpdate] = useState(false)

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
                            <DisplayIcons item={item} id={item.id} GetNote={props.GetNote} archive={props.archive} trash={props.trash} />
                        </div>
                        </div>
                    </div>
            ))}
            <UpdateNote item={note} open={update} close={handleClose} GetNote={props.GetNote}/>
        </div>
    );
}

export default DisplayNote