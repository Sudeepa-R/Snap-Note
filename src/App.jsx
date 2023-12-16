import './App.css';
import { Home, About, Alert, AddNotes, NavbarRes } from '../src/components'
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from '../src/components/login/Login'
import Signup from '../src/components/signup/Signup'
import User from './components/User';


function App() {
  if (!navigator.onLine) {
    alert('Please check your internet connection')
  }

  const [alert, setAlert] = useState(null)
  const showAlert = (msg, type) => {
    setAlert({
      msg, type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1800);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavbarRes showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />}>
              </Route>
              <Route path="/about" element={<About />}>
              </Route>
              {localStorage.getItem('auth-token') &&
                <Route path="/addnote" element={<AddNotes showAlert={showAlert} />
                }>
                </Route>}
              <Route path="/login" element={<Login showAlert={showAlert} />}>
              </Route>
              <Route path="/signup" element={<Signup showAlert={showAlert} />}>
              </Route>
              {
                localStorage.getItem('auth-token') &&
                <Route path="/user" element={<User />}>
                </Route>
              }
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
