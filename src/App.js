import React, { useState, useEffect } from 'react';

import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const API_BASE_URL =
  'https://crudcrud.com/api/833f96e4f56247eaaecbccfcf78bcaf0';
const RESOURCE = 'users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${RESOURCE}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${RESOURCE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        setUsername('');
        fetchUsers();
      } else {
        console.error('Error adding user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const editUser = (user) => {
    setUsername(user.username);
    setEditingUser(user._id);
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${RESOURCE}/${editingUser}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        }
      );

      if (response.ok) {
        setUsername('');
        setEditingUser(null);
        fetchUsers();
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${RESOURCE}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        style={{ border: '2px solid cyan', borderRadius: '10px' }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            User Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper style={{ marginTop: '20px', padding: '20px' }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {editingUser ? (
            <Button
              variant="contained"
              color="primary"
              style={{
                marginLeft: '20px',
                marginTop: '8px',
                border: '2px solid cyan',
                borderRadius: '10px',
              }}
              onClick={updateUser}
            >
              Update User
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{
                marginLeft: '20px',
                marginTop: '8px',
                border: '2px solid cyan',
                borderRadius: '10px',
              }}
              onClick={addUser}
            >
              Add User
            </Button>
          )}
        </Paper>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editUser(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteUser(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default App;
