import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase';
import {useDispatch} from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';
import { useSelector } from 'react-redux';
import {  signOut } from "firebase/auth";
import {LOGO} from '../utils/constant';
import {toggleGptSearchView} from '../utils/gptSlice';
import {SUPPORTED_LANGUAGES} from '../utils/constant';
import {changeLanguage} from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

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

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (event) => {
      dispatch(changeLanguage(event.target.value));
    }

    return (
    <div className='absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between flex flex-col  md:flex-row'>
        <img
            className='w-44 mx-auto md:mx-0'
            src={LOGO}
            alt="" />
            {user && <div className='flex g-3 justify-between md:justify-center items-center'>
              {showGptSearch && <select onChange={handleLanguageChange} className='p-2 m-2 bg-gray-900 text-white'>
                {SUPPORTED_LANGUAGES.map(lang => <option  key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
              </select>}
              <button className='py-2 px-4 my-2 mx-4 bg-purple-500 text-white rounded-lg bold' onClick={handleGptSearchClick}>{showGptSearch ? 'Home Page' : 'GPT Search'}</button>
              {/* <label className="font-bold text-white">{user?.displayName}</label> */}
              <buttton className="font-bold text-white hover:cursor-pointer" onClick={handleSignOut}>(Sign Out)</buttton>
            </div>}
    </div>
    )
}

export default Header