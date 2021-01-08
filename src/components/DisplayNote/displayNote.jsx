import React, { useState } from 'react'
import './displayNote.css'
import DisplayIcons from '../DisplayIcons/DisplayIcons'

const DisplayNote = (props) => {
    const [bgColor, setBgColor] = useState('#fff')

    return (
        <div className="display-note">
            {props.item.filter(item => item.isDeleted === false).map((item) => (
                <div className="display">
                    <div className="addNote" style={{ backgroundColor: item.color }}>
                        <div className="notes1" >
                            <div className="title pds">
                                {item.title}
                            </div>
                            <div className='note pds'>
                                {item.description}
                            </div>
                        </div>
                        <div className="toolbar1">
                            <DisplayIcons setBgColor={setBgColor} item={item} GetNote={props.GetNote} />
                        </div>
                    </div>
                </div> 
            ))}
        </div>
    );
}

export default DisplayNote