import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';


const AddNotes = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const { title, description, tag } = note;

    const [loading, setLoading] = useState(false)

    // props destructring 
    const { showAlert } = props;
    const navigate = useNavigate()

    const handleClickAdd = async (e) => {
        setLoading(true)
        e.preventDefault()
        await addNote(title, description, tag)

        await showAlert('Note Added Successfully', 'success')
        //this will clear input fields after adding note
        setNote({ title: "", description: "", tag: "" })
        setLoading(false)
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3' id='container'>
            <h2 className='text-white'>Add Notes</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label text-white">
                    Title
                </label>
                <input
                    value={note.title}
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    name="title"
                    onChange={onChange}
                    style={{ border: '1px solid black' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label text-white">
                    Description
                </label>
                <textarea
                    value={note.description}
                    className="form-control"
                    id="description"
                    required
                    name="description"
                    rows={3}
                    onChange={onChange}
                    style={{ border: '1px solid black' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label text-white">
                    Tag
                </label>
                <input
                    value={note.tag}
                    type="text"
                    className="form-control tags"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    style={{ border: '1px solid black' }}
                />
            </div>
            <div className="btns" style={{ marginTop: '40px' }}>
                <button disabled={title.length < 5 || description.length < 5} type="button" className="primary-button add-btn" onClick={handleClickAdd}>{loading ? (<Icon icon="svg-spinners:3-dots-scale-middle" fontSize={24} />) : 'Add Note'}</button>
                <button className="primary-button show-btn" type="button" onClick={() => navigate('/')}>Show Notes</button>
            </div>
        </div>
    )
}

export default AddNotes