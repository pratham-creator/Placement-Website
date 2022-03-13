import React,{useState,useEffect} from 'react'
import { auth } from "../../firebase";
import {toast} from 'react-toastify'
// import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../api/auth";
import { useNavigate } from 'react-router-dom';

const RegisterComplete= () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    // let state = useSelector((state) => state);
    // const { user } = state;
    // let dispatch = useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        setEmail(window.localStorage.getItem("emailForRegistration"));
    },[]);

    const handleSubmit= async (e) =>{
        e.preventDefault();

        if(!email || !password){
            toast.error("Please enter your email address and password");
            return;
        }

        if(password.length < 6){
            toast.error("Password must be at least 6 characters");
            return;
        }

        try{
            const result=await auth.signInWithEmailLink(email,window.location.href);
            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegistration");     //remove user email from local storage
                let user =auth.currentUser;     //get user
                await user.updatePassword(password);    //add password of user to firebase
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    console.log(res.data);
                // dispatch({
                //     type: "LOGGED_IN_USER",
                //     payload: {
                //     name: res.data.name,
                //     email: res.data.email,
                //     token: idTokenResult.token,
                //     role: res.data.role,
                //     _id: res.data._id,
                //     },
                // });
                })
                // .catch((err) => console.log("err => ", err));
                navigate("/");
        }
    }
        catch(error){
            toast.error(`${error}`);
        }
    };

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6  offset-md-3">
                    
                    <h1>Complete Registration</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="email" className="form-control" value={email} disabled/>
                        <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" autoFocus/>
                        <button className="btn btn-primary">Register Complete</button>
                    </form>
                </div>
            </div>    
        </div>
    );
};
export default RegisterComplete;