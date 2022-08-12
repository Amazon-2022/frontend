import React, { useState } from 'react';
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
import customerSchemasAPI from '../services/customerSchemaAPI';
import SchemaModal from '../components/SchemaModal';

const schemasAPI = new customerSchemasAPI();


export default function Schemas(props) {
  const { triggerAlert, schemas } = props;
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({})

  const handleOpen = (id, customer, ns, setting, type, enumVals, description) => {
    setModalData({id, customer, ns, setting, type, enumVals: enumVals.join(), description});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSchema = async (id) => {
    try {
        await schemasAPI.deleteCustomerSchema(id);
        triggerAlert("success", "Schema has been removed from CCS");
    } catch (err) {
        triggerAlert("error", err.message);
    }
  }

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
                  <Button startIcon={<DeleteIcon />} onClick={() => deleteSchema(row._id)}/>
                  <Button endIcon={<EditIcon />} onClick = {() => handleOpen(row._id, row.customer, row.ns, row.setting, row.type, row.enumVals, row.description)}/>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SchemaModal triggerAlert={triggerAlert} open={open} handleClose={handleClose} modalData={modalData}/>
    </React.Fragment>
  );
}