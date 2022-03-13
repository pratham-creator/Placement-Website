import axios from "axios";

export const getBlogsByCompanyId = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/blog/company/${id}`);