import { useState } from 'react';
import CreateDialog from "../components/CreateDialog"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const initialRows = [
  { title: 'Frozen yoghurt', dueDate: '2024-09-30', priority: 'High', status: 'Pending' },
  { title: 'Ice cream sandwich', dueDate: '2024-10-05', priority: 'Medium', status: 'In Progress' },
  { title: 'Eclair', dueDate: '2024-09-25', priority: 'Low', status: 'Completed' },
  { title: 'Cupcake', dueDate: '2024-09-20', priority: 'High', status: 'Pending' },
  { title: 'Gingerbread', dueDate: '2024-10-10', priority: 'Medium', status: 'Completed' },
];

const Dashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Box mt={10}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}> Create</Button>

        <Box mt={4}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
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
                  {initialRows.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                      <td className="px-4 py-2">
                        <Link to={`/tasks/task/${row.id}`} className="text-blue-500 hover:underline">
                          {row.title}
                        </Link>
                      </td>
                      <td className="px-4 py-2">{row.dueDate}</td>
                      <td className="px-4 py-2">{row.priority}</td>
                      <td className="px-4 py-2">{row.status}</td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                        <Link to={`/tasks/task/edit/${row.id}`}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            Edit
                          </button>
                        </Link>  
                          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Box>
      </Box>
      {/* CreateDialog */}
      <CreateDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Container >
  )
}

export default Dashboard;