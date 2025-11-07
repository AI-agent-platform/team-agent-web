import React from "react";
import styled from "styled-components";
import { SlideInFromSide } from "../components/FramerMotion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Wrapper = styled.div`
  padding: 4rem 6rem;
  text-align: left;
  background-color: #ecfdf5;

  @media (max-width: 1024px) {
    padding: 2rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem;
    text-align: left;
  }
`;

const SubWrapper = styled.div`
  padding: 4rem 2rem;
  text-align: left;
  background-color: #ffffff;

  @media (max-width: 1024px) {
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #454645ff;
  margin-bottom: 1.5rem;
  margin-left: 300px;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`;

const Text = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.5rem);
  color: #555;
  line-height: 1.8;
  max-width: 700px;
  margin: 0 0 3rem 300px;

  @media (max-width: 768px) {
    margin: 0 auto 3rem auto;
    text-align: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background-color: #ecfdf5;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }

  .details {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    color: #434343ff;
    transition: all 0.4s ease;
  }

  &:hover .details {
    max-height: 200px;
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    .details {
      max-height: 200px;
      opacity: 1;
    }
    align-items: center;
    text-align: center;
  }
`;

const WhyUs = () => {
  const advantages = [
    {
      title: "Smart AI Insights",
      animation: "https://lottie.host/a1a3f233-acdb-4392-ae28-e0e0515d0ec7/7XbJUosezD.lottie",
      details:
        "Leverage AI-driven analytics to make smarter decisions, predict trends, and optimize operations across your business. Get actionable insights in real time to improve strategy and performance.",
    },
    {
      title: "24/7 Support",
      animation: "https://lottie.host/71f9878d-03a4-4271-a465-5dc43c643fef/RWWesJySCC.lottie",
      details:
        "Our customer support is available round the clock to assist you with queries, troubleshooting, and implementation guidance. You are never left stuck or waiting.",
    },
    {
      title: "Increased Efficiency",
      animation: "https://lottie.host/3e5f2221-9b1c-433c-826b-07d946d133c0/WZr5lvOyWx.lottie",
      details:
        "Automate repetitive tasks and workflows, freeing up valuable time for your team to focus on high-priority initiatives. Boost productivity across all business operations.",
    },
  ];

  return (
    <Wrapper>
      <SubWrapper>
        <Heading>Why You Should Choose Us</Heading>
        <Text>
          Discover the key advantages our platform offers, helping businesses
          streamline operations, boost performance, and stay ahead of the
          competition. Our platform empowers businesses to harness the power of
          AI without needing technical expertise or expensive resources. We
          offer intelligent automation, actionable insights, and 24/7 support,
          enabling you to streamline operations, boost productivity, and make
          smarter decisions. By choosing us, you gain a reliable partner that
          helps you stay competitive, optimize performance, and focus on what
          matters most—growing your business.
        </Text>

        <GridContainer>
          {advantages.map((item, index) => {
            const direction = index === 0 ? "left" : index === 2 ? "right" : "none";
            const delay = 0.1;

            const CardContent = (
              <GridItem key={index}>
                <DotLottieReact
                  src={item.animation}
                  loop
                  autoplay
                  style={{ width: "100px", height: "100px", marginBottom: "1rem" }}
                />
                <h3>{item.title}</h3>
                <div className="details">
                  <p>{item.details}</p>
                </div>
              </GridItem>
            );

            if (direction === "none") return CardContent;
            return (
              <SlideInFromSide key={index} from={direction} delay={delay}>
                {CardContent}
              </SlideInFromSide>
            );
          })}
        </GridContainer>
      </SubWrapper>
    </Wrapper>
  );
};

export default WhyUs;
