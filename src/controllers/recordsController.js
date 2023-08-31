const Record = require("../models/Record");

// hier geben wir alle Daten an das Frontend zurück (getRecords = Mehrzahl)
// app.get() = read - von den crud operations (crud: create/ read/ update/ delete)
const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).send(records);
  } catch (err) {
    next(err);
  }
};

// hier geben wir einen Record an das Frontend zurück (getRecord = Einzahl)
// das frontend sendet eine id in den req.params. Anhand diser ID können wir in der Datenbank den richtigen Eintrag finden
// und an das Frontend zurücksenden
// app.get by id = read - von den crud operations (crud: create/ read/ update/ delete)
const getRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (err) {
    // der Fehler wird an den Error handler in der index.js übergeben
    // und von dort an den client zurück gesendet res.status()json()
    next(err);
  }
};

// das frontend sendet eine id in den req.params. Anhand dieser ID können wir in der Datenbank den richtigen Eintrag finden
// UND in diesem Fall löschen
// app.delete() = delete - von den crud operations (crud: create/ read/ update/ delete)
const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};

// dieser controller wird auf der app.post route ausgeführt. wir ziehen uns die Daten aus dem req.body
// (welche vom Frontend z.b. in einem Formular) mitgesendet wurden und speichern diese in der Datenbank)
// app.post() = create - von den crud operations (crud: create/ read/ update/ delete)
const addRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).send(record);
  } catch (err) {
    next(err);
  }
};

// dieser controller wird auf der app.put route ausgeführt. Das frontend sendet eine id in den req.params.
// Anhand dieser id können wir in der Datenbank den richtigen Eintrag finden
// und mit den neuen Daten, welche im req.body mitgeschickt wurden updaten
// app.put() = update - von den crud operations (crud: create/ read/ update/ delete)
const updateRecord = async (req, res) => {
  const recordId = req.params.id;
  const updatedRecord = req.body;
  try {
    const record = await Record.findByIdAndUpdate(recordId, updatedRecord, {
      new: true,
    });
    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecords,
  getRecord,
  deleteRecord,
  addRecord,
  updateRecord,
};
