import React, { useState } from 'react';
import {Container} from "@mui/material";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Home = () => {

    const { t} = useTranslation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        // Добавьте логику выхода из системы
        setIsAuthenticated(false);
    };


    return (
        <div>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <div className="home-back">
            <div className="dark">
                <Container>
                    <div className="home-text">
                    <div className="home-h">
                        <h1>{t('homePage.title')}</h1>
                    </div>
                    <div className="home-btn">
                        <Link to="/symptoms">
                            <input type="button" value={t('homePage.symptomButton')}/>
                        </Link>
                        <div className="line-1"></div>
                        <Link to="/analysis">
                            <input type="button" value={t('homePage.analysisButton')}/>
                        </Link>
                    </div>
                </div>
                    <div className="home-blocks">
                        <div className="home-block">
                            <p>{t('homePage.info.first')}</p>
                        </div>

                        <div className="home-block">
                            <p>{t('homePage.info.second')}</p>
                        </div>

                        <div className="home-block">
                            <p>{t('homePage.info.third')}</p>
                        </div>

                        <div className="home-block">
                            <p>{t('homePage.info.fourth')}</p>
                        </div>
                        <div className="line-2"></div>
                    </div>


                </Container>

            </div>
        </div>

        </div>
    )
};

export default Home;