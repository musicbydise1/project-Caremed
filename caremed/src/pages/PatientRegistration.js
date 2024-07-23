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

    const token = ''; // Предполагаем, что токен уже получен
    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.post(`${apiUrl}/patients/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Patient registered:', response.data);
            setMessage('Registration successful!');
            setFormData({
                name: '',
                year: '',
                address: '',
                country: '',
                city: '',
                gender: '',
                blood: '',
                email: '',
                phone: '',
                diagnosis: '',
            });
        } catch (error) {
            console.error('Error registering patient:', error);
            setMessage('Registration failed! Please try again.');
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
                                name="country"
                                placeholder={t('patientRegistrationPage.country')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder={t('patientRegistrationPage.city')}
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
                            <select
                                name="gender"
                                onChange={handleInputChange}
                                value={formData.gender}
                                className="patients-reg-select block mt-4 w-full"
                            >
                                <option value="">{t('patientRegistrationPage.gender')}</option>
                                <option value="male">{t('male')}</option>
                                <option value="female">{t('female')}</option>
                            </select>

                            <select
                                name="blood"
                                onChange={handleInputChange}
                                value={formData.blood}
                                className="patients-reg-select mt-4 w-full"
                            >
                                <option value="">{t('patientRegistrationPage.blood')}</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>


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
                        <input type="submit" value={t('patientRegistrationPage.register')}/>
                    </div>
                </form>

                <Footer/>
            </Container>
        </div>
    );
};

export default PatientRegistration;
