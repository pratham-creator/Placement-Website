import axios from "axios";

export const createCompany = async (company) =>
  await axios.post(`${process.env.REACT_APP_API}/company`, company);

export const getCompanies = async () =>
  await axios.get(`${process.env.REACT_APP_API}/company`);

  export const getCompany = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/company/${id}`);
