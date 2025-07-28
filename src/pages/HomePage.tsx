import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import RobotImage from "../Assets/robot.png";
import Navbar from "../components/Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
           Create powerful AI Agents Tailored to Your Business
          </h1>
          <p className="primary-text">
            Build AI agents that connect with your APIs, learn from your data, and grow with your users.
          </p>
          <button className="secondary-button">
            Create Agent
          </button>
        </div>
        <div className="home-image-section">
          <img src={RobotImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
