import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [editName, setEditName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/category/show/all`);
            setCategories(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
        }
    };

    const closeEditModal = () => {
        setOpen(false);
    };

    const handleOpen = (category) => {
        setEditCategory(category);
        setEditName(category.name); // Устанавливаем имя для редактирования
        setOpen(true);
    };

    const handleClose = () => {
        setEditCategory(null); // Сбрасываем редактируемую категорию
        setEditName(''); // Сбрасываем имя редактируемой категории
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${apiUrl}/category/edit/${editCategory.id}`, { name: editName });
            if (response.status === 200) {
                const updatedCategories = categories.map(p => p.id === editCategory.id ? { ...p, name: editName } : p);
                setCategories(updatedCategories);
                setOpen(false);
            } else {
                console.error('Failed to save the edited category');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных категории:', error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(`${apiUrl}/category/delete/${categoryId}`);
            if (response.status === 200) {
                setCategories(categories.filter(category => category.id !== categoryId));
            } else {
                console.error('Failed to delete the category');
            }
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`${apiUrl}/category/create`, { name: newCategory });
            if (response.status === 200) {
                fetchCategories();
                setNewCategory('');
            } else {
                console.error('Failed to create the category');
            }
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <div className="mb-[100px]">
                    <h1 className="text-3xl font-bold mb-2">Category List</h1>
                </div>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </div>
            {/* Таблица */}
            <table className="min-w-full divide-y divide-gray-200">
                {/* Заголовок таблицы */}
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                {/* Тело таблицы */}
                <tbody className="bg-white divide-y divide-gray-200">
                {categories.map(category => (
                    <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{category.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {/* Действия: кнопки редактирования или удаления */}
                            <button className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out" onClick={() => handleOpen(category)}>Edit</button>
                            <button className="px-3 py-1 text-sm ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out" onClick={() => deleteCategory(category.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Модальное окно для создания категории */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Category</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>

            {/* Модальное окно для редактирования категории */}
            <Dialog open={editCategory !== null} onClose={handleClose}>
                <DialogTitle>Edit Category</DialogTitle>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => handleClose(event, 'cancel')}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Categories;
