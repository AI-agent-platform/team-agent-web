import React from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";

const Wrapper = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #ffffffff;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #000000ff;
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #6a6a6a;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
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
  align-items: center;
  text-align: center;
  width: 60%;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background-color: #ecfdf5; /* matching hover color */
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    font-weight: bold;
  }

  .more-details {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    color: #400050ff;
    transition: all 0.4s ease;
  }

  &:hover .more-details {
    max-height: 200px;
    opacity: 1;
  }
`;

const imageVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const moreDetailsVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Intro = () => {
  const items = [
    {
      img: "https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a539648a39d53dc75f_hh1.svg",
      title: "Traditional AI development requires coding skills.",
      details:
        "SMEs often cannot hire dedicated teams or afford complex tools, which makes it hard to implement AI.",
    },
    {
      img: "https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a5580c5ed45b5b671a_hh2.svg",
      title: "Lack of technical expertise limits AI adoption.",
      details:
        "Many SMEs cannot develop intelligent solutions themselves, missing out on automation opportunities.",
    },
    {
      img: "https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a5ad1c0c20dd8997f7_hh3.svg",
      title: "High cost of AI tools is prohibitive for SMEs.",
      details:
        "Expensive AI platforms and development tools make it hard for small businesses to experiment with AI.",
    },
  ];

  return (
    <Wrapper>
      <Heading>The Problem</Heading>
      <Text>
        Small and medium enterprises (SMEs) often lack the technical resources
        and expertise to build intelligent AI solutions that can automate
        customer interactions, handle business tasks, and scale operations.
        <br />
        <br />
        Traditional AI development requires coding skills, expensive tools, and
        dedicated teams—barriers that most SMEs cannot overcome. As a result,
        they miss out on the competitive advantages that AI can offer.
      </Text>

      <GridContainer>
        {items.map((item, index) => (
          <GridItem
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2, duration: 0.5 }}
          >
            <motion.img
              src={item.img}
              alt=""
              variants={imageVariant}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <motion.p variants={textVariant} transition={{ duration: 0.5, delay: 0.3 }}>
              {item.title}
            </motion.p>
            <motion.div
              className="more-details"
              variants={moreDetailsVariant}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p>{item.details}</p>
            </motion.div>
          </GridItem>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default Intro;
