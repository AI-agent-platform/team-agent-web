// src/pages/Home.jsx
import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import RobotImage from "../Assets/robot.png";
import Navbar from "../components/Navbar";
import About from "./AboutPage";
import Contact from "./ContactPage";
import Footer from "../components/Footer";
import { Link as ScrollLink } from "react-scroll";
import ChatWidget from "../components/ChatWidget";
import Intro from "./IntroPage";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <div className="home-banner-container" id="home">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Banner Background" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Create powerful AI Agents Tailored to Your Business
          </h1>
          <p className="primary-text">
            Build AI agents that connect with your APIs, learn from your data,
            and grow with your users.
          </p>
          <ScrollLink to="about" smooth={true} duration={500} offset={-80}>
            <button className="secondary-button">Learn More</button>
          </ScrollLink>
        </div>
        <div className="home-image-section">
          <img src={RobotImage} alt="AI Robot" />
        </div>
      </div>
      <ChatWidget />
      
      <section id="intro">
        <Intro />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
