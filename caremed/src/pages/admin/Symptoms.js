import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Symptoms = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editSymptom, setEditSymptom] = useState(null);
    const [open, setOpen] = useState(false);
    const [newSymptom, setNewSymptom] = useState('');
    const [editName, setEditName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchSymptoms();
        fetchCategories(); // Загружаем категории при загрузке компонента
    }, []);

    const apiUrl = process.env.REACT_APP_API_URL;


    const fetchSymptoms = async () => {
        try {
            const response = await axios.get(`${apiUrl}/symptom/show/all`);
            setSymptoms(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке симптомов:', error);
        }
    };

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

    const handleOpen = (symptom) => {
        setEditSymptom(symptom);
        setEditName(symptom.name); // Устанавливаем имя для редактирования
        setSelectedCategory(symptom.categoryId); // Устанавливаем категорию для редактирования
        setOpen(true);
    };

    const handleClose = () => {
        setEditSymptom(null); // Сбрасываем редактируемый симптом
        setEditName(''); // Сбрасываем имя редактируемого симптома
        setSelectedCategory(''); // Сбрасываем выбранную категорию
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${apiUrl}/symptom/edit/${editSymptom.id}`, { name: editName, categoryId: selectedCategory });
            if (response.status === 200) {
                const updatedSymptoms = symptoms.map(s => s.id === editSymptom.id ? { ...s, name: editName, categoryId: selectedCategory } : s);
                setSymptoms(updatedSymptoms);
                setOpen(false);
            } else {
                console.error('Failed to save the edited symptom');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных симптома:', error);
        }
    };

    const deleteSymptom = async (symptomId) => {
        try {
            const response = await axios.delete(`${apiUrl}/symptom/delete/${symptomId}`);
            if (response.status === 200) {
                setSymptoms(symptoms.filter(symptom => symptom.id !== symptomId));
            } else {
                console.error('Failed to delete the symptom');
            }
        } catch (error) {
            console.error('Ошибка при удалении симптома:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`${apiUrl}/symptom/create`, { name: newSymptom, categoryId: selectedCategory });
            if (response.status === 200) {
                fetchSymptoms();
                setNewSymptom('');
            } else {
                console.error('Failed to create the symptom');
            }
        } catch (error) {
            console.error('Ошибка при создании симптома:', error);
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
                    <h1 className="text-3xl font-bold mb-2">Symptom List</h1>
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
                {symptoms.map(symptom => (
                    <tr key={symptom.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{symptom.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{symptom.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{getCategoryNameById(symptom.categoryId)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {/* Действия: кнопки редактирования или удаления */}
                            <button
                                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
                                onClick={() => handleOpen(symptom)}>Edit
                            </button>
                            <button
                                className="px-3 py-1 text-sm ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                                onClick={() => deleteSymptom(symptom.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Модальное окно для создания симптома */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Symptom</DialogTitle>
                <DialogContent>
                    <div className="mb-[20px]">
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newSymptom}
                            onChange={(e) => setNewSymptom(e.target.value)}
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

            {/* Модальное окно для редактирования симптома */}
            <Dialog open={editSymptom !== null} onClose={handleClose}>
                <DialogTitle>Edit Symptom</DialogTitle>
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

export default Symptoms;
