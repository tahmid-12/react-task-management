import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/features/taskSlice';
import PropTypes from 'prop-types';

const DeleteTask = ({ taskId, taskTitle }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(taskId)); 
    handleClose(); 
  };

  return (
    <>
      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={handleClickOpen}>
        Delete
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Delete Task: ${taskTitle}?`}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            {`This action cannot be undone. Are you sure you want to delete the task titled "${taskTitle}"?`}
        </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteTask.propTypes = {
    taskId: PropTypes.number.isRequired,     
    taskTitle: PropTypes.string.isRequired,  
  };

  
export default DeleteTask;