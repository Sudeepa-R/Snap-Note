import React, { useContext } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import noteContext from '../context/notes/noteContext';

const NotesItem = (props) => {

  const { showAlert, setLoading } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3 d-flex flex-wrap media-query">
      <div className="card" style={{ width: "18rem", boxShadow: '1px 1px 5px rgba(0,0,0,0.9)' }}>
        <div className="card-body">
          <div className="" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div className="">
              <h5 className="card-title">{note.title}</h5>
            </div>
            <div className="d-flex row-gap-1">
              <MdEdit color='blue' size={23} style={{ cursor: 'pointer' }} onClick={() => { updateNote(note) }} />
              <MdDelete color='red' size={23} style={{ cursor: 'pointer' }} onClick={async (e) => {
                setLoading(true)
                e.preventDefault()
                await deleteNote(note._id)
                setLoading(false)
                await showAlert('Note Deleted Successfully', 'success')
              }} />

            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary" style={{ opacity: '0.5' }}>{note.tag === '' ? '#genral' : `#${note.tag}`}</h6>
          <p className="card-text">
            {note.description}
          </p>

        </div>
      </div>
    </div>

  )
}

export default NotesItem