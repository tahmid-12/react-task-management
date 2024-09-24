import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; 

// Async Thunk for login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; 
});

// Async Thunk for register
export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data; 
});

// Initial state with error handling for JSON parsing
const initialState = {
  user: (() => {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      return null;
    }
  })(),
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');  
      localStorage.removeItem('token'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; 
        state.token = action.payload.token; 
        
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; 
        state.token = action.payload.token; 
        
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the logout action
export const { logout } = authSlice.actions;
export default authSlice.reducer;