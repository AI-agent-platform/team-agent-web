import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import AgricultureImg from "../Assets/areas/aggriculture.jpg";
import ecom from "../Assets/areas/ecom.jpg";
import TourismImg from "../Assets/areas/tourism.jpg";
import { FadeInWhenVisible } from "../components/FramerMotion";

const Wrapper = styled.div`
  padding: 4rem 2rem;
  background-color: #ecfdf5;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #0fcb8c;
  margin-bottom: 1.5rem;
  margin-left: 300px;
  text-align: left;

  @media (max-width: 768px) {
    margin-left: 20px;
    text-align: left;
  }
`;

const Text = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #163c3d;
  line-height: 1.8;
  max-width: 800px;
  margin-left: 300px;
  text-align: left;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 2rem;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    transition: opacity 0.3s ease;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0); /* initially transparent */
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* text stays at bottom */
    padding: 1rem;
    opacity: 0;
    transition: all 0.4s ease;
    z-index: 2;

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #fff;
    }

    p {
      margin: 0;
      font-weight: bold;
      color: #fff;
    }
  }

  &:hover img {
    opacity: 1; /* slightly fade background image */
  }

  &:hover .overlay {
    opacity: 1;
    background-image: linear-gradient(
      125deg,
      rgba(22, 60, 61, 0.9),
      rgba(15, 203, 140, 0.9)
    );
  }

  @media (max-width: 768px) {
    .overlay {
      opacity: 1;
      background-image: linear-gradient(
        125deg,
        rgba(22, 60, 61, 0.8),
        rgba(15, 203, 140, 0.8)
      );
    }
  }
`;

const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Areas = () => {
  const items = [
    {
      title: "Agriculture",
      img: AgricultureImg,
      details:
        "AI solutions for agriculture help optimize crop yields, monitor soil conditions, and automate irrigation systems.",
    },
    {
      title: "Transportation",
      img: ecom,
      details:
        "Transportation AI improves route optimization, fleet management, predictive maintenance, and logistics efficiency.",
    },
    {
      title: "Tourism",
      img: TourismImg,
      details:
        "Tourism AI assists with personalized recommendations, booking management, and real-time customer support.",
    },
  ];

  return (
    <Wrapper>
      <FadeInWhenVisible duration={0.6}>
        <Heading>Focus Areas</Heading>
        <Text>
          Explore the areas where our AI solutions can make a real difference
          for businesses, enhancing efficiency, decision-making, and customer
          experience.
        </Text>
      </FadeInWhenVisible>

      <GridContainer>
        {items.map((item, index) => (
          <FadeInWhenVisible key={index} duration={0.6}>
            <GridItem
              variants={itemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img src={item.img} alt={item.title} />
              <div className="overlay">
                <FadeInWhenVisible duration={0.5}>
                  <h2 style={{marginBottom:"2rem"}}>{item.title}</h2>
                </FadeInWhenVisible>
                <FadeInWhenVisible duration={1.6}>
                  <p>{item.details}</p>
                </FadeInWhenVisible>
              </div>
            </GridItem>
          </FadeInWhenVisible>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default Areas;
