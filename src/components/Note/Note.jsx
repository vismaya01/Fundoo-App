import React, { useState, useEffect } from 'react';
import NewNote from '../NewNote/NewNote';
import DisplayNote from '../DisplayNote/displayNote';
import Service from '../../sevices/NoteServices';

const services = new Service()

export default function Note(props) {
    const [noteList, setNoteList] = useState([]);

    const getNote = () => {
        services.getNoteList(localStorage.getItem("userToken"))
            .then((res) => {
                setNoteList(res.data.data.data.filter(item => item.isDeleted === false && item.isArchived === false 
                    && (item.title.includes(props.search) || item.description.includes(props.search))).reverse());
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getNote()
    }, []);

    return (
        <>
            <NewNote GetNote={getNote} />
            <DisplayNote item={noteList} GetNote={getNote} />
        </>
    )
}