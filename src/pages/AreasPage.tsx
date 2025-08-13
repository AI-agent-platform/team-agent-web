import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import AgricultureImg from "../Assets/areas/aggriculture.jpg";
import TransportationImg from "../Assets/areas/transpotation.jpg";
import TourismImg from "../Assets/areas/tourism.jpg";

const Wrapper = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #ecfdf5;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #000;
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #555;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 3rem auto;
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
  align-items: center;
  text-align: center;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.4s ease;

    p {
      margin: 0;
      font-weight: bold;
      color: #333;
    }
  }

  &:hover .overlay {
    opacity: 1;
    max-height: 150px;
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
      img: TransportationImg,
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
      <Heading>Focus Areas</Heading>
      <Text>
        Explore the areas where our AI solutions can make a real difference for
        businesses, enhancing efficiency, decision-making, and customer
        experience.
      </Text>

      <GridContainer>
        {items.map((item, index) => (
          <GridItem
            key={index}
            style={{ backgroundImage: `url(${item.img})` }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariant}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="overlay">
              <h2>{item.title}</h2>
              <p>{item.details}</p>
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default Areas;
