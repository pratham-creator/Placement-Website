import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  MailOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  let state = useSelector((state) => state);
  const { user } = state;
  useEffect(() => {
    //if user has signed in he can't access this page
    if (user && user.token) history.push("/");
  }, [user]);

  const [email, setEmail] = useState("pratham.ghule19@vit.edu");
  const [password, setPassword] = useState("pratham");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const roleBasedRedirect= (res) => {
    let intended=history.location.state;
    if(intended){
      history.push(intended.from);
    }
    if(res.data.role=="admin"){
      history.push("/admin/dashboard");
    }
    else{
      history.push("/user/history");
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log("err => ", err));
      // history.push("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log("err => ", err));
        // history.push("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h1 className="text-danger">Loading...</h1>
          ) : (
            <h1>Login</h1>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              autoFocus
            />
            <br />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              autoFocus
            />
            <br />

            <Button
              onClick={handleSubmit}
              type="primary"
              block
              shape="round"
              className="mb-3"
              disabled={!email || password.length < 6}
              size="large"
              icon={<MailOutlined />}
            >
              Login Email and Password
            </Button>
            <Button
              onClick={googleLogin}
              type="danger"
              block
              shape="round"
              className="mb-3"
              size="large"
              icon={<GoogleOutlined />}
            >
              Login with Google
            </Button>
            <Link to="/forgot/password" className="text-primary offset-md-8">
              Forgot Password ?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
