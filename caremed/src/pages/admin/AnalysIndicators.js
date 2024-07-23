import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const AnalysIndicators = () => {
    const [indicators, setIndicators] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editIndicator, setEditIndicator] = useState(null);
    const [open, setOpen] = useState(false);
    const [newIndicator, setNewIndicator] = useState('');
    const [editName, setEditName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchIndicators();
        fetchCategories(); // Загружаем категории при загрузке компонента
    }, []);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchIndicators = async () => {
        try {
            const response = await axios.get(`${apiUrl}/analys-indicator/show/all`);
            setIndicators(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке аналитических показателей:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/analys-category/show/all`);
            setCategories(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
        }
    };

    const closeEditModal = () => {
        setOpen(false);
    };

    const handleOpen = (indicator) => {
        setEditIndicator(indicator);
        setEditName(indicator.name); // Устанавливаем имя для редактирования
        setSelectedCategory(indicator.categoryId); // Устанавливаем категорию для редактирования
        setOpen(true);
    };

    const handleClose = () => {
        setEditIndicator(null); // Сбрасываем редактируемый показатель
        setEditName(''); // Сбрасываем имя редактируемого показателя
        setSelectedCategory(''); // Сбрасываем выбранную категорию
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${apiUrl}/analys-indicator/edit/${editIndicator.id}`, { name: editName, categoryId: selectedCategory });
            if (response.status === 200) {
                const updatedIndicators = indicators.map(i => i.id === editIndicator.id ? { ...i, name: editName, categoryId: selectedCategory } : i);
                setIndicators(updatedIndicators);
                setOpen(false);
            } else {
                console.error('Failed to save the edited indicator');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных аналитического показателя:', error);
        }
    };

    const deleteIndicator = async (indicatorId) => {
        try {
            const response = await axios.delete(`${apiUrl}/analys-indicator/delete/${indicatorId}`);
            if (response.status === 200) {
                setIndicators(indicators.filter(indicator => indicator.id !== indicatorId));
            } else {
                console.error('Failed to delete the indicator');
            }
        } catch (error) {
            console.error('Ошибка при удалении аналитического показателя:', error);
        }
    };
    const handleCreate = async () => {
        try {
            const response = await axios.post(`${apiUrl}/analys-indicator/create`, { name: newIndicator, categoryId: selectedCategory });
            if (response.status === 200) {
                fetchIndicators();
                setNewIndicator('');
            } else {
                console.error('Failed to create the indicator');
            }
        } catch (error) {
            console.error('Ошибка при создании аналитического показателя:', error);
        }
    };

    // Функция для получения названия категории по идентификатору
    const getCategoryNameById = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    };

    return (
        <div>
            <div className="mb-4">
                <div className="mb-[100px]">
                    <h1 className="text-3xl font-bold mb-2">Analytical Indicator List</h1>
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
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
                </tr>
                </thead>
                {/* Тело таблицы */}
                <tbody className="bg-white divide-y divide-gray-200">
                {indicators.map(indicator => (
                    <tr key={indicator.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{indicator.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{indicator.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{getCategoryNameById(indicator.categoryId)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {/* Действия: кнопки редактирования или удаления */}
                            <button
                                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
                                onClick={() => handleOpen(indicator)}>Edit
                            </button>
                            <button
                                className="px-3 py-1 text-sm ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                                onClick={() => deleteIndicator(indicator.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Модальное окно для создания аналитического показателя */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Analytical Indicator</DialogTitle>
                <DialogContent>
                    <div className="mb-[20px]">
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newIndicator}
                            onChange={(e) => setNewIndicator(e.target.value)}
                        />
                    </div>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>

            {/* Модальное окно для редактирования аналитического показателя */}
            <Dialog open={editIndicator !== null} onClose={handleClose}>
                <DialogTitle>Edit Analytical Indicator</DialogTitle>
                <DialogContent>
                    <div className="mb-[20px]">
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
                    </div>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default AnalysIndicators;
