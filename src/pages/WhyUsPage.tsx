import React from "react";
import styled from "styled-components";
import { SlideInFromSide } from "../components/FramerMotion";

const Wrapper = styled.div`
  padding: 4rem 6rem;
  text-align: left;
  background-color: #ecfdf5;
`;
const SubWrapper = styled.div`
  padding: 4rem 2rem;
  text-align: left;
  background-color: #ffffffff;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #0fcb8c;
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

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
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
      img: "https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a539648a39d53dc75f_hh1.svg",
      details:
        "Leverage AI-driven analytics to make smarter decisions, predict trends, and optimize operations across your business. Get actionable insights in real time to improve strategy and performance.",
    },
    {
      title: "24/7 Support",
      img: "https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a5580c5ed45b5b671a_hh2.svg",
      details:
        "Our customer support is available round the clock to assist you with queries, troubleshooting, and implementation guidance. You are never left stuck or waiting.",
    },
    {
      title: "Increased Efficiency",
      img: "https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a5ad1c0c20dd8997f7_hh3.svg",
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
          competition.Our platform empowers businesses to harness the power of
          AI without needing technical expertise or expensive resources. We
          offer intelligent automation, actionable insights, and 24/7 support,
          enabling you to streamline operations, boost productivity, and make
          smarter decisions. By choosing us, you gain a reliable partner that
          helps you stay competitive, optimize performance, and focus on what
          matters most—growing your business.
        </Text>

        <GridContainer>
          {advantages.map((item, index) => {
            // First and third items animate, middle stays static
            if (index === 1) {
              return (
                <GridItem key={index}>
                  <img src={item.img} alt={item.title} />
                  <h3>{item.title}</h3>
                  <div className="details">
                    <p>{item.details}</p>
                  </div>
                </GridItem>
              );
            }

            const direction = index === 0 ? "left" : "right";
            const delay = 0.6; // optional delay for smoother stagger

            return (
              <SlideInFromSide key={index} from={direction} delay={delay}>
                <GridItem>
                  <img src={item.img} alt={item.title} />
                  <h3>{item.title}</h3>
                  <div className="details">
                    <p>{item.details}</p>
                  </div>
                </GridItem>
              </SlideInFromSide>
            );
          })}
        </GridContainer>
      </SubWrapper>
    </Wrapper>
  );
};

export default WhyUs;
