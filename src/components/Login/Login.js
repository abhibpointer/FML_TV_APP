import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import './style.css';
const { REACT_APP_ENDPOINT } = process.env;
const{REACT_APP_ENDPOINT_LIVE}=process.env;

const Login = () => {
  const navigator = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameErr, setUserNameErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)
  const [message, setMessage] = useState('')

  const handleUsername = (e) => {
    const username = e.target.value.trim();
    setUserName(username);
    setUserNameErr(username === '' ? "Username is required" : false);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordErr(password === '' ? "Password is required" : false);
  };

  const validateForm = () => {
    return userName.length > 0 && password.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`${REACT_APP_ENDPOINT}/tvlogin`, {
      userName: userName,
      password: password,
    })
      .then((res) => {
        console.log(res)
        if (res.data.data.auth_token) {
          const key = res.data.data.auth_token

          localStorage.clear()
          localStorage.setItem("auth_token", JSON.stringify(key))
          navigator("/Home")

        }
      })
      .catch(() => {
        setMessage("Enter a valid username and password")
      })

  }

  return (
    <div className='content-area'>
    <div className='login-wrapper'>
      <div className='login-form-wrapper'>
        <form>
        <FormGroup controlId="userName" size="large">
            <ControlLabel className='label WickedGrit'>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={userName}
              onChange={handleUsername}
            />
          </FormGroup>
          {userNameErr && <p style={{ color: "red", fontsize: "12px" }}>{userNameErr}</p>}
          <FormGroup controlId="password" size="large">
            <ControlLabel className='label WickedGrit'>Password</ControlLabel>
            <FormControl
              value={password}
              onChange={handlePassword}
              type="password"
            />
          </FormGroup>
          {passwordErr && <p style={{ color: "red", fontsize: "12px" }}>{passwordErr}</p>}
          <Button style={{backgroundColor: '#35C7C9',width:'100%',marginTop: '20px'}}   
            block bsSize='large' disabled={!validateForm()} type='button' onClick={handleSubmit}            
          >Login</Button>
          <p className="text-center" style={{ color: "red" }}>{message}</p>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login
