import React from "react";
import styled from "styled-components";

import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

// To have links, maybe logo (I vote our logo is the fire spirit from Howl's Moving Castle)

const Footer = () => {
  return (
    <>
      <Container>
        <Horizontal>
          <Support>
            <strong>Help and Support:</strong>
            <div>FAQ</div>
            <div>Tracking your games...</div>
            <div>Looking out for Beholders...</div>
            <div>Want to learn more?</div>
          </Support>
          <Links>
            <strong>Company Info:</strong>
            <div>About Us</div>
            <div>Careers</div>
            <div>Reviews</div>
          </Links>
          <Contact>
            <strong>Contact Us:</strong>
            <div>Email: info@crithub.com</div>
            <div>Phone Number: 1(800)CRIT-HUB</div>
            <div>
              Address: 1234 Localhost Way
            </div>
          </Contact>
        </Horizontal>
        <SocialMedia>
          <div>
            <strong>Check Us Out On Social Media!</strong>
          </div>
          <Icons>
            <FaFacebookSquare />
            <FaLinkedin />
            <FaInstagram />
          </Icons>
        </SocialMedia>
      </Container>
    </>
  );
};

// links and whatever else we would like to add to the footer added here

const Container = styled.div`
  padding-top: .75vh;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 13vh;
  font-size: 10px;

  background-color: #dda15eCC;
`;

const Horizontal = styled.div`
  /* position: relative;
  bottom: 0;
  width: 100%;
  height: 18vh;
  font-size: 10px;
  margin-top: 10vh;
  background-color: lightgrey;*/
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
`;

const Contact = styled.div``;

const Links = styled.div``;

const Support = styled.div``;

const SocialMedia = styled.div`
  margin-top: 5px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icons = styled.div`
  margin-top: 5px;
  font-size: 15px;
  width: 60px;
  display: flex;
  justify-content: space-between;
`;

export default Footer;
