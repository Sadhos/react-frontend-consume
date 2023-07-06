import styled from "styled-components";
import api from "../api/axiosConfig";
import { mobile } from "../responsive";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Products from "../components/Products";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;


const Electronics = () => {
  const [electronics, setShoes] = useState([]);
  async function getShoes() {
    try {
      const response = await api.get("/api/Product/3/GetItemsByCategory")
      setShoes(response.data);

    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getShoes();
  }, []);
  return (
    <Container>
      <Navbar />
      <Announcement />

      <Title>Electronics</Title>
      <Products productsList={electronics} />


    </Container>
  );
};

export default Electronics;
