import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const SymptomBoxes = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState({});
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiUrl}/category/show`);
                setCategories(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSymptomChange = (symptomId, value) => {
        setSelectedSymptoms(prevState => ({
            ...prevState,
            [symptomId]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const symptoms = Object.keys(selectedSymptoms)
            .filter(symptomId => selectedSymptoms[symptomId] === 1)
            .map(symptomId => parseInt(symptomId));


        console.log(symptoms);

        try {
            const response = await axios.post(`${apiUrl}/diagnoses/search`, { symptoms });
            setDiagnosisResult(response.data);
            setIsModalOpen(true); // Открытие модального окна при получении результата
        } catch (error) {
            console.error('Ошибка при поиске диагноза:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDiagnosisResult(null);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="symptoms-boxes">
                    {categories.map(category => (
                        <div key={category.id} className="symptoms-box rgb-blue">
                            <div className="sym-title">
                                <h1>{category.name}</h1>
                            </div>
                            <div className="sym-checkboxes">
                                {category.symptoms.map(symptom => (
                                    <div key={symptom.id} className="sym-checkbox flex justify-between">
                                        <div className="mb-2">
                                            <input
                                                className="check"
                                                type="checkbox"
                                                id={`check-${symptom.id}`}
                                                name={symptom.name}
                                                onChange={(e) => handleSymptomChange(symptom.id, e.target.checked ? 1 : 0)}
                                            />
                                            <label htmlFor={`check-${symptom.id}`} className="align-top">{symptom.name}</label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="10"
                                                defaultValue="0"
                                                className="range align-top"
                                                id={`range-${symptom.id}`}
                                                style={{ width: "100px", margin: 0 }}
                                                onChange={(e) => handleSymptomChange(symptom.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sym-button">
                    <input type="submit" value={t("symptomsPage.start")} />
                </div>
            </form>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Diagnosis Result</h2>
                        {diagnosisResult && Object.entries(diagnosisResult).map(([diagnosis, probability]) => (
                            <div key={diagnosis} className="mb-2">
                                <span className="font-semibold">{diagnosis}:</span> {probability}
                            </div>
                        ))}
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SymptomBoxes;
