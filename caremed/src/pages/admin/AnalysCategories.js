import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize } from "@mui/material";

const AnalysCategories = () => {
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/analys-category/show/all`);
            setCategories(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке аналитических категорий:', error);
        }
    };

    const closeEditModal = () => {
        setOpen(false);
    };

    const handleOpen = (category) => {
        setEditCategory(category);
        setEditName(category.name); // Устанавливаем имя для редактирования
        setEditDescription(category.description); // Устанавливаем описание для редактирования
        setOpen(true);
    };

    const handleClose = () => {
        setEditCategory(null); // Сбрасываем редактируемую категорию
        setEditName(''); // Сбрасываем имя редактируемой категории
        setEditDescription(''); // Сбрасываем описание редактируемой категории
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${apiUrl}/analys-category/edit/${editCategory.id}`, { name: editName, description: editDescription });
            if (response.status === 200) {
                const updatedCategories = categories.map(p => p.id === editCategory.id ? { ...p, name: editName, description: editDescription } : p);
                setCategories(updatedCategories);
                setOpen(false);
            } else {
                console.error('Failed to save the edited category');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных аналитической категории:', error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(`${apiUrl}/analys-category/delete/${categoryId}`);
            if (response.status === 200) {
                setCategories(categories.filter(category => category.id !== categoryId));
            } else {
                console.error('Failed to delete the category');
            }
        } catch (error) {
            console.error('Ошибка при удалении аналитической категории:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`${apiUrl}/analys-category/create`, newCategory);
            if (response.status === 200) {
                fetchCategories();
                setNewCategory({ name: '', description: '' });
            } else {
                console.error('Failed to create the category');
            }
        } catch (error) {
            console.error('Ошибка при создании аналитической категории:', error);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <div className="mb-[100px]">
                    <h1 className="text-3xl font-bold mb-2">Analysis Category List</h1>
                </div>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </div>
            {/* Таблица */}
            <table className="min-w-full divide-y divide-gray-200">
                {/* Заголовок таблицы */}
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
                </tr>
                </thead>
                {/* Тело таблицы */}
                <tbody className="bg-white divide-y divide-gray-200">
                {categories.map(category => (
                    <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{category.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{category.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {/* Действия: кнопки редактирования или удаления */}
                            <button
                                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
                                onClick={() => handleOpen(category)}>Edit
                            </button>
                            <button
                                className="px-3 py-1 text-sm ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                                onClick={() => deleteCategory(category.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Модальное окно для создания аналитической категории */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Analytical Category</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <TextareaAutosize
                        minRows={3}
                        maxRows={6}
                        placeholder="Description"
                        style={{ width: '100%', resize: 'none', marginBottom: '16px' }}
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>

            {/* Модальное окно для редактирования аналитической категории */}
            <Dialog open={editCategory !== null} onClose={handleClose}>
                <DialogTitle>Edit Analytical Category</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <TextareaAutosize
                        minRows={3}
                        maxRows={6}
                        placeholder="Description"
                        style={{ width: '100%', resize: 'none', marginBottom: '16px' }}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default AnalysCategories;
