// const { Pool } = require('pg');
//
// const pool = new Pool({
//     user: 'admin',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'root',
//     port: 5432,
// });
//
// async function getSymptomsFromDB() {
//     try {
//         const query = 'SELECT * FROM symptoms_table';
//         const result = await pool.query(query);
//
//         const symptoms = {};
//         result.rows.forEach(row => {
//             symptoms[row.symptom] = row.diagnoses;
//         });
//
//         return symptoms;
//     } catch (error) {
//         console.error('Ошибка при получении данных из базы данных:', error);
//         throw error;
//     }
// }
//
// class MedicalDatabase {
//     constructor() {
//         this.symptoms = {};
//         this.loadSymptomsFromDB();
//     }
//
//     async loadSymptomsFromDB() {
//         try {
//             this.symptoms = await getSymptomsFromDB();
//         } catch (error) {
//             // Обработка ошибок
//             console.error('Ошибка при загрузке симптомов из базы данных:', error);
//         }
//     }
//
//     class MedicalDiagnosis {
//     constructor(symptomsData) {
//         this.symptoms = symptomsData;
//     }
//
//     calculateDiagnosis(symptoms) {
//         if (symptoms.length === 0) {
//             return "Нет симптомов для анализа";
//         }
//
//         let diagnosisProbabilities = {};
//
//         for (let diagnosis in this.symptoms) {
//             let probability = 1;
//             for (let symptom of symptoms) {
//                 if (!this.symptoms[symptom] || !this.symptoms[symptom][diagnosis]) {
//                     continue;
//                 }
//                 probability *= this.symptoms[symptom][diagnosis];
//             }
//             diagnosisProbabilities[diagnosis] = probability;
//         }
//
//         if (Object.keys(diagnosisProbabilities).length === 0) {
//             return "Не удалось определить диагноз";
//         }
//
//         let maxProbability = 0;
//         let likelyDiagnosis = '';
//
//         for (let diagnosis in diagnosisProbabilities) {
//             if (diagnosisProbabilities[diagnosis] > maxProbability) {
//                 maxProbability = diagnosisProbabilities[diagnosis];
//                 likelyDiagnosis = diagnosis;
//             }
//         }
//         return likelyDiagnosis;
//     }
//
//
//     addSymptom(symptomName, diagnosis, probability) {
//         if (!this.symptoms[symptomName]) {
//             this.symptoms[symptomName] = {};
//         }
//         this.symptoms[symptomName][diagnosis] = probability;
//     }
// }
//
//
//
//
// let medicalDiagnosis = new MedicalDiagnosis(symptomsData);
//
//
//
// let diagnosis = medicalDiagnosis.calculateDiagnosis(symptoms);
// console.log("Диагноз:", diagnosis);
//
// }
//
// async function main() {
//     const medicalDB = new MedicalDatabase();
//     await medicalDB.loadSymptomsFromDB();
//     console.log(medicalDB.symptoms);
// }
//
// main();
