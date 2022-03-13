const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title:  String, 
    author: {
      type:ObjectId,
      ref:"User"
    },
    company: {
      type:ObjectId,
      ref:"Company"
    },
    body: {
      type: String,
      required: true,
    },  
    interviewType:{
        type: String,
        required: true,
    },
    onCampusOrOffCampus:{
        type: String,
        required: true,
    },
    archived:{
      type:Boolean,
      default:true
    },
    selectionStatus:{
        type:String,
        required:true,
    },   
    votes: {
      userId: [{
        type:ObjectId,
        ref:"User"
      }]
    },
    comments: [{ 
      userId: {
        type:ObjectId,
        ref:"User"
      },
      comment:{
        type:String,
        required:true
      } 
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);