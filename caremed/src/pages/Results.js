import React, {useState} from 'react';
import BlcNavbar from "../components/BlcNavbar";
import Footer from "../components/Footer";
import {Container} from "@mui/material";
import ResultBox from "../components/ResultBox";
import {useTranslation} from "react-i18next";

const Results = () => {

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
                    <h1>{t('resultPage.title')}</h1>
                </div>

                <ResultBox />
            </Container>

            <Footer />
        </div>
    )
};

export default Results;