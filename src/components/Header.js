import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase';
import {useDispatch} from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';
import { useSelector } from 'react-redux';
import {  signOut } from "firebase/auth";
import {LOGO} from '../utils/constant';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const {uid, email, displayName} = user;
            dispatch(addUser({uid, email, displayName}))
            navigate("/browse")
          } else {
            dispatch(removeUser())
            navigate("/")
          }
        });
        return () => unsubscribe();

    }, [dispatch, navigate]);

      const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }

    return (
    <div className='absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img
            className='w-44'
            src={LOGO}
            alt="" />
            {user && <div className='flex g-3'>
              <label className="font-bold text-white">{user?.displayName}</label>
              <buttton className="font-bold text-white" onClick={handleSignOut}>(Sign Out)</buttton>
            </div>}
    </div>
    )
}

export default Header