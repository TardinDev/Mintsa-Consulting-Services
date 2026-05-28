import React from 'react';
import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';

type FooterSectionType = {
  title: string;
  children: React.ReactNode;
};

const FooterSection: React.FC<FooterSectionType> = ({ title, children }) => (
  <SectionContainer>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </SectionContainer>
);

export default FooterSection;

const SectionContainer = styled.div`
  min-width: 0;
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${theme.gray500};
  margin: 0 0 1.1rem;
`;
