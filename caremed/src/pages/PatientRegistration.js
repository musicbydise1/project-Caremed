import React, { useState } from 'react';
import BlcNavbar from '../components/BlcNavbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PatientRegistration = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        year: '',
        address: '',
        gender: '',
        blood: '',
        email: '',
        phone: '',
        diagnosis: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const token = 0
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Предполагаем, что токен получен и сохранен в состоянии/контексте/хранилище
        const token = '';  // Нужно получить актуальный токен

        try {
            const response = await axios.post('http://localhost:8080/api/patients/create', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Обработка успешного ответа от сервера
            console.log('Patient registered:', response.data);
            setMessage('Registration successful!');  // Уведомление об успешной регистрации
            setFormData({  // Очистка формы после успешной отправки
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
        } catch (error) {
            // Обработка ошибок
            console.error('Error registering patient:', error);
            setMessage('Registration failed! Please try again.');  // Уведомление об ошибке
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div>
            <BlcNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Container>
                <div className="title">
                    <h1>{t('patientRegistrationPage.title')}</h1>
                </div>

                {message && <p className="caret-amber-950">{message}</p>}


                <form onSubmit={handleSubmit}>
                    <div className="patients-reg-boxes">
                        <div className="patients-reg-box">
                            <input
                                type="text"
                                name="name"
                                placeholder={t('patientRegistrationPage.firstName')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="year"
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
                                name="blood"
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
                                name="phone"
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
