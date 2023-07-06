import styled from "styled-components";
import React from 'react';
import { mobile } from "../responsive";
import {useNavigate} from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
`;

const CategoryItem = ({ item }) => {
  const categoryImages = {
    1: './Images/BCategory.jpg',
    2: './Images/FurCategory.jpg',
    3: './Images/ElecCategory.jpg',
    4: './Images/ShoeCategory.jpg',
  };

  const navigate = useNavigate();
  const imageSource = categoryImages[item.id];
  function handleClick(e) {
    e.preventDefault();
    

    switch(item.id){
      case 1:
        navigate('/Beauty');
        break;
      case 2:
        navigate('/Furniture');
        break;
      case 3:
        navigate('/Electronics');
        break;
      case 4:
        navigate('/Shoes');
        break;
      default:
        break;
    } 
  }
  return (
    <Container>
      {imageSource && <Image src={imageSource} />}

      <Info>
        <Title>{item.name}</Title>
        <Button onClick={handleClick}>SHOP NOW</Button>
      </Info>
    </Container>
  );
};




export default CategoryItem;
