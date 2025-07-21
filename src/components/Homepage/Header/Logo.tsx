import React from 'react';
import styled from 'styled-components';



const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <CurveAndStar>
        <Curve />
        <Star>★</Star>
      </CurveAndStar>
      <Text>
        <Title>Mintsa Services & Consulting</Title>
        <Slogan>Notre priorité, votre bonheur</Slogan>
      </Text>
      <MSCContainer>
        <MSCItem>M</MSCItem>
        <MSCItem>S</MSCItem>
        <MSCItem>C</MSCItem>
      </MSCContainer>
    </LogoContainer>
  );
};

export default Logo;



const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const CurveAndStar = styled.div`
  position: relative;
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Curve = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #1a3e5c; /* bleu foncé */
  border-radius: 50% / 100%;
  transform: rotate(10deg);
  top: 10px;
`;

const Star = styled.div`
  font-size: 24px;
  color: #ffcc00; /* jaune étoile */
  position: absolute;
  top: -10px;
  right: 10px;
`;

const Text = styled.div`
  text-align: center;
  color: #1a3e5c; /* bleu foncé */
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0.5rem 0 0;
`;

const Slogan = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

const MSCContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const MSCItem = styled.span`
  width: 20px;
  height: 20px;
  background-color: #1a3e5c; /* bleu foncé */
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
