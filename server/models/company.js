const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    },
    ctc:{
      type: Number,
    },
    info: {
      type: String,
      required:true,
    },
    image:String,
    companyType:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);