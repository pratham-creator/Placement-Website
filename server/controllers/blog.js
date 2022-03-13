const Blog = require("../models/blog");
const Company = require("../models/company");

exports.createBlog = async (req, res) => {
    try {
      const { title,author,company,body,interviewType,onCampusOrOffCampus,selectionStatus } = req.body;
      res.json(await new Blog({ title,author,company,body,interviewType,onCampusOrOffCampus,selectionStatus }).save());
    } catch (err) {
      console.log(err);
      res.status(400).send("Create Blog failed");
    }
};

exports.createComment = async (req, res) => {
  try {
    const { blogId,userId,comment } = req.body;
    let blog= await Blog.findById(blogId);
    blog.comments.push({ userId,comment });
    res.json(await blog.save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Comment failed");
  }
};

exports.addVotes = async (req, res) => {
  try {
    const { blogId,userId } = req.body;
    let blog= await Blog.findById(blogId);
    const index=blog.votes.userId.indexOf(userId);
    if(index < 0){
      blog.votes.userId.push(userId);
      await blog.save();
    }
    else{
      blog.votes.userId.splice(index,1);
      await blog.save();
    }
    res.json("Voted Successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Vote failed");
  }
};

exports.getBlogs = async (req, res) => {
  let blogs = await Blog.find({}).populate("company","name").exec();
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const _id=req.params.slug;
  let blogs = await Blog.findById(_id).populate("company").populate("author").populate("comments.userId").exec();
  res.json(blogs);
};

exports.getBlogByCompanyId = async (req, res) => {
  const {id}=req.params;
  let company = await Company.findById(id).exec(); 
  let blogs = await Blog.find({company}).populate("company").populate("author").exec();
  res.json(blogs);
};

exports.readArchivedBlogs=async (req,res) => {
  let blogs = await Blog.find({archived:true}).exec();
  res.json(blogs);
}

exports.readUnarchivedBlogs=async (req,res) => {
  let blogs = await Blog.find({archived:false}).exec();
  res.json(blogs);
}

const getAllCompanyNames= async () => {
  let companies = await Company.find({},{name:1}).exec();
  return companies;
}

exports.filterBlogs = async (req,res) => {
  let { company,interviewType,onCampusOrOffCampus } = req.body;   //front end should send company array with content as object of id and name
  try{
    if(company.length==0){
      company=await getAllCompanyNames();
    }
    if(interviewType.length==0){
      interviewType=["internship","full time"];
    }
    if(onCampusOrOffCampus.length==0){
      onCampusOrOffCampus=["onCampus","offCampus"];
    }
    let blogs = await Blog.find({company,onCampusOrOffCampus}).populate("company").exec();
    res.json(blogs);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err);
  }
}

exports.deleteBlog = async (req, res) => {
  const { _id } = req.body;
  try {
    const deleted = await Blog.findOneAndRemove({ _id }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product delete failed");
  }
};

exports.archiveBlog = async (req, res) => {
  const { _id } = req.body;
  try {
    const updated = await Blog.findOneAndUpdate(
      { _id },
      { archived:true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("archive blog failed");
  }
};

exports.unarchiveBlog = async (req, res) => {
  const { _id } = req.body;
  try {
    const updated = await Blog.findOneAndUpdate(
      { _id },
      { archived:false },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("unarchive blog failed");
  };
}




