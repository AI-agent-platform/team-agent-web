import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: relative;
  left: 0;
  bottom: 12px;
  display: flex;
  width: 100%;
  height: 370px;
`;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleY(3) scaleX(2.25);
    transform-origin: bottom;
    box-sizing: border-box;
    display: block;
    pointer-events: none;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 30px;
  padding-bottom: 80px;
  padding-left: 60px;
  width: 100%;

  @media (width > 420px) {
    align-items: center;
    padding-left: 0;
    gap: 20px;
  }
`;

const Socials = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
  padding: 0;
  margin: 0;

  a {
    font-size: 24px;
  }
`;

const Links = styled.ul`
  display: flex;
  list-style: none;
  gap: 10px;
  padding: 0;
  margin: 0;

  @media (width > 420px) {
    gap: 20px;
  }
`;

const Legal = styled.p`
  font-size: 12px;
  margin: 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Background>
        <svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#163c3d" />
              <stop offset="100%" stopColor="#96f553ff" />
            </linearGradient>
            <path
              id="wave"
              fill="url(#bg)"
              d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
              s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
            />
          </defs>
          <g>
            <use xlinkHref="#wave" opacity=".3">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="8s"
                values="270 230; -334 180; 270 230"
                keyTimes="0; .5; 1"
                calcMode="spline"
                keySplines="0.42, 0, 0.58, 1.0; 0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#wave" opacity=".6">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="6s"
                values="-270 230;243 220;-270 230"
                keyTimes="0; .6; 1"
                calcMode="spline"
                keySplines="0.42, 0, 0.58, 1.0; 0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#wave" opacity=".9">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="4s"
                values="0 230;-140 200;0 230"
                keyTimes="0; .4; 1"
                calcMode="spline"
                keySplines="0.42, 0, 0.58, 1.0; 0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </Background>

      <Section>
        <Socials>
          <li><a className="fa-brands fa-facebook" /></li>
          <li><a className="fa-brands fa-twitter" /></li>
          <li><a className="fa-brands fa-linkedin" /></li>
          <li><a className="fa-brands fa-instagram" /></li>
        </Socials>
        <Links>
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Services</a></li>
          <li><a>Team</a></li>
          <li><a>Contact</a></li>
        </Links>
        <Legal>© 2023 All rights reserved</Legal>
      </Section>
    </FooterWrapper>
  );
};

export default Footer;
