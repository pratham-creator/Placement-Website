import React,{useState,useEffect} from 'react'
import { auth } from "../../firebase";
import {toast} from 'react-toastify'
// import {useSelector} from 'react-redux';

const Register= ({history}) => {
    // let state = useSelector((state) => state);
    // const {user} = state;
    // useEffect(() => {       //if user has signed in he can't access this page
    //     if(user && user.token) history.push("/");
    // },[user]);

    const [email,setEmail]=useState("");

    const handleSubmit= async (e) =>{
        e.preventDefault();
        const config= {     
            url :process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp : true,
        }

        await auth.sendSignInLinkToEmail(email,config);
        toast.success(`Registration link has been send to ${email}`);

        //save user email in local storage
        window.localStorage.setItem('emailForRegistration',email);
        //clear the state 
        setEmail("");
    };

    

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6  offset-md-3">
                    
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" autoFocus/>
                        <br/>
                            <button className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>    
        </div>
    );
};
export default Register;