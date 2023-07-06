import { Add, Remove } from "@material-ui/icons";

import styled from "styled-components";
import Announcement from "../components/Announcement";
import React from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

import { useContext } from "react";
import { AuthContext } from "../userContext";
import { useNavigate } from "react-router-dom";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductQty = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  let navigate = useNavigate();
  const { isLogged, 
    cartItems, 
    getCartItems, 
    userId,totalPrice,
    totalQuantity,
    setTotalAmount,
    setTotalQty,
    removeFromCart,
    updateCart
  } = useContext(AuthContext);

  async function removeItem(id) {
    await removeFromCart(id);
    await getCartItems(userId);
  }
  async function increaseQty(id) {
    var qty = cartItems.find(item => item.id === id).qty;
    qty = qty + 1;
    await updateCart(id,qty);
    await getCartItems(userId);
  }
  async function decreaseQty(id) {
    var qty = cartItems.find(item => item.id === id).qty;
    console.log(qty);
    qty = qty - 1;
    await updateCart(id,qty);
    await getCartItems(userId);
  }
 
  useEffect( () => {
    const fetchCartItems = async () => {
      await getCartItems(userId);
    };
    fetchCartItems();
  },[userId]);

  useEffect (() => {
    const fetchQty = async () => {
      await setTotalQty();
    };
    fetchQty();
  },[cartItems])

  useEffect (() => {
    const fetchAmount = async () => {
      await setTotalAmount();
    };
    fetchAmount();
  },[totalQuantity])
 
  return (

    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={()=>{
            navigate('/');
        }}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cartItems.length})</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
         
         <Info>
            {cartItems.map((item) => {
              return (
                <>

                  <Product key={item.id}>
                    <ProductDetail>
                      <Image src={`.${item.productImageurl}`} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {item.productName}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {item.productId}
                        </ProductId>

                        <ProductQty>
                          <b>QTY:</b> {item.qty}
                        </ProductQty>

                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Button onClick={()=>{if(item.qty > 0) increaseQty(item.id)}}><Add /></Button>
                        <ProductAmount>{item.qty}</ProductAmount>
                        <Button onClick={async ()=>{
                          if(item.qty == 1){
                            removeItem(item.id)
                          }
                          else{
                            decreaseQty(item.id);
                          }

                        }} ><Remove /></Button>
                      </ProductAmountContainer>
                      <ProductPrice>$ {item.price}</ProductPrice>
                    </PriceDetail>
                  </Product>

                  <hr />
                </>

              )
            })}
          </Info>
          
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice - 5.90}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>

    </Container>


  );
};

export default Cart;
{/* <Product>
<ProductDetail>
  <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
  <Details>
    <ProductName>
      <b>Product:</b> JESSIE THUNDER SHOES
    </ProductName>
    <ProductId>
      <b>ID:</b> 93813718293
    </ProductId>
    <ProductColor color="black" />
    <ProductSize>
      <b>Size:</b> 37.5
    </ProductSize>
  </Details>
</ProductDetail>
<PriceDetail>
  <ProductAmountContainer>
    <Add />
    <ProductAmount>2</ProductAmount>
    <Remove />
  </ProductAmountContainer>
  <ProductPrice>$ 30</ProductPrice>
</PriceDetail>
</Product>
<Hr /> */}