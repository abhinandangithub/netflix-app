import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesResucer from './moviesSlice';
import gptSlice from './gptSlice';
import configSlice from './configSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesResucer,
        gpt: gptSlice,
        config: configSlice
    },

})

export default appStore;
