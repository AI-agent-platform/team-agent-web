import React from "react";
import styled from "styled-components";
import { SlideInFromSide } from "../components/FramerMotion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OwnerAgentImg from "../Assets/what-we-offer/owner-agent.jpg";
import CustomerAgentImg from "../Assets/what-we-offer/customer-agent.jpg";

const HomeTextSection = styled.div`
  text-align: left;
  max-width: 800px;
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
    margin-left: 20px;
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
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
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

/* ✅ Animated Get Started Button (Shimmer Effect) */
const GetStartedButton = styled.button`
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #5d86b6ff, #2c2c2c);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  cursor: pointer;
  margin: 5rem auto 1rem auto;
  display: block;
  font-family: "Mark Medium", sans-serif;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0.3) 100%
    );
    transform: skewX(-20deg);
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -75%;
    }
    100% {
      left: 125%;
    }
  }

  &:hover {
    background: #bfced2;
    color: #101010ff;
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(125, 127, 126, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAuth();

  const handleGetStarted = () => {
    if (isUserLoggedIn) {
      navigate("/create-agent");
    } else {
      toast.info("Let's start by creating a free account.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/signup");
    }
  };

  return (
    <div className="home-container">
      <div className="home-banner-container" id="home">
        <HomeTextSection>
          <h1 style={{ color: "#454645ff" }}>What We Offer</h1>
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
          <SlideInFromSide from="left" duration={1.2} delay={0.2}>
            <SectionHalf
              style={{ backgroundImage: `url(${OwnerAgentImg})` }}
              onClick={() => navigate("/owner-agent")}
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

          <SlideInFromSide from="right" duration={1.2} delay={0.4}>
            <SectionHalf
              style={{ backgroundImage: `url(${CustomerAgentImg})` }}
              onClick={() => navigate("/customer-agent")}
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

        <GetStartedButton onClick={handleGetStarted}>
          Get Started
        </GetStartedButton>
      </div>
    </div>
  );
};

export default Home;
