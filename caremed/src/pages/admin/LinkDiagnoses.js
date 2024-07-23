import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkDiagnoses = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    useEffect(() => {
        fetchDiagnoses();
        fetchSymptoms();
    }, []);

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchDiagnoses = async () => {
        try {
            const response = await axios.get(`${apiUrl}/diagnoses`);
            setDiagnoses(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке диагнозов:', error);
        }
    };

    const fetchSymptoms = async () => {
        try {
            const response = await axios.get(`${apiUrl}/symptom/show/all`);
            setSymptoms(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке симптомов:', error);
        }
    };

    const handleDiagnosisChange = (event) => {
        setSelectedDiagnosis(event.target.value);
    };

    const handleSymptomChange = (symptomId) => {
        setSelectedSymptoms(prevSelectedSymptoms =>
            prevSelectedSymptoms.some(symptom => symptom.id === symptomId)
                ? prevSelectedSymptoms.filter(symptom => symptom.id !== symptomId)
                : [...prevSelectedSymptoms, { id: symptomId, probability: 0 }]
        );
    };

    const handleProbabilityChange = (symptomId, probability) => {
        setSelectedSymptoms(prevSelectedSymptoms =>
            prevSelectedSymptoms.map(symptom =>
                symptom.id === symptomId ? { ...symptom, probability } : symptom
            )
        );
    };

    const handleSave = async () => {
        try {
            const promises = selectedSymptoms.map(symptom =>
                axios.post(`${apiUrl}/diagnoses/symptom-diagnosis`, {
                    symptomId: symptom.id,
                    diagnosisId: selectedDiagnosis,
                    probability: symptom.probability
                })
            );
            console.log(promises);
            await Promise.all(promises);
            alert('Связи успешно сохранены');
        } catch (error) {
            console.error('Ошибка при сохранении связей:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-6 text-center text-blue-600">Link Symptoms to Diagnosis</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosis">
                        Diagnosis
                    </label>
                    <select
                        id="diagnosis"
                        value={selectedDiagnosis}
                        onChange={handleDiagnosisChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="" disabled>Select a Diagnosis</option>
                        {diagnoses.map(diagnosis => (
                            <option key={diagnosis.id} value={diagnosis.id}>
                                {diagnosis.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">Symptoms</h2>
                    <div className="space-y-2">
                        {symptoms.map(symptom => (
                            <div key={symptom.id} className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
                                <input
                                    type="checkbox"
                                    id={`symptom-${symptom.id}`}
                                    checked={selectedSymptoms.some(s => s.id === symptom.id)}
                                    onChange={() => handleSymptomChange(symptom.id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`symptom-${symptom.id}`} className="text-gray-700 text-sm flex-1">
                                    {symptom.name}
                                </label>
                                {selectedSymptoms.some(s => s.id === symptom.id) && (
                                    <input
                                        type="number"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={selectedSymptoms.find(s => s.id === symptom.id).probability}
                                        onChange={(e) => handleProbabilityChange(symptom.id, parseFloat(e.target.value))}
                                        className="ml-2 p-1 border rounded-md w-20 text-sm text-black"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default LinkDiagnoses;
