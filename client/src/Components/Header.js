import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Header = () => {
  const { user, users } = useContext(UserContext);

  console.log(user);

  return (
    <HeaderDiv>
      <LinkDiv>
        <HeaderLinks exact to="/">
          CritHub
        </HeaderLinks>
      </LinkDiv>
      <LinkDiv>
        <HeaderLinks exact to="/library">
          Library
        </HeaderLinks>
      </LinkDiv>
      <LinkDiv>
        <HeaderLinks exact to="/user/maps">
          Maps
        </HeaderLinks>
      </LinkDiv>
      <LinkDiv>
        <HeaderLinks exact to="/user/tokens">
          Tokens
        </HeaderLinks>
      </LinkDiv>

      {user ? (
        <LinkDivEnd>
          <HeaderLinks exact to="/profile">
            Hello, {user.name}
          </HeaderLinks>
        </LinkDivEnd>
      ) : (
        <LinkDivEnd>
          <HeaderLinks exact to="/sign-in">
            Sign In
          </HeaderLinks>
        </LinkDivEnd>
      )}
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  text-align: center;
  padding-top: 1.5vh;
  background-color: #dda15e0D;
  height: 6vh;
  display: flex;
  border-bottom: 2px solid rgba(0,0,0,.1);
`;

const LinkDiv = styled.div`
  height: 80%;
  width: 20%;
  /* background-color: #dda15e; */
  border-right: 2px solid rgba(0,0,0,.1);
`;

const LinkDivEnd = styled.div`
  height: 80%;
  width: 20%;
  /* background-color: #dda15e; */

`;

const HeaderLinks = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: x-large;
  &:hover {
    font-weight: bold;
  }
  
`;

export default Header;
