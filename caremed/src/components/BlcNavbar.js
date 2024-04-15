import React, {useState} from 'react';
import {Container} from "@mui/material";
import logo from "../assets/img/blcLogo.svg"
import "../assets/styles/NavbarStyle.css"
import {FaGlobe} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


const BlcNavbar = () => {

    const { t, i18n } = useTranslation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                        <ul id="navbar" className="blc">
                            <li className="menu-li"><Link to="/home">{t('home')}</Link></li>
                            <li className="menu-li"><Link to="/patients">{t('patients')}</Link></li>
                            <li className="menu-li"><Link to="/pat-reg">{t('patientRegistration')}</Link></li>
                            <li className="lang blc" onClick={toggleDropdown}>
                                <FaGlobe className="blc globus" size={25}></FaGlobe>
                                {isDropdownOpen && (
                                    <ul className="language-dropdown">
                                        <li onClick={() => handleLanguageSelect('en')}>{t('english')}</li>
                                        <li onClick={() => handleLanguageSelect('ru')}>{t('russian')}</li>
                                        <li onClick={() => handleLanguageSelect('kz')}>{t('kazakh')}</li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </Container>
    )
};

export default BlcNavbar;