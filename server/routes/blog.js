const express = require("express");
const router = express.Router();

// controller
const { createBlog,getBlogs,getBlogById,getBlogByCompanyId,deleteBlog,filterBlogs,archiveBlog,unarchiveBlog,readArchivedBlogs,readUnarchivedBlogs,createComment,addVotes } = require("../controllers/blog");

router.get("/blogs", getBlogs);
router.get("/blog/:slug", getBlogById);
router.get("/blog/filter", filterBlogs);
router.get("/blog/company/:id", getBlogByCompanyId);
router.post("/blog", createBlog);
router.delete("/blog", deleteBlog);
router.put("/blog/archive", archiveBlog);
router.put("/blog/unarchive", unarchiveBlog);
router.get("/blog/archived", readArchivedBlogs);
router.get("/blog/unarchived", readUnarchivedBlogs);
router.post("/blog/comment", createComment);
router.put("/blog/votes", addVotes);

module.exports = router;