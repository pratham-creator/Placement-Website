import './App.css';
import Navbar from './components/Navbar';
import Company from './pages/Company';
import CompanyCards from './pages/CompanyCards';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Switch } from 'antd';
import CreateCompany from "./pages/admin/CreateCompany";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/company/:id" element={<Company/>} />
        <Route path="/companies" element={<CompanyCards/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register/complete" element={<RegisterComplete/>} />
        <Route path="/admin/company" element={<CreateCompany/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
