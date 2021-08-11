import React, { useContext } from "react"
import styled from "styled-components";
import Footer from "./Footer";
import { UserContext } from "./UserContext";

const Maps = () => {

  const {user} = useContext(UserContext)
  return (
    <Container>
      <TitleDiv>
        Your Maps
      </TitleDiv> 
      {user ? (
        <MapDiv>
          {user.maps.map((map) => {
            return (
              <Map src={`${map}`} />
            )
          })}
        </MapDiv>
      ) : (
        <MapDiv>Looks like you're not signed in!</MapDiv>
      )}
     
      
      <Footer />
    </Container>
  )
}

const Map = styled.img`
  height: 300px;
  width: 300px;
  border: solid 2px #dda15e;
  margin-left: 40px;
  margin-top: 20px;
`

const Container = styled.div`
  height: 100;
`

const MapDiv = styled.div`
  height: 82vh;
`

const TitleDiv = styled.h1`
  margin-bottom: 20px;
  padding-left: 20px;
  padding-top: 20px;
  border-bottom: solid 2px rgba(0,0,0,.2);
  font-size: 42px;
`


export default Maps;