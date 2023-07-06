import React , {useEffect} from 'react';
import styled from 'styled-components';
import {where,getDocs,collection, query} from 'firebase/firestore';
import { mobile } from "../responsive";
import { db,signup} from '../firebase';
import api from '../api/axiosConfig';
import UserInformationService  from '../service/userDataService'
import { useNavigate } from 'react-router-dom';
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
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Register = () => {
const navigate = useNavigate();
 const name = React.useRef(null);
  const lastName = React.useRef(null);
  const userName = React.useRef(null);
  const email = React.useRef(null);
  const password = React.useRef(null);
  const confirmPassword = React.useRef(null);
  const [Loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  async function adduserToLocalDb(username) {
    try
    {
      const user = await api.post(`/api/addUser/${username}`)
      console.log(user);
      return user;
    }
    catch(err)
    {
      console.log(err);
    }
  }
  
  async function checkIfEmailExists(email) {
    try{
      const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
    }
    catch(error){
      console.log(error);
      return false;
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const newUser = {
      name: name.current.value,
      lastName: lastName.current.value,
      userName: userName.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try
    {
      if (newUser.password !== confirmPassword.current.value) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      } else if (
        !newUser.name ||
        !newUser.lastName ||
        !newUser.userName ||
        !newUser.email ||
        !newUser.password
      ) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      } else {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailExist = await checkIfEmailExists(newUser.email);
        if (!emailRegex.test(newUser.email)) {
          setError("Invalid email address");
          setLoading(false);
          return;
        }
        if(emailExist){
          setError("Email already exists");
          setLoading(false);
        }
        await signup(email.current.value, password.current.value);
        await UserInformationService.addUser(newUser);
        await adduserToLocalDb(newUser.userName);
        setMessage("Account created successfully");
        navigate('/');
        // Clear the error message
        setError("");
      }
  
      setLoading(false);
    } catch (error) {
      console.log(error);
    } 
  }
  return (
    <Container>
       <Wrapper>
        <Title>CREATE AN ACCOUNT </Title>
        <Form>
            <Input ref={name}placeholder="name" />
            <Input ref={lastName}placeholder="last name" />
            <Input ref={userName}placeholder="username" />
            <Input type="email" ref={email} placeholder="email" />
            <Input type="password" ref={password} placeholder="password" />
            <Input type="password" ref={confirmPassword}placeholder="confirm password" />

            <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <br/>
          <div> 
            <Error>{error}</Error>
            
          </div>
          <br/>
          <br/>
          <Button disabled={Loading} onClick={handleSubmit}>CREATE</Button>
          
          <br/>
          <Message>{message}</Message>
        </Form>
        </Wrapper>   
    </Container>
  )
}

export default Register;