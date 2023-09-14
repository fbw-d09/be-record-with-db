const express = require("express");
const router = express.Router();

const { getRecords, getRecord, deleteRecord, addRecord } = require("../controllers/recordsController");
const { recordValidationPostRules } = require("../validation/recordRules");



router.route("/")
  .get(getRecords)
  .post(recordValidationPostRules, addRecord);

router.route("/:id")
  .get(getRecord)
  .delete(deleteRecord);

module.exports = router;
