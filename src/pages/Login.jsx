
import styled from "styled-components";
import { mobile } from "../responsive";
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db, login,useAuth, logout } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig"
import React, { useContext } from 'react';
import { useState, useEffect } from "react";
import { AuthProvider, AuthContext} from "../userContext";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

/* const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
 */
const Error = styled.span`
font-size: 12px;
margin: 20px 0px;  
color: red;
`;
const Message = styled.span`
font-size: 12px;
margin: 20px 0px;
color: green;
`;

const Login = () => {
  const {isLogged,setToLogged,getCartItems,cartItems,userId} = useContext(AuthContext)
  const navigate = useNavigate();
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const [Loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const userLogged = useAuth();
  
  async function handleLogin(e) {
    e.preventDefault();
   
    const userLogin = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userName', '==', userLogin.username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        const userEmail = user.email;
        const userPassword = user.password;
        if (userPassword === userLogin.password) {
          await login(userEmail, userPassword)
          setToLogged();
          navigate('/');
        }
        else
        {
          setError("Wrong password");
          setLoading(false);
          return;
        }
      }
      else
      {
        setError("Wrong username");
        setLoading(false);
        return;
      }
      setMessage("Login successful");
      setLoading(false);
      setError("");

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    getCartItems(userId);
  },[userId])
  return (
    <Container>
      
      <Wrapper>
        <Title>Currently logged is as: {userLogged?.email}</Title>
        <Title>SIGN IN</Title>
        <Form>
          <Input ref={usernameRef} placeholder="username" />
          <Input ref={passwordRef} type='password' placeholder="password" />
          <Button onClick={handleLogin}>LOGIN</Button>
          
          <Link to="/Register">CREATE A NEW ACCOUNT</Link>
          <Error>{error}</Error>
          <Message>{message}</Message>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
