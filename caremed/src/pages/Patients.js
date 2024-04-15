import React from 'react';
import BlcNavbar from "../components/BlcNavbar";
import {Container} from "@mui/material";
import {FaUserAlt} from "react-icons/fa"
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";

const Patients = () => {

    const { t } = useTranslation();

    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>{t('patientsPage.title')}</h1>
                </div>
                <div className="patients-boxes">
                    <div className="patients-box">
                        <div className="patient-title">
                            <div className="patient-img">
                                <FaUserAlt color="#00BAE2" size={40} />
                            </div>
                            <div className="patient-name">
                                <h5>Aruzhan Zhappasova</h5>
                                <div className="pat">
                                    <div className="patient-age">
                                        <p>18 y.o.,</p>
                                    </div>
                                    <div className="patient-city">
                                        <p> Almaty, Kazakhstan</p>
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
                                <p>Female</p>
                                <p>AB+</p>
                                <p>+7 (708) 672-87-98</p>
                                <p>aru@gmail.com</p>
                                <p>RK, Almaty city, Medeu district, st. Abaya, №44/3</p>
                                <p>Autism</p>
                            </div>
                        </div>
                        <div className="patient-btn">
                            <input className="edit-btn" type="button" value={t('patientsPage.edit')}/>
                            <input className="delete-btn" type="button" value={t('patientsPage.delete')}/>
                        </div>
                    </div>
                </div>

                <Footer />
            </Container>
        </div>
    )
};

export default Patients;