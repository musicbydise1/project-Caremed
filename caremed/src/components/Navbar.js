import React, { useState } from 'react';
import { Container } from "@mui/material";
import logo from "../assets/img/logo.svg";
import "../assets/styles/NavbarStyle.css";
import { FaGlobe, FaUser } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();  // Переносим useNavigate внутрь компонента

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        onLogout();  // Вызываем функцию onLogout
        setIsUserDropdownOpen(false);  // Закрываем выпадающий список пользователя после выхода
        navigate('/');  // Перенаправляем пользователя на страницу welcome
    };

    const handleLanguageSelect = (lang) => {
        i18n.changeLanguage(lang);
        setIsDropdownOpen(false);
    };

    return (
        <Container>
            <div className="navigation-panel">
                <nav>
                    <Link to="/home">
                        <img src={logo}
                             height=""
                             className="d-inline-block align-top"
                             alt="Logo"
                        />
                    </Link>
                    <div>
                        <ul id="navbar">
                            <li className="menu-li"><Link to="/home">{t('home')}</Link></li>
                            <li className="menu-li"><Link to="/patients">{t('patients')}</Link></li>
                            <li className="menu-li"><Link to="/pat-reg">{t('patientRegistration')}</Link></li>
                            {isAuthenticated && (
                                <li className="menu-li">
                                    <Link to="/profile">
                                        <FaUser className="profile-icon" size={20} />
                                    </Link>
                                </li>
                            )}
                            <li className="lang cursor-pointer ml-[150px]" onClick={toggleDropdown}>
                                <FaGlobe className="globus" size={25}></FaGlobe>
                                {isDropdownOpen && (
                                    <ul className="language-dropdown">
                                        <li onClick={() => handleLanguageSelect('en')}>{t('english')}</li>
                                        <li onClick={() => handleLanguageSelect('ru')}>{t('russian')}</li>
                                        <li onClick={() => handleLanguageSelect('kz')}>{t('kazakh')}</li>
                                    </ul>
                                )}
                            </li>
                            <li className="lang ml-[15px]" style={{ padding: "7px 20px" }} onClick={toggleUserDropdown}>
                                <FaUser className="globus cursor-pointer" size={25}></FaUser>
                                {isUserDropdownOpen && (
                                    <ul className="language-dropdown">
                                        <li onClick={handleLogout}>Выйти</li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </Container>
    );
};

export default Navbar;
