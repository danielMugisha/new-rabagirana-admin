import React, {useRef, useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const {setAuth}  = useAuth();

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_AUTH_BASE_URL;
        axios.post(`${url}auth/signin`, {
                username: user,
                password: pwd
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then((res)=>{
            if(res.status === 200) {
                const result = res.data
                localStorage.setItem('token', result.data.accessToken);
                setAuth(result.data)
                setUser('')
                setPwd('')
                navigate(from, {replace: true});
            } else {
                setErrMsg(res.message);
            }
        })
        .catch(err=>{
            setErrMsg(err.response?.data?.message || err.message);
        })
    }

    useEffect(() => {
        // userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[user, pwd])


  return (
    <div class="auth-page-wrapper pt-5">
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>

            <div class="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>

        <div class="auth-page-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <a href="index.html" class="d-inline-block auth-logo">
                                    <h1 style={{color:'white'}}>Rabagirana</h1>
                                </a>
                            </div>
                            <p class="mt-3 fs-15 fw-medium">Souls Could Shine Brighter</p>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card mt-4">

                            <div class="card-body p-4">
                                <div class="text-center mt-2">
                                    <h5 class="text-primary">Welcome Back !</h5>
                                    <p class="text-muted">Sign in to continue as Admin.</p>
                                </div>
                                <div class="p-2 mt-4">
                                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                                    <form onSubmit={handleSubmit}>
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Username</label>
                                            <input 
                                                type="text" 
                                                class="form-control" 
                                                id="username" 
                                                placeholder="Enter username"
                                                ref={userRef}
                                                onChange={(e)=>setUser(e.target.value)}
                                                value={user}
                                                required
                                                />
                                        </div>

                                        <div class="mb-3">
                                            {/* <div class="float-end">
                                                <a href="auth-pass-reset-basic.html" class="text-muted">Forgot password?</a>
                                            </div> */}
                                            <label class="form-label" for="password-input">Password</label>
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <input 
                                                type="password" 
                                                class="form-control pe-5 password-input" placeholder="Enter password" id="password-input"
                                                onChange={(e)=> setPwd(e.target.value)}
                                                value={pwd}
                                                required
                                                />
                                                
                                                {/* <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button> */}
                                            </div>
                                        </div>

                                        {/* <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="auth-remember-check"/>
                                            <label class="form-check-label" for="auth-remember-check">Remember me</label>
                                        </div> */}

                                        <div class="mt-4">
                                            <button class="btn btn-success w-100" type="submit">Sign In</button>
                                        </div>

                                        {/* <div class="mt-4 text-center">
                                            <div class="signin-other-title">
                                                <h5 class="fs-13 mb-4 title">Sign In with</h5>
                                            </div>
                                            <div>
                                                <button type="button" class="btn btn-primary btn-icon waves-effect waves-light"><i class="ri-facebook-fill fs-16"></i></button>
                                                <button type="button" class="btn btn-danger btn-icon waves-effect waves-light"><i class="ri-google-fill fs-16"></i></button>
                                                <button type="button" class="btn btn-dark btn-icon waves-effect waves-light"><i class="ri-github-fill fs-16"></i></button>
                                                <button type="button" class="btn btn-info btn-icon waves-effect waves-light"><i class="ri-twitter-fill fs-16"></i></button>
                                            </div> 
                                        </div>*/}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Login
