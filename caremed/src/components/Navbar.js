import React, { useState } from 'react';
import {Container} from "@mui/material";
import logo from "../assets/img/logo.svg"
import "../assets/styles/NavbarStyle.css"
import {FaGlobe} from "react-icons/fa";

import { useTranslation } from 'react-i18next';

// Загрузка файлов с переводами
import '../assets/i18n/en.json';
import '../assets/i18n/ru.json';
import '../assets/i18n/kz.json';


const Navbar = () => {

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
                   <a href="/">
                       <img src={logo}
                            height=""
                            className="d-inline-block align-top"
                            alt="Logo"

                       />
                   </a>
                   <div>
                       <ul id="navbar">
                           <li className="menu-li"><a href="/">{t('home')}</a></li>
                           <li className="menu-li"><a href="/patients">{t('patients')}</a></li>
                           <li className="menu-li"><a href="/pat-reg">{t('patientRegistration')}</a></li>
                           <li className="lang" onClick={toggleDropdown}>
                               <FaGlobe className="globus" size={25}></FaGlobe>
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

export default Navbar;