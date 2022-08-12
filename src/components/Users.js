import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import usersAPI from '../services/userAPI';

const usersApi = new usersAPI();

export default function Users(props) {
  const { triggerAlert, users } = props;

  const deleteUser = async (id) => {
    try {
        await usersApi.deleteUser(id);
        triggerAlert("success", "User has been removed from CCS");
    } catch (err) {
        triggerAlert("error", err.message);
    }
  }

  return (
    <React.Fragment>
      <Title>Onboarded users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <Button startIcon={<DeleteIcon />} onClick={() => deleteUser(row._id)}/>
                  <Button endIcon={<EditIcon />}/>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}