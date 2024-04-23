import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from 'axios';

const SymptomBoxes = () => {

    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/category/show'); // Предположим, что ваш API предоставляет эти данные
                setCategories(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <form action="">
            <div className="symptoms-boxes">
                {categories.map(category => (
                    <div key={category.id} className="symptoms-box rgb-blue">
                        <div className="sym-title">
                            <h1>{category.name}</h1>
                        </div>
                        <div className="sym-checkboxes">
                            {category.symptoms.map(symptom => (
                                <div key={symptom.id} className="sym-checkbox">
                                    <input className="check" type="checkbox" id={`check-${symptom.id}`}
                                           name={symptom.name}/>
                                    <label htmlFor={`check-${symptom.id}`}>{symptom.name}</label>
                                    <input type="range" min="0" max="10" defaultValue="0" className="range"
                                           id={`range-${symptom.id}`}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            <div className="sym-button">
                <Link to="#">
                    <input type="button" value={t("symptomsPage.start")}/>
                </Link>
            </div>
        </form>
    )
};

export default SymptomBoxes;