import React, { useState, useRef } from 'react'
import Header from './Header'
import {checkValidData} from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addUser} from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [formError, setFormError] = useState('')

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignIn = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleBtnclick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        console.log(message)
        if(message) return;

        if(!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value
                })
                .then(() => {
                    const {uid, email, displayName} = auth.currentUser;
                    dispatch(addUser({uid, email, displayName}))
                })
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        } else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('test ', user)
                navigate('/browse')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setFormError(error.message)
            });
        }
    }

    return (
        <div>
            <Header/>
            <div className='absolute'>
                <img
                className='w-screen h-screen object-cover'
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='w-full md:w-1/4 absolute p-12 bg-black mx-auto right-0 left-0 my-36 text-white bg-opacity-50'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? 'Sign In': 'Sign Up'}</h1>
                {!isSignInForm && <input type="text" ref={name} placeholder='Full name' className='p-4 my-4 w-full bg-gray-700'/>}
                <input ref={email} type="text" placeholder='Email id' className='p-4 my-4 w-full bg-gray-700'/>
                <input ref={password} type="password" placeholder='Password' className='p-4 my-4  w-full bg-gray-700'/>
                <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleBtnclick}>{isSignInForm ? 'Sign In': 'Sign Up'}</button>
                <span className='text-red-500'>{formError}</span>
                <p onClick={toggleSignIn} className='my-2 cursor-pointer'>{isSignInForm ? 'New to netflix? Sign up now?' : 'Already Registred? Sign In'}</p>
            </form>
        </div>
    )
}

export default Login

