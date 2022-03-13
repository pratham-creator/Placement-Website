import axios from "axios";

export const uploadImage= async (image) => 
    await axios.post(`${process.env.REACT_APP_API}/uploadImage`,{image})