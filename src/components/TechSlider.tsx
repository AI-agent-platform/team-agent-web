import React from "react";
import styled, { keyframes } from "styled-components";

// Partner data: name and image filename
const partners = [
  { name: "Transportation", img: "transpotation.png" },
  { name: "Tourism", img: "tourism.png" },
  { name: "GPT", img: "gpt.png" },
  { name: "Agriculture", img: "aggriculture.png" },
  { name: "Marketplace", img: "marketplace.png" },
];

const scroll = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100px;
  margin-top: 2rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`;

const SliderTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 20s linear infinite;
`;

const PartnerItem = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: 6rem;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-right: 0.5rem;
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
  }
`;

const TechSlider = () => {
  // Duplicate the partner array for smooth infinite scrolling
  const duplicatedPartners = [...partners, ...partners];

  return (
    <SliderContainer>
      <SliderTrack>
        {duplicatedPartners.map((partner, index) => (
          <PartnerItem key={index}>
            <img
              src={require(`../Assets/slider/${partner.img}`)}
              alt={partner.name}
            />
            <span>{partner.name}</span>
          </PartnerItem>
        ))}
      </SliderTrack>
    </SliderContainer>
  );
};

export default TechSlider;
