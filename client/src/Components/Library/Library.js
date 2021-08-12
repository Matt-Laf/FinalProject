import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";

const Library = () => {

  // So I found out that the API I used for this actually provides each of the pages AND a search bar.  Neat.  Search bar will be incorporated in the future.  

  return (
    <Wrapper>
      <Container>
        <NavDiv>
          <LibraryNavs exact to="/conditions">Conditions</LibraryNavs>
        </NavDiv>
        <NavDiv>
          <LibraryNavs exact to="/classes">Classes</LibraryNavs>
        </NavDiv>
        <NavDiv>
          <LibraryNavs exact to="/magicitems">Magic Items</LibraryNavs>
        </NavDiv>
        <NavDiv>
          <LibraryNavs exact to="/monsters/:page">Monsters</LibraryNavs>
        </NavDiv>
        <NavDiv>
          <LibraryNavs exact to="/races">Races</LibraryNavs>
        </NavDiv>
        <NavDiv>
          <LibraryNavs exact to="/spells">Spells</LibraryNavs>
        </NavDiv>
        <NavDiv>
          <LibraryNavs exact to="/weapons">Weapons</LibraryNavs>
        </NavDiv>
        
        
      </Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
`;

const LibraryNavs = styled(NavLink)`
  text-decoration: none;
  color: black;
  text-align: center;
  font-size: 32px;
  /* background-color: red; */

  
`;

const NavDiv = styled.div`
  margin-right:50px;
  border-bottom: 2px solid rgba(0,0,0,.5);
  &:hover {
    font-weight: bold;
    border-bottom: 2px solid rgba(0,0,0);
  }
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
  height: 81vh;
  width: 100vw;
  /* background-color: yellow; */
`;

export default Library;
