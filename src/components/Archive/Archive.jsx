import React, { useState, useEffect } from 'react';
import DisplayNote from '../DisplayNote/displayNote';
import Service from '../../sevices/NoteServices';

const services = new Service()

export default function Trash() {
    const [archiveNote, setArchiveNote] = useState([]);
    let archive = true;

    const getArchiveNote = () => {
        services.getArchiveNoteList(localStorage.getItem("userToken"))
            .then((res) => {
                setArchiveNote(res.data.data.data.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getArchiveNote();
    }, []);

    return (
        <>
            <DisplayNote item={archiveNote} GetNote={getArchiveNote} archive={archive} />
        </>
    )
}