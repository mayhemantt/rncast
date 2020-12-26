import React from "react";

import Styled from "styled-components";

const Logo = (props) => {
  return (
    <Container>
      <Image source={props.image} resizeMode="contain" />
      <Text>{props.text}</Text>
    </Container>
  );
};

export default Logo;

const Container = Styled.View`
   flex-direction: row;
   background: white;
   height: 60px;
   padding:12px 16px 12px ;
   border-radius: 10px;
   box-shadow: 0 5px 10px rgba(0,0,0,0.05);
   align-items: center;
   margin: 0 8px;
`;
const Image = Styled.Image`
   width: 36px;
   height: 36px;
`;
const Text = Styled.Text`
   font-weight: 600;
   font-size:17px;
   margin-left: 8px;
`;
