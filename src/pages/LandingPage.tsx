// HeroSection.js
import React from "react";
import styled from "styled-components";
import FadeInWhenVisible from "../components/FramerMotion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
import ChatWidget from "../components/ChatWidget";
import Intro from "./IntroPage";
import About from "./AboutPage";
import Contact from "./ContactPage";
import Footer from "../components/Footer";
import { ScrollLink } from "react-scroll";

const HeroBackground = styled.section`
  background-image: url("https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/67064e1a1f9aff637e161e76_Beta%20Launch%20New%20Hero.webp");
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

const HeroButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: #00ffd1;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background: white;
    color: black;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #00ffd1;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

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
      <section id="home">
        <HomePage />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </>
  );
};

export default HeroPage;
