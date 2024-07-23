import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const Diagnoses = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [editDiagnosis, setEditDiagnosis] = useState(null);
    const [open, setOpen] = useState(false);
    const [newDiagnosis, setNewDiagnosis] = useState({ name: '', description: '', priorProbability: '' });
    const [editData, setEditData] = useState({ name: '', description: '', priorProbability: '' });

    useEffect(() => {
        fetchDiagnoses();
    }, []);

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchDiagnoses = async () => {
        try {
            const response = await axios.get(`${apiUrl}/diagnoses`);
            const sortedDiagnoses = response.data.sort((a, b) => a.id - b.id);
            setDiagnoses(sortedDiagnoses);
        } catch (error) {
            console.error('Ошибка при загрузке диагнозов:', error);
        }
    };

    const handleOpen = (diagnosis) => {
        setEditDiagnosis(diagnosis);
        setEditData({ name: diagnosis.name, description: diagnosis.description, priorProbability: diagnosis.priorProbability });
        setOpen(true);
    };

    const handleClose = () => {
        setEditDiagnosis(null);
        setEditData({ name: '', description: '', priorProbability: '' });
        setNewDiagnosis({ name: '', description: '', priorProbability: '' });
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${apiUrl}/diagnoses/${editDiagnosis.id}`, editData);
            if (response.status === 200) {
                const updatedDiagnoses = diagnoses.map(d => d.id === editDiagnosis.id ? { ...d, ...editData } : d);
                setDiagnoses(updatedDiagnoses);
                setOpen(false);
            } else {
                console.error('Failed to save the edited diagnosis');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных диагноза:', error);
        }
    };

    const deleteDiagnosis = async (diagnosisId) => {
        try {
            const response = await axios.delete(`${apiUrl}/diagnoses/${diagnosisId}`);
            if (response.status === 200) {
                setDiagnoses(diagnoses.filter(diagnosis => diagnosis.id !== diagnosisId));
            } else {
                console.error('Failed to delete the diagnosis');
            }
        } catch (error) {
            console.error('Ошибка при удалении диагноза:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`${apiUrl}/diagnoses/create`, newDiagnosis);
            if (response.status === 201) {
                setDiagnoses([...diagnoses, response.data]);
                handleClose(); // Закрытие модального окна после создания
            } else {
                console.error('Failed to create the diagnosis');
            }
        } catch (error) {
            console.error('Ошибка при создании диагноза:', error);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <div className="mb-[100px]">
                    <h1 className="text-3xl font-bold mb-2">Diagnosis List</h1>
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
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Probability
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
                </tr>
                </thead>
                {/* Тело таблицы */}
                <tbody className="bg-white divide-y divide-gray-200">
                {diagnoses.map(diagnosis => (
                    <tr key={diagnosis.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{diagnosis.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{diagnosis.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{diagnosis.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm font-medium">{diagnosis.priorProbability}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {/* Действия: кнопки редактирования или удаления */}
                            <button
                                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
                                onClick={() => handleOpen(diagnosis)}>Edit
                            </button>
                            <button
                                className="px-3 py-1 text-sm ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                                onClick={() => deleteDiagnosis(diagnosis.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Модальное окно для создания диагноза */}
            <Dialog open={open && !editDiagnosis} onClose={handleClose}>
                <DialogTitle>Create Diagnosis</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newDiagnosis.name}
                        onChange={(e) => setNewDiagnosis({ ...newDiagnosis, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newDiagnosis.description}
                        onChange={(e) => setNewDiagnosis({ ...newDiagnosis, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="priorProbability"
                        label="Prior Probability"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newDiagnosis.priorProbability}
                        onChange={(e) => setNewDiagnosis({ ...newDiagnosis, priorProbability: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>

            {/* Модальное окно для редактирования диагноза */}
            <Dialog open={editDiagnosis !== null} onClose={handleClose}>
                <DialogTitle>Edit Diagnosis</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="priorProbability"
                        label="Prior Probability"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={editData.priorProbability}
                        onChange={(e) => setEditData({ ...editData, priorProbability: e.target.value })}
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

export default Diagnoses;
