import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const scliceName = 'user'
const initialState = {
    
  }

  export const loginUser = createAsyncThunk(
    `${scliceName}/login`,
    async ({ username, password }, thunkAPI) => {
      try {
        const response = await fetch(
          'https://backend-collection-01.herokuapp.com/api/auth/login/',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );
        let data = await response.json();
        console.log('response', data);
        if (response.status === 200) {
          localStorage.setItem('token', data.token);
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );
  
  export const fetchUserBytoken = createAsyncThunk(
    'users/fetchUserByToken',
    async ({ token }, thunkAPI) => {
      try {
        const response = await fetch(
          'https://mock-user-auth-server.herokuapp.com/api/v1/users',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        );
        let data = await response.json();
        console.log('data', data, response.status);
  
        if (response.status === 200) {
          return { ...data };
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        console.log('Error', e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );

const userSckice = createSlice({
    name:scliceName,
    initialState,
    reducers: {
        // Reducer comes here
    },
    extraReducers: {
         // Extra reducer comes here
    },
})