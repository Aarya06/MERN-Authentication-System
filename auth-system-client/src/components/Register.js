import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userImage from "../assests/userImage.png"
import { USER_TYPE } from '../utils/constants';
import { isValidEmail, isValidPassword } from '../utils/validator';

const Register = ({ userType, redirect, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const handleEmailChange = ({ target: { value } }) => {
        setEmail(value)
        setError(null)
    }
    const handlePasswordChange = ({ target: { value } }) => {
        setPassword(value)
        setError(null)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!isValidEmail(email)){
            return setError('Email is Invalid! Please enter a valid email')
        }
        if(!isValidPassword(password)){
            return setError('Password too short! Please enter a password of atleast 8 characters')
        }
        onSubmit({email, password})
    }
    const resetState = () => {
        setPassword('');
        setEmail('')
    }
    useEffect(() => {
        resetState()
    }, [userType])

    return (
        <div className="align">
            <div className="grid align__item">
                <div className="register">
                    <img src={userImage} alt="user" />
                    <h2>{userType.label}</h2>

                    <form className="form" onSubmit={handleSubmit} noValidate>
                        <div className="form__field">
                            <input type="email" value={email} placeholder="info@mailaddress.com" onChange={handleEmailChange}/>
                        </div>
                        <div className="form__field">
                            <input type="password" value={password} placeholder="••••••••••••" onChange={handlePasswordChange} />
                        </div>
                        <div className="form__field">
                            <input type="submit" value={userType.label} />
                        </div>
                        {error && <p className="error">{error}</p>}
                    </form>

                    {
                        userType.value === USER_TYPE.SIGNUP.value ?
                            <p>Already have an account? <Link to={redirect}>Log in</Link></p> :
                            <p>Don't have an account? <Link to={redirect}>Sign Up</Link></p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Register