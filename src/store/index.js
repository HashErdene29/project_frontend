
import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


// Authentication
const initialAuthState = { isAuthenticated: false };

const authSlice = createSlice(
    {
        name: 'authentication',
        initialState: initialAuthState,
        reducers: {
            login(state, action) {
                const userCred = action.payload;
                console.log("user", Cookies.get('user'))
                if (Cookies.get('user') != null) {
                    state.isAuthenticated = true
                }
                else {
                    axios.post('http://localhost:8080/api/v1/authenticate', userCred)
                    .then(response => {
                        console.log('response', response)
                        Cookies.set('user', response.data.accessToken)
                        state.isAuthenticated = true
                        axios.defaults.headers.common = {
                            'Authorization': 'Bearer ' + response.data.accessToken
                        };
                    })
                    .catch(err => console.log(err.message))
                }


            },
            logout(state) {
                Cookies.remove('user')
                axios.defaults.headers.common = {
                    'Authorization': ''
                };
                state.isAuthenticated = false;
            },

        }

    }
);

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});


export const authActions = authSlice.actions;

export default store;
