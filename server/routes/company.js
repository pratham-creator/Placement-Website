const express = require("express");
const router = express.Router();

// controller
const { createCompany,deleteCompany,getCompanies,getCompanyById } = require("../controllers/company");
// ,readCompany,deleteCompany,filterCompany

router.get("/company", getCompanies);
router.get("/company/:id", getCompanyById);

router.post("/company", createCompany);
router.delete("/company", deleteCompany);

module.exports = router;