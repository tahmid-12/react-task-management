import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/features/taskSlice';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import DeleteTask from '../components/DeleteTask ';
import CreateDialog from '../components/CreateDialog';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const filteredRows = useMemo(() => {
    return tasks
      .filter((row) => {
        return (
          (filterPriority ? row.priority === filterPriority : true) &&
          (filterStatus ? row.status === filterStatus : true)
        );
      })
      .sort((a, b) => {
        const fieldA = sortField === 'dueDate' ? new Date(a.dueDate) : a[sortField];
        const fieldB = sortField === 'dueDate' ? new Date(b.dueDate) : b[sortField];
        if (sortOrder === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      });
  }, [tasks, filterPriority, filterStatus, sortField, sortOrder]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="xl">
      <Box mt={10}>
        {/* Header and Filters */}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
  {/* Create Button */}
  <Grid item xs={12} md={3}>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleOpenDialog}
      fullWidth
    >
      Create
    </Button>
  </Grid>

  {/* Filters and Sort */}
  <Grid item xs={12} md={9}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border rounded p-1 w-full"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-1 w-full"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border rounded p-1 w-full"
        >
          <option value="title">Sort by Title</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded p-1 w-full"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </Grid>
    </Grid>
  </Grid>
</Grid>


        {/* Task Table */}
        <Box mt={3} className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const isCompleted = row.status === 'Completed';
                const textDecoration = isCompleted ? 'line-through' : 'none';

                return (
                  <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-100">
                    <td className="px-4 py-2">
                      <Link
                        to={`/tasks/task/${row.id}`}
                        className="text-blue-500 hover:underline"
                        style={{ textDecoration }}
                      >
                        {row.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2" style={{ textDecoration }}>
                      {new Date(row.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2" style={{ textDecoration }}>{row.priority}</td>
                    <td className="px-4 py-2">{row.status}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        {!isCompleted && (
                          <Link to={`/tasks/task/edit/${row.id}`}>
                            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                              Edit
                            </button>
                          </Link>
                        )}
                        <DeleteTask taskId={row.id} taskTitle={row.title} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>

      {/* CreateDialog */}
      <CreateDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Container>
  );
};

export default Dashboard;