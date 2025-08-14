import React from "react";
import RobotImage from "../Assets/robot.png";
import {FadeInWhenVisible} from "../components/FramerMotion";

const About = () => {
  return (
    <FadeInWhenVisible>
      <div className="about-section-container" id="about">
        <div className="about-section-image-container">
          <img src={RobotImage} alt="About AI Agent" />
        </div>
        <div className="about-section-text-container">
          <p className="primary-subheading" style={{color:"#0fcb8c", fontSize:"3rem",marginBottom:"1rem"}}>About Us</p>
          <h1 className="primary-heading" style={{color:"#163c3d",fontSize:"3rem"}}>
            Empowering SMEs with Smart AI Agents
          </h1>
          <p className="primary-text">
            We are final year students of Faculty of Engineering university of Ruhuna and we help small and medium enterprises harness the power of AI by
            enabling them to build, train, and deploy custom agents tailored to
            their business processes—without writing a single line of code.
          </p>
          {/* <div className="about-buttons-container">
            <button className="secondary-button">Learn More</button>
            <button className="watch-video-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="30"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-5.197-2.999A1 1 0 008 9v6a1 1 0 001.555.832l5.197-2.999a1 1 0 000-1.664z"
                />
              </svg>
              Watch Demo
            </button>
          </div> */}
        </div>
      </div>
    </FadeInWhenVisible>
  );
};

export default About;
