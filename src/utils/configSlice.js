import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
    name: 'gpt',
    initialState: {
        lang: 'en'
    },
    reducers: {
        changeLanguage: (state, action) => {
            console.log('test ', action)
             state.lang = action.payload;
        }
    }
});

export const { changeLanguage } = configSlice.actions
export default configSlice.reducer
