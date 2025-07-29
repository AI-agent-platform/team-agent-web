import React from "react";
import FadeInWhenVisible from "../components/FramerMotion";
import { styled } from "styled-components";

const Wrapper = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f9f9f9;
`;

const Heading = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  color: #4c4c4c;
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color:#6a6a6a;
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
`;
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  p {
    align-self: center;
    font-size: 1rem;
    color: #555;
  }
`;
const Intro = () => {
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
        <GridItem>
          <img src="https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a539648a39d53dc75f_hh1.svg" />

          <div>
            <p>
              {" "}
              Traditional AI development requires coding skills, expensive
              tools, and dedicated teams—barriers that most SMEs cannot
              overcome.
            </p>
          </div>
        </GridItem>

        <GridItem>
          <img src="https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a5580c5ed45b5b671a_hh2.svg" />
          <div style={{ textAlign: "center" }}>
            <p>
              {" "}
              Traditional AI development requires coding skills, expensive
              tools, and dedicated teams—barriers that most SMEs cannot
              overcome.
            </p>
          </div>
        </GridItem>

        <GridItem>
          <img src="https://cdn.prod.website-files.com/64abaf64480a5f17c04722a1/65a647a5ad1c0c20dd8997f7_hh3.svg" />
          <div>
            <p>
              {" "}
              Traditional AI development requires coding skills, expensive
              tools, and dedicated teams—barriers that most SMEs cannot
              overcome.
            </p>
          </div>
        </GridItem>
      </GridContainer>
    </Wrapper>
  );
};
export default Intro;
