import {useEffect,useState} from "react";
import "./CompanyCards.css";
import ubsLogo from "../images/UBS.jpg";
import { getCompanies } from "../api/company";
import EachCompanyCard from "../components/EachCompanyCard";
const Company = () => {
  const [company,setCompany]=useState([]);

  useEffect(()=> {
    getCompanies()
    .then(res => {
      console.log(res.data);
      setCompany(res.data)
    })
    .catch(err=> console.log(err));
  },[]);
  return (
    <>
    <center>
      <div className="outerDiv">
      <div className="outerDiv2">
      <div className="text-center"><h1 className="titleHeading">Companies</h1></div>
      <div className="container">
        <div className="row ">
          {
            company.map((c,i) => (
              <EachCompanyCard c={c} />
            ))
          }
          

        </div>
      </div>
      </div>
      </div>
      </center>
    </>
  );
};

export default Company;
