import React, { useContext, useEffect, useRef, useState } from 'react'
import NotesItem from './NotesItem';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BarLoader from 'react-spinners/BarLoader'


const Notes = (props) => {
  const context = useContext(noteContext);

  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const { id, etitle, edescription, etag } = note;

  const { showAlert } = props;

  const [loading, setLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem('auth-token')
    if (!authToken) {
      window.location.href = '/login';
    } else {
      getNotes() //render notes
    }
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const handleClickAdd = async () => {
    setUpdateLoading(true)
    await editNote(id, etitle, edescription, etag)
    setUpdateLoading(false)
    refClose.current.click()
    await showAlert('Note Updated Successfully', 'success')
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }



  return (
    <>
      <button className="primary-button my-3" onClick={() => navigate('/addnote')}>Click here to Add Notes</button>
      <h2 className='text-white'>Your Notes</h2>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog"
          style={{ border: '1px solid white' }}>
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  value={note.etitle}
                  type="text"
                  className="form-control bg-dark text-white"
                  id="etitle"
                  required
                  name="etitle"
                  onChange={onChange}
                  style={{ border: '1px solid white' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <textarea
                  value={note.edescription}
                  className="form-control bg-dark text-white"
                  id="edescription"
                  required
                  name="edescription"
                  rows={3}
                  onChange={onChange}
                  style={{ border: '1px solid white' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  value={note.etag}
                  type="text"
                  className="form-control tags bg-dark text-white"
                  id="etag"
                  name="etag"
                  onChange={onChange}
                  style={{ border: '1px solid white' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="primary-button bgDim"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={etitle.length < 5 || edescription.length < 5} type="button" className="primary-button" onClick={handleClickAdd}>
                {updateLoading
                  ? (<Icon icon="svg-spinners:3-dots-scale-middle" fontSize={27} />)
                  : 'Update Note'}
              </button>
            </div>
          </div>
        </div>
      </div >
      <div className="row my-3">
        <h1 className='text-center' style={{ color: 'gray' }}>{notes.length === 0 && ' Please Add Notes to Display here!!'}</h1>
        {
          Array.isArray(notes) && notes.map((note) => {
            return <NotesItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} setLoading={setLoading} />
          })
        }
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', position: 'relative', top: '-27rem' }}>
          <div className="loading-screen" style={{
            zIndex: 100, height: '10vh', width: '20%', color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
          }}>
            <h1>Deleting...</h1 >
            <BarLoader color="red" />
          </div >
        </div>
      ) : ''}
    </>
  )
}

export default Notes