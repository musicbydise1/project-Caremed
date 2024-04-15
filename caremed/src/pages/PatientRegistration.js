// src/pages/PatientRegistration.js

import React, { useState } from 'react';
import BlcNavbar from '../components/BlcNavbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PatientRegistration = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        age: '',
        address: '',
        gender: '',
        bloodGroup: '',
        email: '',
        phoneNumber: '',
        diagnosis: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const token = 0
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/tutorial/new', formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(formData)
            // Обработка успешного ответа от сервера
            console.log('Client registered:', response.data);
        } catch (error) {
            // Обработка ошибок
            console.error('Error registering client:', error);
        }
    };

    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>{t('patientRegistrationPage.title')}</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="patients-reg-boxes">
                        <div className="patients-reg-box">
                            <input
                                type="text"
                                name="firstName"
                                placeholder={t('patientRegistrationPage.firstName')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder={t('patientRegistrationPage.lastName')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="middleName"
                                placeholder={t('patientRegistrationPage.surname')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder={t('patientRegistrationPage.age')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder={t('patientRegistrationPage.address')}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="patients-reg-box">
                            <input
                                type="text"
                                name="gender"
                                placeholder={t('patientRegistrationPage.gender')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="bloodGroup"
                                placeholder={t('patientRegistrationPage.blood')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder={t('patientRegistrationPage.email')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="phoneNumber"
                                placeholder={t('patientRegistrationPage.number')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="diagnosis"
                                placeholder={t('patientRegistrationPage.diagnosis')}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="patients-reg-btn">
                        <input type="submit" value={t('patientRegistrationPage.register')} />
                    </div>
                </form>

                <Footer />
            </Container>
        </div>
    );
};

export default PatientRegistration;
