import React from 'react';
import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <Mark>M</Mark>
      <Text>
        <Title>MINTSA Services &amp; Consulting</Title>
        <Slogan>Notre priorité, votre bonheur</Slogan>
      </Text>
      <MSCContainer aria-hidden="true">
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
  gap: 0.5rem;
  font-family: ${theme.fontBody};
`;

const Mark = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${theme.black};
  background: ${theme.gradientGold};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  line-height: 1;
  letter-spacing: -0.02em;
  box-shadow: ${theme.shadowCopper};
`;

const Text = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${theme.fontDisplay};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.white};
  letter-spacing: -0.02em;
  margin: 0;
`;

const Slogan = styled.p`
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  color: ${theme.gray500};
  letter-spacing: 0.04em;
  margin: 0.15rem 0 0;
`;

const MSCContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 0.25rem;
`;

const MSCItem = styled.span`
  width: 22px;
  height: 22px;
  background: ${theme.gray200};
  border: 1px solid ${theme.copperLine};
  color: ${theme.secondaryLight};
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  letter-spacing: 0.08em;
`;
