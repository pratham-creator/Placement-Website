const Company = require("../models/company");

exports.createCompany = async (req, res) => {
    try {
      const { name,ctc,info,companyType,url } = req.body;
      res.json(await new Company({ name,ctc,info,companyType,image:url }).save());
    } catch (err) {
      console.log(err);
      res.status(400).send("Create Company failed");
    }
};

exports.getCompanies = async (req, res) => {
  let companies = await Company.find({}).exec();
  res.json(companies);
};

exports.getCompanyById = async (req, res) => {
  const _id=req.params.id;
  let company = await Company.findById(_id).exec();
  res.json(company);
};

exports.deleteCompany = async (req, res) => {
  const { _id } = req.body;
  try {
    const deleted = await Company.findOneAndRemove({ _id }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Company delete failed");
  }
};