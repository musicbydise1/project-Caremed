// app.get('/diagnose', (req, res) => {
//     const symptoms = req.query.symptoms ? req.query.symptoms.split(',') : [];
//
//     if (symptoms.length === 0) {
//         return res.status(400).send('Не указаны симптомы');
//     }
//
//     const diagnosis = calculateDiagnosis(symptoms);
//
//     res.send(`Предполагаемый диагноз: ${diagnosis}`);
// });