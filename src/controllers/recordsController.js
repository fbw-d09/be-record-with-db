// hier geben wir alle Daten an das Frontend zurück (getRecords = Mehrzahl)
// app.get() = read von den crud operations (crud: create/ read/ update/ delete)
const getRecords = (req, res) => {
  
    res.status(200).json({ success: true, msg: "sent all records"});
};

// hier geben wir einen Record an das Frontend zurück (getRecord = Einzahl)
// das frontend sendet eine id in den req.params. Anhand diser ID können wir in der Datenbank den richtigen Eintrag finden
// und an das Frontend zurücksenden
// app.get by id = read von den crud operations (crud: create/ read/ update/ delete)
const getRecord = (req, res) => {

    res.status(200).json({ success: true, msg: `sent record with id ${req.params.id}` });
 
};

// das frontend sendet eine id in den req.params. Anhand dieser ID können wir in der Datenbank den richtigen Eintrag finden
// UND in diesem Fall löschen
// app.delete() = delete von den crud operations (crud: create/ read/ update/ delete)
const deleteRecord = (req, res) => {
  
    res.status(200).json({ success: true, msg: `deleted record with id ${req.params.id}`});

};


// dieser controller wird auf der app.post route ausgeführt. wir ziehen uns die Daten aus dem req.body 
// (welche vom Frontend z.b. in einem Formular) mitgesendet wurden und speichern diese in der Datenbank)
// app.post() = create von den crud operations (crud: create/ read/ update/ delete)
const addRecord = (req, res) => {

//   const {testData} = req.body
  res.status(201).json({ success: true, msg: `new record created with data send via req.body` });
};

// dieser controller wird auf der app.put route ausgeführt. Das frontend sendet eine id in den req.params. 
// Anhand dieser id können wir in der Datenbank den richtigen Eintrag finden
// und mit den neuen Daten, welche im req.body mitgeschickt wurden updaten
// app.put() = update von den crud operations (crud: create/ read/ update/ delete)
const updateRecord = (req, res) => {

    res.status(200).json({ success: true, msg: `updated record with id ${req.params.id}  with data send via req.body` });
}

module.exports = { getRecords, getRecord, deleteRecord, addRecord, updateRecord }