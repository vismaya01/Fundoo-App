import React, { useState, useEffect } from 'react';
import DisplayNote from '../DisplayNote/displayNote';
import Service from '../../sevices/NoteServices';

const services = new Service()

export default function Trash() {
    const [trashNote, setTrashNote] = useState([]);
    let trash = true;
    
    const getTrashNote = () => {
        services.getTrashNoteList(localStorage.getItem("userToken"))
            .then((res) => {
                setTrashNote(res.data.data.data.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTrashNote()
    }, []);

    return (
        <>
            <DisplayNote item={trashNote} GetNote={getTrashNote} trash={trash} />
        </>
    )
}