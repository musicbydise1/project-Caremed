import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [editUserName, setEditUserName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [newRole, setNewRole] = useState('');
    const [editRole, setEditRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const loadRoles = async () => {
            const rolesData = await fetchRoles();
            setRoles(rolesData);
            setIsLoading(false);
        };
        loadRoles();
        fetchUsers();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/roles/show/all`);
            console.log("Roles fetched: ", response.data.roles); // Debug output
            return response.data.roles || []; // Ensure an array is returned
        } catch (error) {
            console.error('Error fetching roles:', error);
            return []; // Return an empty array if there's an error
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/show/all`);
            setUsers(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`${apiUrl}/users/create`, {
                username: newUserName,
                email: newEmail,
                password: newPassword,
                role: newRole
            });
            if (response.status === 200) {
                fetchUsers(); // Reload the user list
                setNewUserName('');
                setNewEmail('');
                setNewPassword('');
                setNewRole('');
            } else {
                console.error('Failed to create the user');
            }
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
        }
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${apiUrl}/users/edit/${editUser.id}`, {
                username: editUserName,
                email: editEmail,
                password: editPassword, // Update the password
                role: editRole
            });
            if (response.status === 200) {
                const updatedUsers = users.map(u => u.id === editUser.id ? { ...u, username: editUserName, email: editEmail, role: editRole } : u);
                setUsers(updatedUsers);
                setOpen(false);
            } else {
                console.error('Failed to save the edited user');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных пользователя:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${apiUrl}/users/delete/${userId}`);
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                console.error('Failed to delete the user');
            }
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditUser(null);
        setEditUserName('');
        setEditEmail('');
        setEditPassword('');
        setEditRole('');
    };

    const handleOpen = (user) => {
        setEditUser(user);
        setEditUserName(user.username);
        setEditEmail(user.email);
        setEditPassword(''); // Clear password field when opening edit dialog
        setEditRole(user.role);
        setOpen(true);
    };

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">User List</h1>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </div>
            {/* User Table */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out" onClick={() => handleOpen(user)}>Edit</button>
                            <button className="px-3 py-1 text-sm ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out" onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Create User Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" id="username" label="Username" type="text" fullWidth variant="standard" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                    <TextField margin="dense" id="email" label="Email" type="text" fullWidth variant="standard" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    <TextField margin="dense" id="password" label="Password" type="password" fullWidth variant="standard" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    {!isLoading && <TextField select margin="dense" id="role" label="Role" fullWidth variant="standard" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                        ))}
                    </TextField>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={editUser !== null} onClose={handleClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" id="username" label="Username" type="text" fullWidth variant="standard" value={editUserName} onChange={(e) => setEditUserName(e.target.value)} />
                    <TextField margin="dense" id="email" label="Email" type="text" fullWidth variant="standard" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                    <TextField margin="dense" id="password" label="Password" type="password" fullWidth variant="standard" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                    {!isLoading && <TextField select margin="dense" id="role" label="Role" fullWidth variant="standard" value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                        ))}
                    </TextField>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Users;
