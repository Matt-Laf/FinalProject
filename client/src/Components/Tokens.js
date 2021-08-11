import React, { useContext } from "react"
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Tokens = () => {

  const {user} = useContext(UserContext)
  return (
    <div>
      <TokenLabel>
        Your Tokens
      </TokenLabel>
      {user ? (
        <TokenDiv>
          {user.tokens.map((token) => {
            return (
              <Token src={`${token}`} />
            )
          })}
        </TokenDiv>
      ) : (
        <div>Looks like you're not signed in!</div>
      )}
    </div>
  )
}

const Token = styled.img`
  height: 300px;
  width: 300px;
`

const TokenDiv = styled.div`

`

const TokenLabel = styled.h1`

`

export default Tokens;