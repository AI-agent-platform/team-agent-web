// src/pages/Home.jsx
import React from "react";
import BannerBackground from "../Assets/purple.png";
import RobotImage from "../Assets/robot.png";
import Navbar from "../components/Navbar";
import About from "./AboutPage";
import Contact from "./ContactPage";
import Footer from "../components/Footer";
import { Link as ScrollLink } from "react-scroll";
import ChatWidget from "../components/ChatWidget";
import Intro from "./IntroPage";
import FadeInWhenVisible from "../components/FramerMotion";
import LandingPage from "./LandingPage";
import { styled } from "styled-components";

const GridContainer = styled.div`
  display: grid;
  margin-top: 2rem;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
`;
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  p {
    align-self: center;
    font-size: 1rem;
    color: #555;
  }
`;

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container" id="home">
        {/* <div className="home-bannerImage-container">
           <img
            sizes="100vw, 500vw"
            src={BannerBackground}
            alt="Banner Background"
          /> 
        </div>  */}
        <>
          <div className="home-text-section">
            <h1 className="primary-heading">What We Offer</h1>
            {/* <p className="primary-text">
                Build AI agents that connect with your APIs, learn from your
                data, and grow with your users.
              </p> */}
            {/* <ScrollLink to="about" smooth={true} duration={500} offset={-80}>
                <button className="secondary-button">Learn More</button>
              </ScrollLink> */}
          </div>
          <FadeInWhenVisible duration={0.4}>
            <GridContainer>
              <GridItem>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "30rem",
                    height: "30rem",
                  }}
                ></div>
              </GridItem>
              <GridItem>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "30rem",
                    height: "30rem",
                  }}
                ></div>
              </GridItem>
            </GridContainer>
          </FadeInWhenVisible>
        </>
      </div>
    </div>
  );
};

export default Home;
