
import styled from "styled-components";
import Announcement from "../components/Announcement";

import Navbar from "../components/Navbar";
import {Plus, Dash} from 'react-bootstrap-icons'
import { mobile } from "../responsive";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../userContext";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;





const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const navigate = useNavigate();
  const id = useParams();
  const{addToCart,userId, isLogged} = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  console.log(product.id);
  const getProduct = async () => {
    try {
      const res = await api.get(`/api/Product/${id.id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  async function handleClick(){
    await addToCart(product.id,1);
    navigate('/cart');
  }
 
  return (
   
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={`..${product.imageUrl}`} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>
            {product.description}
          </Desc>
          <Price>${product.price}</Price>
          <AddContainer>
            <AmountContainer>
             <Plus/>
              <Amount>1</Amount>
              <Dash/>
            </AmountContainer>
            <Button disabled={isLogged == false} onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      
     
    </Container>
  );
};

export default Product;
