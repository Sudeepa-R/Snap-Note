import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'https://backend-chi-eight-74.vercel.app'
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    // users 
    const userInitial = [];
    const [user, setUser] = useState(userInitial);

    //get user detail
    const getUser = async () => {
        // api call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json()
        setUser(json)
    }

    //get Notes note
    const getNotes = async () => {
        // api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    //add note
    const addNote = async (title, description, tag) => {
        // api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        setNotes(notes.concat(note)) // add note
    }

    //delete note
    const deleteNote = async (id) => {
        // api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = response.json()

        //delete note(logic)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //edit note
    const editNote = async (id, title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()

        let newNotes = JSON.parse(JSON.stringify(notes))
        //edit note (logic)
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, getUser, user }}>
            {props.children}
        </noteContext.Provider>
    )

}
export default NoteState;