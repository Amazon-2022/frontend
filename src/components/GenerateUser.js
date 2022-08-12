import React, { useState } from 'react';
import Title from './Title';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import userAPI from '../services/userAPI';

const users = new userAPI();

export default function GenerateUser(props) {
  const { triggerAlert } = props;
  const [values, setValues] = useState({
    username: "",
    role: "CUSTOMER"
  });
  const [createUser, setCreateUser] = useState(true);
  const [password, setPassword] = useState(Math.random().toString(36).slice(-8));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await users.register({username: values.username, password, role: values.role});
        setCreateUser(false);
        triggerAlert("success", "New team onboarded to CCS");
        const pass = Math.random().toString(36).slice(-8);
        setPassword(pass);
    } catch (err) {
        triggerAlert("error", err.message);
    }
  };

  return (
    <React.Fragment>
      {createUser ? (
        <>
        <Title>Onboard New User</Title>
        <FormControl>
          <TextField id="outlined-basic" label="Team username" variant="outlined" name = "username" value={values.username} onChange={handleChange}/>
          <FormLabel sx={{mt:1}}id="demo-controlled-radio-buttons-group">Role</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="role"
              value={values.role}
              onChange={handleChange}
          >
              <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
          <   FormControlLabel value="CUSTOMER" control={<Radio />} label="Customer" />
          </RadioGroup>
          <Button style={{ background: '#DD571C' }} variant="contained" disableElevation onClick={handleSubmit}>
              Create User
          </Button>
        </FormControl>
        </>
      ) : (
        <>
        <Title>User Details</Title>
        <TextField
          disabled
          label="Username"
          id="outlined-size-small"
          defaultValue={values.username}
          size="small"
          sx = {{mb:1}}
        />
        <TextField
          disabled
          label="Password"
          id="outlined-size-small"
          defaultValue={password}
          size="small"
          sx = {{mb:1}}
        />
        <Button style={{ background: '#DD571C' }} variant="contained" disableElevation sx = {{mb:1}}>
            Slack/ Email details
        </Button>
        <Button color = 'error' variant="outlined"  onClick={() => setCreateUser(true)}>
            Reset
        </Button>
       
        </>
      )}
      
    </React.Fragment>
  );
}