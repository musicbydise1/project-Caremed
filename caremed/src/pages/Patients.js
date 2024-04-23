import React, {useState, useEffect} from 'react';
import BlcNavbar from "../components/BlcNavbar";
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import {FaUserAlt} from "react-icons/fa"
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";

const Patients = () => {

    const { t } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [patients, setPatients] = useState([]);
    const [editPatient, setEditPatient] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/patients/show/all'); // Путь к вашему API
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error('Ошибка при загрузке данных о пациентах:', error);
        }
    };

    const handleLogout = () => {
        // Добавьте логику выхода из системы
        setIsAuthenticated(false);
    };

    const handleOpen = (patient) => {
        setEditPatient(patient);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/patients/edit/${editPatient.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editPatient)
            });
            if (response.ok) {
                // Обновить состояние patients
                const updatedPatients = patients.map(p => p.id === editPatient.id ? editPatient : p);
                setPatients(updatedPatients);
                setOpen(false);
            } else {
                console.error('Failed to save the edited patient');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных пациента:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditPatient(prev => ({ ...prev, [name]: value }));
    };

    const deletePatient = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/patients/delete/${patientId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setPatients(patients.filter(patient => patient.id !== patientId));
            } else {
                console.error('Failed to delete the patient');
            }
        } catch (error) {
            console.error('Ошибка при удалении пациента:', error);
        }
    };

    return (
        <div>
            <BlcNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Container>
                <div className="title">
                    <h1>{t('patientsPage.title')}</h1>
                </div>
                <div className="patients-boxes">
                    {patients.map((patient) => (
                        <div key={patient.id} className="patients-box">
                            {/* Блок кода ниже будет повторяться для каждого пациента */}
                            <div className="patient-title">
                                <div className="patient-img">
                                    <FaUserAlt color="#00BAE2" size={40} />
                                </div>
                                <div className="patient-name">
                                    <h5>{patient.name}</h5>
                                    <div className="pat">
                                        <div className="patient-age">
                                            <p>{patient.year} y.o.,</p>
                                        </div>
                                        <div className="patient-city">
                                            <p>{patient.city}, {patient.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="patient-info">
                                <div className="patient-info-title">
                                    <p>{t('patientsPage.gender')}</p>
                                    <p>{t('patientsPage.blood')}</p>
                                    <p>{t('patientsPage.number')}</p>
                                    <p>E-mail</p>
                                    <p>{t('patientsPage.address')}</p>
                                    <p>{t('patientsPage.diagnosis')}</p>
                                </div>
                                <div className="patient-info-text">
                                    <p>{patient.gender}</p>
                                    <p>{patient.blood}</p>
                                    <p>{patient.phone}</p>
                                    <p>{patient.email}</p>
                                    <p>{patient.address}</p>
                                    <p>{patient.diagnosis}</p>
                                </div>
                            </div>
                            <div className="patient-btn">
                                <input className="edit-btn cursor-pointer" type="button" value={t('patientsPage.edit')} onClick={() => handleOpen(patient)} />
                                <input className="delete-btn cursor-pointer" type="button" value={t('patientsPage.delete')} onClick={() => deletePatient(patient.id)} />
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Patient</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="name"
                            value={editPatient?.name || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="year"
                            label="Age"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="year"
                            value={editPatient?.year || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="address"
                            value={editPatient?.address || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="gender"
                            label="Gender"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="gender"
                            value={editPatient?.gender || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="blood"
                            label="Blood Type"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="blood"
                            value={editPatient?.blood || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email address"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="email"
                            value={editPatient?.email || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone number"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="phone"
                            value={editPatient?.phone || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="diagnosis"
                            label="Diagnosis"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="diagnosis"
                            value={editPatient?.diagnosis || ''}
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Footer />
            </Container>
        </div>
    )
};

export default Patients;