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

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #00ffd1;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const HeroPage = () => {
  const navigate = useNavigate();

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
            to="contact"
            smooth={true}
            duration={500}
            offset={-80}
          >
            <Button>Get Started</Button>
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
