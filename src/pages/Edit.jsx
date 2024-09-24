import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskById, updateTask  } from '../store/features/taskSlice';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';


const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, status, error } = useSelector((state) => state.tasks);
  
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [statusField, setStatusField] = useState('');

  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.due_date);
      setPriority(task.priority);
      setStatusField(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { id, title, due_date: dueDate, priority, status: statusField };
    dispatch(updateTask(updatedTask)).then(() => {
      navigate('/tasks'); // Redirect to dashboard after update
    });
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <button 
        onClick={handleBack} 
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
      <h2 className="text-2xl mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block">Status:</label>
          <select
            value={statusField}
            onChange={(e) => setStatusField(e.target.value)}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Task
        </button>
      </form>
    </div>
  );
}

export default Edit