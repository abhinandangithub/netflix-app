import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesResucer from './moviesSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesResucer
    },

})

export default appStore;
