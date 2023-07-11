
import styled from 'styled-components';

import { CartFill } from "react-bootstrap-icons";

import { logout } from '../firebase'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../userContext';
import { useAuth } from '../firebase';


const Container = styled.div`
    height: 60px;
    background-color: white;
`;


// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
flex: 1;
align-items: center;
display: flex;

`
const Center = styled.div`
flex: 1;
text-align: center;

`
const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;

`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`


const Logo = styled.h1`
font-weight: bold;
`
const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
`
const LogoutButton = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  border: none;
  background: none;
  color: red;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid red;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: red;
    color: white;
  }
`;
const Navbar = () => {
  let navigate = useNavigate();
  const userLogged = useAuth();
  const [numberOfItems, setNumberOfItems] = useState(0);

  const { isLogged, setToLoggedOut, cartItems, getCartItems, userId, setCartItemsToEmpty, setUserId } = useContext(AuthContext);


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      await setToLoggedOut();
      setCartItemsToEmpty();
      setUserId(null);

    } catch (err) {
      console.log(err);
    }

  }


  useEffect(() => {
    const fetchCartItems = async () => {
      await getCartItems(userId);
    };
    fetchCartItems();
  }, []);






  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>{userLogged?.email}</Language>
        </Left>
        <Center><Link to="/"><Logo>ZAROO.</Logo></Link></Center>
        <Right>

          <MenuItem onClick={() => {

            navigate('/register');
          }}>REGISTER</MenuItem>
          {(isLogged || (userLogged != null)) && <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>}
          {(!isLogged && (userLogged == null)) && <MenuItem onClick={() => {

            navigate('/login');
          }}>SIGN IN</MenuItem>}
          <MenuItem>
          <CartFill onClick={()=> navigate('/shoppingcart')} size={30} color='blue'/>
          <span className="item-count">{cartItems.length}</span>
            {/*  <Badge badgeContent={cartItems.length} color="primary">
              <CartFill onClick={()=> navigate('/shoppingcart')}/>
            </Badge> */}
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar