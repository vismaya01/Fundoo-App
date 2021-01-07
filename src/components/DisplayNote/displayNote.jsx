import React, { useState } from 'react'
import './displayNote.css'
import DisplayIcons from '../DisplayIcons/DisplayIcons'

const DisplayNote = (item) => {
    const [bgColor, setBgColor] = useState('#fff')

    return (
        <div className="display">
            {item.item.title !== undefined ?
                <div className="addNote" style={{ backgroundColor: item.item.color, backgroundColor: bgColor }}>
                    <div className="notes1" >
                        <div className="title pds">
                            {item.item.title}
                        </div>
                        <div className='note pds'>
                            {item.item.description}
                        </div>
                    </div>
                    <div className="toolbar1">
                        <DisplayIcons setBgColor={setBgColor} />
                    </div>
                </div> :
                null
            }
        </div>
    );

}

export default DisplayNote