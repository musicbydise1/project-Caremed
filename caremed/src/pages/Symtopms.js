import React from 'react';
import BlcNavbar from "../components/BlcNavbar";
import Footer from "../components/Footer";
import {Container} from "@mui/material";
import SymptomBoxes from "../components/SymptomBoxes";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const Symtopms = () => {
    const { t } = useTranslation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        // Добавьте логику выхода из системы
        setIsAuthenticated(false);
    };

    return (
        <div>
            <BlcNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Container>
                <div className="title">
                    <h1>{t("symptomsPage.title")}</h1>
                </div>

                <SymptomBoxes />

                <Footer />
            </Container>
        </div>
    )
};

export default Symtopms;