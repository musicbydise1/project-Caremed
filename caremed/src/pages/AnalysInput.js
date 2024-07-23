import React, {useEffect} from 'react';
import BlcNavbar from "../components/BlcNavbar";
import {Container} from "@mui/material";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const AnalysInput = () => {


    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        // Добавьте логику выхода из системы
        setIsAuthenticated(false);
    };

    const [categories, setCategories] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiUrl}/analys-category/show`); // Предположим, что ваш API предоставляет эти данные
                setCategories(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <BlcNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Container>
                <div className="title">
                    <h1>Fill the information</h1>
                </div>
                <form action="">
                    <div className="analys-in-boxes">
                        <div className="analys-in-box">
                            <h2>General clinical analysis of blood</h2>
                            <div className="analys-in-form rgb-gray">
                                <div className="analysis-input-box-container">
                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <h6>Indicators</h6>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <h6>Results</h6>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Hemoglobin (HGB)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Hematocrit (HCT)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Red blood cells (RBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="analys-in-box">
                            <h2>General clinical analysis of blood</h2>
                            <div className="analys-in-form rgb-blue">
                                <div className="analysis-input-box-container">
                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <h6>Indicators</h6>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <h6>Results</h6>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Hemoglobin (HGB)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Hematocrit (HCT)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Red blood cells (RBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                    <div className="analysis-input-box-row">
                                        <div className="analysis-input-box-main">
                                            <p>Leukocytes (WBC)</p>
                                        </div>
                                        <div className="analysis-input-box-cell">
                                            <input type="text" placeholder="Result"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                    <div className="sym-button">
                        <Link to="/results">
                            <input type="button" value="Start Diagnosing"/>
                        </Link>
                    </div>

            </Container>
            <Footer />
        </div>
    )
};

export default AnalysInput;