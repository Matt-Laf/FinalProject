import React from "react";
import styled from "styled-components";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <HomeDiv>
        <p>Welcome to CritHub!</p>
        <p>Please, have a look around.</p>
        </HomeDiv>
      <Footer />
    </div>
  );
};

const HomeDiv = styled.div`
  height: 81vh;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default HomePage;
