import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Replace with your API endpoint

// Async thunk to create a new task
export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Include token in the request
  });
  return response.data;
});

// Async thunk to fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Ensure this returns an array of tasks
});

// Async thunk to fetch task by ID
export const fetchTaskById = createAsyncThunk('tasks/fetchTaskById', async (id) => {
  const response = await axios.get(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
});

// Async thunk to update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await axios.put(`${API_URL}/tasks/${task.id}`, task, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return id; 
});

// Task slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    task: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create task
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload); // Add the new task to the tasks array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload; // Assuming the payload is an array of tasks
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch single task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Update task in the state
        }
        state.task = action.payload; // Store the updated task in state
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;