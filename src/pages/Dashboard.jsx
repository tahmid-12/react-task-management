import { useEffect, useState,useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/features/taskSlice';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import DeleteTask from '../components/DeleteTask ';
import CreateDialog from "../components/CreateDialog";

// const CreateDialog = React.lazy(() => import("../components/CreateDialog"));
// const DeleteTask = React.lazy(() => import("../components/DeleteTask "));

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
        <div className="flex justify-between items-center mb-4">
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
            Create
          </Button>

          <div className="flex items-center space-x-4">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border rounded p-1"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded p-1"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="border rounded p-1"
            >
              <option value="title">Sort by Title</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="status">Sort by Status</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded p-1"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                    <td className="px-4 py-2" style={{ textDecoration }}>{row.due_date}</td>
                    <td className="px-4 py-2" style={{ textDecoration }}>{row.priority}</td>
                    <td className="px-4 py-2">{row.status}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        {/* Hide Edit button if task is completed */}
                        {!isCompleted && (
                          <Link to={`/tasks/task/edit/${row.id}`}>
                            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                              Edit
                            </button>
                          </Link>
                        )}
                        {/* Delete Task button */}
                        <DeleteTask taskId={row.id} taskTitle={row.title} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Box>
      {/* CreateDialog */}
      <CreateDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Container>
  );
};

export default Dashboard;