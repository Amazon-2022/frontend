import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


export default function Schemas(props) {
  const { triggerAlert, schemas } = props;

  return (
    <React.Fragment>
      <Title>Saved Schemas</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>NameSpace</TableCell>
            <TableCell>Setting</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Enum</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schemas.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.ns}</TableCell>
              <TableCell>{row.setting}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.enumVals || "N/A"}</TableCell>
              <TableCell>{row.description || "N/A"}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" startIcon={<DeleteIcon />}/>
                  <Button variant="contained" endIcon={<SendIcon />}/>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}