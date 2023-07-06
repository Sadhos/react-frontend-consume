import React from 'react'
import { mobile } from "../responsive";
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;
const Categories = ({productCategories}) => {
    
    return (
        <Container>
        {productCategories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    )
}

export default Categories