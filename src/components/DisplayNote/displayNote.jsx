import React from 'react'
import './displayNote.css'
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

const DisplayNote = (item) => {  

    return (
        <div className="display">
            {item.item.title !== undefined ?
                <div className="addNote" style = {{ backgroundColor : item.item.color }}>
                    <div className="notes1" >
                        <div className="title pds">
                                {item.item.title}
                        </div>
                        <div className='note pds'>
                                {item.item.description}
                        </div>
                    </div>
                        <div className="toolbar1">
                            <IconButton aria-label="Remind me" edge="start">
                                <AddAlertOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton aria-label="Collaborator">
                                <PersonAddOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton aria-label="Change color">
                                <ColorLensOutlinedIcon fontSize="small" />
                            </IconButton>
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
                </div> :
                null
            }
        </div>
    );

}

export default DisplayNote