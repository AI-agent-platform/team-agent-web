// HeroSection.js
import React from "react";
import styled from "styled-components";
import { FadeInWhenVisible } from "../components/FramerMotion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
import ChatWidget from "../components/ChatWidget";
import Intro from "./IntroPage";
import About from "./AboutPage";
import Contact from "./ContactPage";
import Footer from "../components/Footer";
import { Link as ScrollLink } from "react-scroll";
import BackgroundImg from "../Assets/background-assets/a.webp";
import TechSlider from "../components/TechSlider";
import Areas from "./AreasPage";
import WhyUse from "./WhyUsPage";
import WhyUs from "./WhyUsPage";

const HeroBackground = styled.section`
  background-image: url(${BackgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin-bottom: 8rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MouseScroll = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .mouse {
    width: 40px;
    height: 70px;
    border: 3px solid white;
    border-radius: 25px;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .wheel {
    width: 5px;
    height: 12px;
    background: black; /* black wheel */
    border-radius: 3px;
    position: absolute;
    top: 10px;
    animation: wheelMove 1.5s infinite;
  }

  @keyframes wheelMove {
    0% {
      opacity: 1;
      top: 10px;
    }
    50% {
      opacity: 0;
      top: 25px;
    }
    100% {
      opacity: 1;
      top: 10px;
    }
  }

  .scroll-text {
    margin-top: 10px;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 2px;
    color: white;
    text-transform: uppercase;
    opacity: 0.8;
  }
`;

const HeroPage = () => {
  return (
    <>
      <Navbar />
      <HeroBackground>
        <FadeInWhenVisible>
          <HeroTitle>Build Your AI Agent with Ease</HeroTitle>
          <HeroSubtitle>
            No code. No hassle. Just results. Create chatbots that actually work
            with your business.
          </HeroSubtitle>
          <ScrollLink
            style={{ cursor: "pointer" }}
            to="intro"
            smooth={true}
            duration={500}
            offset={-80}
          >
            <MouseScroll>
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <div className="scroll-text">Scroll</div>
            </MouseScroll>
          </ScrollLink>
        </FadeInWhenVisible>
      </HeroBackground>

      <ChatWidget />

      <section id="intro">
        <Intro />
      </section>
      <section id="what-we-offer">
        <HomePage />
      </section>
      <TechSlider />

      <section id="area">
        <Areas />
      </section>

      <section id="why">
        <WhyUs />
      </section>

      {/* <section id="about">
        <About />
      </section> */}
      {/* 
      <section id="contact">
        <Contact />
      </section> */}

      <Footer />
    </>
  );
};

export default HeroPage;
