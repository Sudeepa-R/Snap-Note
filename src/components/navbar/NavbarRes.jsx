import React, { useContext, useEffect, useRef, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import './navbar.css';
import logo from '../../assets/notebook3.png'
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../../context/notes/noteContext';

const Menu = () => (
    <>
        <p><Link to="/" className='links'>Home</Link></p>
        <p><Link to="/about" className='links'>About</Link></p>
        {localStorage.getItem('auth-token')
            ? <p><Link to='/addnote' className='links'>Create Note</Link></p>
            : ''
        }
    </>
)

const Navbar = (props) => {
    const context = useContext(noteContext);
    const { user, getUser } = context;

    const refClose = useRef(null);
    const { showAlert } = props

    const [toggleMenu, setToggleMenu] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('auth-token');
        navigate('/login')
        await showAlert('Loged out Successfully', 'success')
        setTimeout(() => {
            setToggleMenu(!toggleMenu);
        }, 440);
    }

    const handleClose = () => {
        setTimeout(() => {
            setToggleMenu(!toggleMenu);
        }, 440);
    }
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getUser();
        }
    }, [])



    return (
        <div className="note__navbar">
            <div className="note__navbar-links">
                <div className="note__navbar-links_logo" style={{ display: 'flex' }}>
                    <img src={logo} alt="Logo" />
                    <h3 className='logo' style={{ cursor: 'pointer' }} onClick={() => navigate('/')} >Snap-Note</h3>
                </div>
                <div className="note__navbar-links_container">
                    <Menu />
                </div>
            </div>

            <div className="note__navbar-sign">
                {!localStorage.getItem('auth-token')
                    ? <>
                        <p onClick={() => navigate('/login')}>Log in</p>
                        <button type='button' onClick={() => navigate('/signup')}>Sign up</button>
                    </>
                    : <button onClick={handleLogout} role='button' className='primary-button'>Log Out</button>
                }
            </div>
            {localStorage.getItem('auth-token') && <div className="note__navbar-profile">
                <Link to='/user'>
                    <div className='note__navbar-profile_circle' >
                        <img src='https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' alt="profilePic" />
                    </div>
                </Link>
            </div>}
            <div className="note__navbar-menu">
                {
                    toggleMenu
                        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} ref={refClose} />
                        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <div className="note__navbar-menu_container scale-up-center">
                        <div className="note__navbar-menu_container-links">
                            <p><Link to="/" className='links' onClick={handleClose}>Home</Link></p>
                            <p><Link to="/about" className='links' onClick={handleClose}>About</Link></p>
                            {localStorage.getItem('auth-token') &&
                                <p><Link to='/addnote' className='links' onClick={handleClose}>Create Note</Link></p>
                            }
                        </div>
                        <div className="note__navbar-menu_container-links-sign">
                            {!localStorage.getItem('auth-token')
                                ? <>
                                    <p onClick={() => {
                                        navigate('/login')
                                        setTimeout(() => {
                                            setToggleMenu(!toggleMenu);
                                        }, 440);
                                    }}>Log in</p>
                                    <button type='button' onClick={() => {
                                        navigate('/signup')
                                        setTimeout(() => {
                                            setToggleMenu(!toggleMenu);
                                        }, 440);
                                    }}>Sign up</button>
                                </>
                                : <button onClick={handleLogout} role='button' className='primary-button'>Log Out</button>
                            }
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar