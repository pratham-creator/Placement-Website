import React,{useState,useEffect} from 'react'
import { auth } from "../../firebase";
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux';

const ForgotPassword = ({history}) => {
    let state = useSelector((state) => state);
    const {user} = state;
    useEffect(() => {       //if user has signed in he can't access this page
        if(user && user.token) history.push("/");
    },[user]);

    const [email,setEmail] = useState(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config= {     
            url :process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp : true,
        }
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail("");
                toast.success(`Reset password link sent`);
            })
            .catch((err) => {toast.error(err.message);});
    }

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6  offset-md-3">
                    <h1>Forget Password</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>    
        </div>
    )
}

export default ForgotPassword;