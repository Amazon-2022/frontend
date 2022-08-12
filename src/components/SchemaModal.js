import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import customerSchemaAPI from '../services/customerSchemaAPI';

const schemasAPI = new customerSchemaAPI();

export default function SchemaModal(props) {
  const {open, handleClose, triggerAlert, modalData } = props;
  const [ns, setNs] = modalData ? useState(modalData.ns) : useState("");
  const [setting, setSetting] = modalData ?  useState(modalData.setting) : useState("");
  const [description, setDescription] = modalData ?  useState(modalData.description) : useState("");
  const [stype, setStype] = modalData ?  useState(modalData.stype) : useState("");
  const [enumVals, setEnumVals] = modalData ?  useState(modalData.enumVals) : useState("");

  const handleSubmit = async () => {
    try {
        const enumArray = enumVals.split(",");
        await schemasAPI.create({ ns, setting, description, type: stype, enumVals: enumArray });
        triggerAlert("success", "New schema created in CCS");
    } catch (err) {
        triggerAlert("error", err.message)
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalData? modalData.title : "Create New Schema"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            label="NameSpace"
            name="ns"
            defaultValue={ns}
            autoFocus
            onChange={(event) => setNs(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="setting"
            name="setting"
            defaultValue={setting}
            autoFocus
            onChange={(event) => setSetting(event.target.value)}
          />
          <TextField
            multiline
            margin="normal"
            fullWidth
            label="description"
            name="description"
            defaultValue={description}
            autoFocus
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormLabel sx={{mt:1}}id="demo-controlled-radio-buttons-group">Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="type"
            value={stype}
            onChange={(event) => setStype(event.target.value)}
          >
            <FormControlLabel value="String" control={<Radio />} label="String" />
            <FormControlLabel value="Number" control={<Radio />} label="Number" />
            <FormControlLabel value="Boolean" control={<Radio />} label="Boolean" />
            <FormControlLabel value="Enum" control={<Radio />} label="Enum" />
          </RadioGroup>
          {stype === "Enum" ? (
            <TextField
              margin="normal"
              required
              fullWidth
              label="enumVals"
              name="enumVals"
              defaultValue={enumVals}
              autoFocus
              onChange={(event) => setEnumVals(event.target.value)}
            />
          ) : 
          (<div></div>)
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Schema</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
