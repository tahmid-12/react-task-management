import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskById } from '../store/features/taskSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Paper, Divider } from '@mui/material';
import { AccessTime, PriorityHigh, CheckCircle } from '@mui/icons-material';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector((state) => state.tasks.task);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTaskById(id));
    }
  }, [id, dispatch, status]);

  const formattedDueDate = useMemo(() => {
    return task ? new Date(task.due_date).toLocaleDateString() : '';
  }, [task]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleBack}>
        Back
      </Button>
      {task ? (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
          <Typography variant="h4" gutterBottom>
            {task.title}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="h6" gutterBottom>
            <AccessTime sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Due Date: {formattedDueDate}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <PriorityHigh sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Priority: {task.priority}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <CheckCircle sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Status: {task.status}
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" gutterBottom>
            {task.description}
          </Typography>
        </Paper>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
}

export default Details;