import React from "react";
import styled from "styled-components";
import { SlideInFromSide } from "../components/FramerMotion";
import OwnerAgentImg from "../Assets/what-we-offer/owner-agent.jpg";
import CustomerAgentImg from "../Assets/what-we-offer/customer-agent.jpg";

const HomeTextSection = styled.div`
  text-align: left;
  max-width: 800px; /* limits paragraph width */
  margin: 0 0 2rem 200px; 

  h1 {
    font-size: 3rem;
    color: white;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: white;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin-left: 20px; /* smaller left margin on mobile */
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const SplitSection = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  gap: 1rem; /* separation between sections */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem; /* vertical spacing on mobile */
  }
`;

const SectionHalf = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.5s ease, height 0.3s ease;
  background-size: cover;
  background-position: center;
  height: 30rem;
  border-radius: 20px;
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    clip-path: none;
    height: 20rem;
    &:hover {
      transform: none;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${SectionHalf}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    padding: 1.5rem;
    height: auto;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    max-width: 70%;
    text-align: center;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 1rem;
      max-width: 100%;
      padding: 0 1rem;
    }
  }
`;

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container" id="home">
        <HomeTextSection>
          <h1 style={{ color: "#0fcb8c" }}>What We Offer</h1>
          <p
            style={{
              color: "#ffffffff",
              fontFamily: "Mark Medium, sans-serif",
              fontSize: "1.5rem",
            }}
          >
            Helps communication with the owner and performs necessary updates
            about the business. Helps communication with the owner and performs
            necessary updates about the business. Helps communication with
            customers and provides support, recommendations, and real-time
            interaction.
          </p>
        </HomeTextSection>

        <SplitSection>
          {/* Owner Agent - slides in from left */}
          <SlideInFromSide from="left" duration={1.2} delay={0.2}>
            <SectionHalf
              className="left-section"
              style={{ backgroundImage: `url(${OwnerAgentImg})` }}
            >
              <Overlay>
                <h2>Owner Agent</h2>
                <p>
                  Helps communication with the owner and performs necessary
                  updates about the business.
                </p>
              </Overlay>
            </SectionHalf>
          </SlideInFromSide>

          {/* Customer Agent - slides in from right */}
          <SlideInFromSide from="right" duration={1.2} delay={0.4}>
            <SectionHalf
              className="right-section"
              style={{ backgroundImage: `url(${CustomerAgentImg})` }}
            >
              <Overlay>
                <h2>Customer Agent</h2>
                <p>
                  Helps communication with customers and provides support,
                  recommendations, and real-time interaction.
                </p>
              </Overlay>
            </SectionHalf>
          </SlideInFromSide>
        </SplitSection>
      </div>
    </div>
  );
};

export default Home;
