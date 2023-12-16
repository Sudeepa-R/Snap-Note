import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';


const Login = (props) => {
    const host = 'https://backend-chi-eight-74.vercel.app';
    let navigate = useNavigate();
    const [cred, setCred] = useState({ email: '', password: '' });

    // props destructring 
    const { showAlert } = props

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            window.localStorage.setItem('auth-token', json.authtoken);//save the authtoken in local storage for tempararily
            showAlert('LogedIn Successfully', 'success')
            navigate('/')
        }
        else {
            showAlert('Invalid Inputs', 'danger');
        }
        setLoading(false);
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    //shwo password usestate
    const [password, setPassword] = useState(true);
    
    return (
        <div className='app__login'>
            <div className="app__login-container">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="inputs" >
                        <label htmlFor="email" className="form-label text-white">
                            Email address
                        </label>
                        <input
                            value={cred.email}
                            onChange={onChange}
                            type="email"
                            id="email"
                            name='email'
                            aria-describedby="emailHelp"
                            placeholder='example@gmail.com'
                            required />
                    </div>
                    <div className="inputs" >
                        <label htmlFor="password" className="form-label text-white">
                            Password
                        </label>
                        <input
                            value={cred.password}
                            onChange={onChange}
                            type={password ? 'password' : 'text'}
                            id="password"
                            name="password"
                            placeholder='password'
                            required />
                    </div>
                    <div className="showPass">
                        <label htmlFor='showPass' style={{ cursor: 'pointer' }}><input type="checkbox" name="showPass" style={{ cursor: 'pointer' }} id="showPass" onChange={() => setPassword(!password)} />Show Password </label>
                    </div>
                    <div className="btn">
                        <button type='submit'>{loading ? (<Icon icon="svg-spinners:3-dots-scale-middle" fontSize={41} />) : 'Login'}</button>
                    </div>
                    <div className="signUpLink">
                        <p>Don't have an account ? <b onClick={() => navigate('/signup')}>Register</b></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
